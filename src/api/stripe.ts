import axios from 'axios';
import { authConfig } from '../utils/config';

interface PaymentItem {
  id: string;
  quantity: number;
}

interface CreatePaymentIntentPayload {
  items: PaymentItem[];
  customerEmail: string;
}

interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId?: string;
  [key: string]: any;
}

/**
 * Create a payment intent for Stripe payment
 * Calls the backend endpoint: /api/v1/stripe/create-payment-intent
 * @param items - Array of items with id and quantity
 * @param customerEmail - Customer's email address
 * @param token - Authorization token for the API request
 */
export const createPaymentIntent = async (
  items: PaymentItem[],
  customerEmail: string,
  token: string
): Promise<PaymentIntentResponse> => {
  const marketplaceUrl = authConfig.marke_place_url;

  const payload: CreatePaymentIntentPayload = {
    items,
    customerEmail,
  };

  try {
    console.log('Creating payment intent with payload:', payload);
    
    const response = await axios.post(
      `${marketplaceUrl}/api/v1/stripe/create-payment-intent`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    console.log('Payment intent response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Failed to create payment intent:', error);
    throw {
      status: error.response?.status,
      message: error.response?.data?.message || 'Failed to create payment intent',
      data: error.response?.data,
    };
  }
};
