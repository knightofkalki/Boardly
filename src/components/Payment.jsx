import { useEffect, useState } from 'react';
import { API_URL } from "../shared/api";
import plans from "../data/plans.json";

const getAuthToken = () => `Bearer ${localStorage.getItem('token')}`;

const SubscriptionComponent = () => {
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    };

    const fetchSubscriptionStatus = async () => {
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentSuccess = async (response) => {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            showMessage('error', 'Invalid payment response. Please contact support.');
            return;
        }

        try {
            const verifyResponse = await fetch(`${API_URL}/payment/verify-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getAuthToken(),
                },
                body: JSON.stringify({ razorpay_payment_id, razorpay_order_id, razorpay_signature }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyResponse.ok) {
                showMessage('success', 'Payment successful and subscription updated!');
                await fetchSubscriptionStatus();
            } else {
                throw new Error(verifyData.error || 'Payment verification failed');
            }
        } catch (error) {
            showMessage('error', 'Payment verification failed. Please contact support.');
            console.error('Payment verification error:', error);
        }
    };

    const handlePayment = async (planId, planPrice) => {
        try {
            const response = await fetch(`${API_URL}/payment/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getAuthToken(),
                },
                body: JSON.stringify({ planType: planId }),
            });

            const orderData = await response.json();

            if (response.ok) {
                const options = {
                    key: "rzp_test_uMTEc94d3O7Ez6",
                    amount: planPrice * 100,
                    currency: "INR",
                    name: "Your Company Name",
                    description: `Payment for ${planId}`,
                    order_id: orderData.orderId,
                    handler: async (response) => {
                        await handlePaymentSuccess(response);
                    },
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
            await fetchSubscriptionStatus();
        };

        initialize();

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="subscription-component p-8 bg-gray-50 min-h-screen">
            {loading ? (
                <div className="text-center text-xl font-semibold text-gray-700">Loading...</div>
            ) : (
                <div className="max-w-5xl mx-auto">
                    {subscription && (
                        <div className="subscription-info mb-8 bg-white p-6 rounded-lg shadow-md">
                            <p className="text-lg font-medium text-gray-700">
                                Current Plan: <span className="font-bold">{subscription.currentPlan || 'Free'}</span>
                            </p>
                            {subscription.isActive ? (
                                <p className="text-gray-600">
                                    Expires on: {new Date(subscription.expiryDate).toLocaleDateString()}
                                </p>
                            ) : (
                                <p className="text-red-500">Your subscription has expired.</p>
                            )}
                        </div>
                    )}
                    <div className="plans grid grid-cols-1 md:grid-cols-3 gap-6">
                        {plans.map(plan => (
                            <div
                                key={plan.id}
                                className="plan-card p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <h2 className="plan-name text-xl font-semibold mb-4 text-gray-800">{plan.name}</h2>
                                <div className="price text-2xl font-bold text-indigo-600 mb-4">
                                    ₹{plan.price} <span className="text-sm font-normal">/month</span>
                                </div>
                                <ul className="features mb-4 space-y-2 text-gray-600">
                                    {plan.features.map((feature, index) => (
                                        <li key={index}>- {feature}</li>
                                    ))}
                                </ul>
                                <button
                                    className="btn w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                                    onClick={() => handlePayment(plan.id, plan.price)}
                                >
                                    Subscribe Now
                                </button>
                            </div>
                        ))}
                    </div>
                    {message.text && (
                        <div
                            className={`message mt-6 p-4 rounded-md text-center font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}
                        >
                            {message.text}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SubscriptionComponent;
