import { useEffect, useState } from 'react';
import { API_URL } from "../shared/api";

const getAuthToken = () => `Bearer ${localStorage.getItem('token')}`;

const SubscriptionComponent = () => {
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [selectedPlan, setSelectedPlan] = useState('');
    const [plans] = useState(['PLAN1', 'PLAN2', 'PLAN3']); // Available plans

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    };

    const fetchSubscriptionStatus = async () => {
        try {
            const response = await fetch(`${API_URL}/payment/subscription-status`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getAuthToken(),
                },
            });
            const subscriptionData = await response.json();

            if (response.ok) {
                setSubscription(subscriptionData);
            } else {
                throw new Error(subscriptionData.error || 'Failed to fetch subscription status');
            }
        } catch (error) {
            showMessage('error', 'Failed to retrieve subscription status. Please try again later.');
            console.error('Subscription status error:', error);
        }
    };

    const handlePaymentSuccess = async (paymentResponse) => {
        try {
            const response = await fetch(`${API_URL}/payment/verify-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getAuthToken(),
                },
                body: JSON.stringify(paymentResponse),
            });

            const verifyData = await response.json();

            if (response.ok) {
                showMessage('success', 'Payment successful and subscription updated!');
                fetchSubscriptionStatus(); // Refresh subscription info
            } else {
                throw new Error(verifyData.error || 'Payment verification failed');
            }
        } catch (error) {
            showMessage('error', 'Payment verification failed. Please contact support.');
            console.error('Payment verification error:', error);
        }
    };

    const handlePayment = async () => {
        if (!selectedPlan) {
            showMessage('error', 'Please select a plan.');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/payment/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getAuthToken(),
                },
                body: JSON.stringify({ planType: selectedPlan }),
            });

            const orderData = await response.json();

            if (response.ok) {
                const options = {
                    key: "rzp_test_uMTEc94d3O7Ez6", // Replace with your Razorpay key
                    amount: orderData.amount,
                    currency: orderData.currency,
                    name: "Your Company Name",
                    description: `Payment for ${selectedPlan}`,
                    order_id: orderData.orderId,
                    handler: handlePaymentSuccess,
                    prefill: {
                        name: orderData.customerName,
                        email: orderData.customerEmail,
                    },
                    theme: {
                        color: "#3399cc",
                    },
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();
            } else {
                throw new Error(orderData.error || 'Failed to create order');
            }
        } catch (error) {
            showMessage('error', 'Failed to initiate payment. Please try again later.');
            console.error('Payment initiation error:', error);
        }
    };

    useEffect(() => {
        const initialize = async () => {
            setLoading(true);
            await fetchSubscriptionStatus();
            setLoading(false);
        };
        initialize();

        // Load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div className="subscription-component">
            {loading && <div className="loading">Loading...</div>}

            {!loading && subscription && (
                <div className="subscription-info">
                    <p>
                        Current Plan: <strong>{subscription.planName || 'Free'}</strong>
                    </p>
                </div>
            )}

            <div className="plan-selection">
                <label>Select Plan:</label>
                <select
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                >
                    <option value="">Select a plan</option>
                    {plans.map((plan) => (
                        <option key={plan} value={plan}>{plan}</option>
                    ))}
                </select>
                <button onClick={handlePayment} disabled={!selectedPlan}>
                    Pay Now
                </button>
            </div>

            {message.text && (
                <div className={`message ${message.type}`}>{message.text}</div>
            )}
        </div>
    );
};

export default SubscriptionComponent;
