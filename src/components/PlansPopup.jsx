import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { API_URL } from "../shared/api";
import plans from "../data/plans.json";

const getAuthToken = () => `Bearer ${localStorage.getItem('token')}`;

export default function PlansPopup({ onClose }) {
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

    const handlePayment = async (planId, planPrice) => {
        setLoading(true);
        showMessage('info', 'Processing payment, please do not press back or refresh...');
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
                    name: "Boardly.in",
                    description: `Payment for ${planId}`,
                    order_id: orderData.orderId,
                    handler: async (response) => {
                        await fetchSubscriptionStatus();
                        showMessage('success', 'Payment successful and subscription updated!');
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
        } finally {
            setLoading(false);
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
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
            <div className="bg-gray-100 rounded-lg shadow-lg w-full max-w-4xl p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                >
                    ✕
                </button>
                <h2 className="text-2xl font-bold mb-6">Choose a Subscription Plan</h2>
                {loading ? (
                    <div className="flex justify-center items-center mt-12">
                        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500"></div>
                    </div>
                ) : (
                    <div>
                        {subscription && (
                            <div className="mb-8 bg-gray-100 p-4 rounded-lg">
                                <p className="text-lg font-medium">
                                    Current Plan: <span className="font-bold">{subscription.currentPlan || 'Free'}</span>
                                </p>
                                {subscription.isActive ? (
                                    <p>Expires on: {new Date(subscription.expiryDate).toLocaleDateString()}</p>
                                ) : (
                                    <p className="text-red-500">No active subscription!</p>
                                )}
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {plans.map(plan => (
                                <div
                                    key={plan.id}
                                    className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                                    <div className="text-2xl font-bold text-indigo-600 mb-4">
                                        ₹{plan.price} <span className="text-sm font-normal">/month</span>
                                    </div>
                                    <ul className="text-gray-600 mb-4">
                                        {plan.features.map((feature, index) => (
                                            <li key={index}>- {feature}</li>
                                        ))}
                                    </ul>
                                    <button
                                        className="w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                                        onClick={() => handlePayment(plan.id, plan.price)}
                                    >
                                        Subscribe Now
                                    </button>
                                </div>
                            ))}
                        </div>
                        {message.text && (
                            <div
                                className={`mt-6 p-4 rounded-md text-center font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700' : message.type === 'info' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                                    }`}
                            >
                                {message.text}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
