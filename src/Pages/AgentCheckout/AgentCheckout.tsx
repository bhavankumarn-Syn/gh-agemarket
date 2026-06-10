import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spin, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Images, truncateText } from '../utils';
import { useAuth } from '../../Context/AuthContext';
import { authConfig } from '../../utils/config';
import StripePaymentModal from '../../Components/StripePaymentModal/StripePaymentModal';
import './agentCheckout.scss';

interface Agent {
  _id: string;
  title: string;
  imageUrl?: string;
  description?: string;
  supportedInterfaces?: string[];
  category?: string;
  purchasePrice?: number;
  purchaseType?: string;
  availableCurrencies?: Array<{ code: string }>;
}

const AgentCheckout = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [stripeModalOpen, setStripeModalOpen] = useState(false);

  // Fetch agent data from API
  useEffect(() => {
    const fetchAgentDetails = async () => {
      try {
        setLoading(true);

        if (!agentId || !user?.protectedAccToken) {
          message.error('Missing required information');
          setLoading(false);
          return;
        }

        const marketplaceUrl = authConfig.marke_place_url;
        const token = user.protectedAccToken;
        const decodedToken = atob(token);

        const response = await axios.get(
          `${marketplaceUrl}/api/v1/assets/${agentId}`,
          {
            headers: {
              'Authorization': `Bearer ${decodedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data?.success && response.data?.data) {
          const assetData = response.data.data;
          setAgent({
            _id: assetData._id,
            title: assetData.title,
            imageUrl: assetData.imageUrl,
            description: assetData.description,
            supportedInterfaces: assetData.supportedInterfaces || [],
            category: assetData.category,
            purchasePrice: assetData.purchasePrice,
            purchaseType: assetData.purchaseType,
            availableCurrencies: assetData.availableCurrencies || [{ code: 'usd' }],
          });
        } else {
          message.error('Failed to load agent details');
        }
      } catch (error: any) {
        console.error('Failed to fetch agent details:', error);
        message.error('Failed to load agent details');
      } finally {
        setLoading(false);
      }
    };

    if (agentId && user?.protectedAccToken) {
      fetchAgentDetails();
    }
  }, [agentId, user?.protectedAccToken]);

  const handlePaymentSuccess = (result: any) => {
    console.log('Payment successful:', result);
    message.success('Payment completed successfully!');
    
    // Store the subscribed agent data in localStorage
    if (agent) {
      const subscribedAgents = JSON.parse(localStorage.getItem('subscribedAgents') || '[]');
      const agentExists = subscribedAgents.some((a: Agent) => a._id === agent._id);
      
      if (!agentExists) {
        subscribedAgents.push(agent);
        localStorage.setItem('subscribedAgents', JSON.stringify(subscribedAgents));
      }
    }
    
    // Navigate to subscription confirmation or dashboard
    navigate(`/subscribed-agent/${agentId}`);
  };

  if (loading) {
    return (
      <div className="agentCheckoutContainer loading">
        <Spin size="large" tip="Loading asset details..." />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="agentCheckoutContainer">
        <div className="errorSection">
          <p>Agent not found</p>
          <Button onClick={() => navigate('/agent-list')}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="agentCheckoutContainer">
      {/* Header */}
      <div className="checkoutHeader">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          className="backButton"
        >
          Back
        </Button>
        <h1>Complete Your Subscription</h1>
      </div>

      <div className="checkoutContent">
        {/* Agent Details Section */}
        <div className="agentDetailsSection">
          <div className="agentCard">
            <div className="agentHeader">
              <img
                src={agent.imageUrl || Images.unknownAvatar}
                alt={agent.title}
                className="agentImage"
              />
              <div className="agentInfo">
                <h2>{agent.title}</h2>
                {agent.category && <p className="category">{agent.category}</p>}
                {agent.supportedInterfaces && (
                  <div className="interfaces">
                    <span className="label">Interfaces:</span>
                    <div className="interfaceList">
                      {agent.supportedInterfaces.map((iface) => (
                        <span key={iface} className="interfaceTag">
                          {iface}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="agentDescription">
              <h3>Description</h3>
              <p>{agent.description}</p>
            </div>
          </div>
        </div>

        {/* Payment Details Section */}
        <div className="paymentDetailsSection">
          <div className="paymentCard">
            <h2>Payment Summary</h2>

            <div className="priceBreakdown">
              {agent.purchaseType === 'renting' && (
                <>
                  <div className="priceRow">
                    <span className="label">Monthly Subscription</span>
                    <span className="price">${agent.purchasePrice || 0}/month</span>
                  </div>

                  <div className="priceRow">
                    <span className="label">Renewal Date</span>
                    <span className="date">
                      {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                        .toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                    </span>
                  </div>
                </>
              )}
              
              {agent.purchaseType === 'purchasing' && (
                <div className="priceRow">
                  <span className="label">Purchase Price</span>
                  <span className="price">${agent.purchasePrice || 0}</span>
                </div>
              )}
              
              {agent.purchaseType === 'payPerUse' && (
                <div className="priceRow">
                  <span className="label">Pay Per Use Price</span>
                  <span className="price">${agent.purchasePrice || 0}</span>
                </div>
              )}
            </div>

            <div className="divider" />

            <div className="totalAmount">
              <span className="label">Total Amount Due</span>
              <span className="totalPrice">${agent.purchasePrice || 0}</span>
            </div>

            <div className="paymentNotice">
              <p>
                {agent.purchaseType === 'renting' && 'By clicking "Pay Now", you authorize us to charge your card on file. Your subscription will renew automatically each month.'}
                {agent.purchaseType === 'purchasing' && 'By clicking "Pay Now", you authorize us to charge your card on file for this one-time purchase.'}
                {agent.purchaseType === 'payPerUse' && 'By clicking "Pay Now", you authorize us to charge your card on file for each use of this service.'}
              </p>
            </div>

            <Button
              type="primary"
              size="large"
              block
              onClick={() => setStripeModalOpen(true)}
              className="payNowButton"
            >
              Pay Now
            </Button>
          </div>
        </div>
      </div>

      {/* Stripe Payment Modal */}
      <StripePaymentModal
        open={stripeModalOpen}
        onCancel={() => setStripeModalOpen(false)}
        onSuccess={handlePaymentSuccess}
        agentId={agentId || ''}
        agentTitle={agent.title}
        amount={agent.purchasePrice || 0}
        currency={agent.availableCurrencies?.[0]?.code || 'usd'}
      />
    </div>
  );
};

export default AgentCheckout;
