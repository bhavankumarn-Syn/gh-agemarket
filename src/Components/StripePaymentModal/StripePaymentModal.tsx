import { useState, useEffect } from 'react';
import { Modal, message, Button, Spin } from 'antd';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../../api/stripe';
import { useAuth } from '../../Context/AuthContext';
import './stripePaymentModal.module.scss';

interface StripePaymentModalProps {
  open: boolean;
  onCancel: () => void;
  onSuccess?: (result: any) => void;
  agentId?: string;
  agentTitle?: string;
  amount?: number;
  currency?: string;
}

const CheckoutForm = ({
  onSuccess,
  onCancel,
  agentId,
  agentTitle,
  amount = 9.99,
  currency = 'usd',
}: Omit<StripePaymentModalProps, 'open'>) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      message.error('Payment system not initialized. Please refresh the page.');
      return;
    }

    setIsLoading(true);

    try {
      // Submit the payment form (client secret already set in Elements)
      const { error } = await elements.submit();

      if (error) {
        message.error(error.message || 'Failed to submit payment form');
        return;
      }

      // Confirm the payment using the payment intent
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: 'if_required',
      });

      if (result.error) {
        message.error(result.error.message || 'Payment failed');
      } else if (result.paymentIntent?.status === 'succeeded') {
        message.success('Payment successful!');
        onSuccess?.(result.paymentIntent);
        onCancel();
      } else if (result.paymentIntent?.status === 'processing') {
        message.info('Payment is processing...');
      } else {
        message.warning('Payment status: ' + result.paymentIntent?.status);
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      message.error(error.message || 'Failed to process payment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>
            Agent
          </label>
          <input
            type="text"
            value={agentTitle || ''}
            disabled
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              backgroundColor: '#fafafa',
              color: '#666',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>
            Amount
          </label>
          <input
            type="text"
            value={`$${amount.toFixed(2)} ${currency.toUpperCase()}`}
            disabled
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              backgroundColor: '#fafafa',
              color: '#666',
            }}
          />
        </div>
      </div>

      {/* Stripe Payment Element - Full Payment Form */}
      <PaymentElement
        options={{
          layout: 'tabs',
        }}
      />

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <Button
          onClick={onCancel}
          disabled={isLoading}
          style={{ flex: 1 }}
        >
          Cancel
        </Button>
        <Button
          htmlType="submit"
          disabled={isLoading || !stripe || !elements}
          type="primary"
          style={{ flex: 1 }}
        >
          {isLoading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
        </Button>
      </div>
    </form>
  );
};

export const StripePaymentModal = ({
  open,
  onCancel,
  onSuccess,
  agentId,
  agentTitle,
  amount = 9.99,
  currency = 'usd',
}: StripePaymentModalProps) => {
  const { user } = useAuth();
  
  const [stripePromiseLoaded, setStripePromiseLoaded] = useState<Promise<Stripe | null> | null>(() => {
    const key = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
    // console.log('Loading Stripe with key:', key ? 'Key found' : 'KEY NOT FOUND');
    if (key) {
      return loadStripe(key);
    }
    console.warn('VITE_STRIPE_PUBLIC_KEY environment variable is not set');
    return null;
  });

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingPaymentIntent, setLoadingPaymentIntent] = useState(false);
  const [paymentIntentError, setPaymentIntentError] = useState<string | null>(null);
  const [hasAttemptedPaymentIntent, setHasAttemptedPaymentIntent] = useState(false);

  const initializePaymentIntent = async () => {
    if (hasAttemptedPaymentIntent) {
      console.log('Payment intent already attempted, skipping');
      return;
    }

    if (!user?.email) {
      console.warn('User email not available');
      setPaymentIntentError('Unable to retrieve customer email. Please refresh and try again.');
      message.error('Unable to retrieve customer email. Please refresh and try again.');
      return;
    }

    if (!user?.protectedAccToken) {
      console.warn('User token not available');
      setPaymentIntentError('Unable to retrieve authorization token. Please refresh and try again.');
      message.error('Unable to retrieve authorization token. Please refresh and try again.');
      return;
    }

    try {
      setLoadingPaymentIntent(true);
      setPaymentIntentError(null);
      setHasAttemptedPaymentIntent(true);
      
      console.log('Creating payment intent for agent:', agentId, 'amount:', amount, 'email:', user.email);
      
      // Decode the token if it's base64 encoded
      const token = atob(user.protectedAccToken);
      
      const paymentIntentData = await createPaymentIntent(
        [
          {
            id: agentId || '',
            quantity: 1,
          },
        ],
        user.email,
        token
      );

      console.log('Payment intent created:', paymentIntentData);
      setClientSecret(paymentIntentData.clientSecret);
    } catch (error: any) {
      console.error('Failed to create payment intent:', error);
      setPaymentIntentError('Failed to initialize payment. Please try again.');
      message.error('Failed to initialize payment. Please try again.');
      setHasAttemptedPaymentIntent(false); // Allow retry
    } finally {
      setLoadingPaymentIntent(false);
    }
  };

  // Initialize payment intent when modal opens
  useEffect(() => {
    if (open && !clientSecret && !hasAttemptedPaymentIntent && !loadingPaymentIntent) {
      initializePaymentIntent();
    }
  }, [open]); // Only depends on 'open' to avoid retriggering

  const handleRetry = () => {
    setClientSecret(null);
    setPaymentIntentError(null);
    setHasAttemptedPaymentIntent(false);
    initializePaymentIntent();
  };

  // console.log('StripePaymentModal render - open:', open, 'agentTitle:', agentTitle, 'clientSecret:', clientSecret);
  
  if (!stripePromiseLoaded) {
    return (
      <Modal
        title="Complete Payment"
        open={open}
        onCancel={onCancel}
        footer={null}
        destroyOnClose
        centered
        width={500}
      >
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>Payment system could not be initialized. Please check your configuration.</p>
          <Button onClick={onCancel}>Close</Button>
        </div>
      </Modal>
    );
  }

  if (paymentIntentError && !clientSecret) {
    return (
      <Modal
        title="Complete Payment"
        open={open}
        onCancel={onCancel}
        footer={null}
        destroyOnClose
        centered
        width={500}
      >
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p style={{ color: '#fa755a', marginBottom: '20px' }}>{paymentIntentError}</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button onClick={onCancel} style={{ flex: 1 }}>
              Close
            </Button>
            <Button type="primary" onClick={handleRetry} style={{ flex: 1 }}>
              Retry
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  if (!clientSecret || loadingPaymentIntent) {
    return (
      <Modal
        title="Complete Payment"
        open={open}
        onCancel={onCancel}
        footer={null}
        destroyOnClose
        centered
        width={500}
      >
        <Spin tip="Loading payment form..." style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }} />
      </Modal>
    );
  }

  return (
    <Modal
      title="Complete Payment"
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
      centered
      width={500}
    >
      <Elements
        stripe={stripePromiseLoaded}
        options={{
          clientSecret,
          appearance: {
            theme: 'stripe',
            variables: {
              colorPrimary: '#0169EF',
              colorBackground: '#ffffff',
              colorText: '#31154E',
              colorDanger: '#fa755a',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              spacingUnit: '2px',
              borderRadius: '4px',
            },
          },
        }}
      >
        <CheckoutForm
          onSuccess={onSuccess}
          onCancel={onCancel}
          agentId={agentId}
          agentTitle={agentTitle}
          amount={amount}
          currency={currency}
        />
      </Elements>
    </Modal>
  );
};

export default StripePaymentModal;
