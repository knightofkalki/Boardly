import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PlansPopup from '../components/PlansPopup';
import Progress from '../components/Progress';
import { ContinueLearning } from '../components/ContinueLearning';
import { ActionCards } from '../components/ActionCards';
import { RecommendedSection } from '../components/RecommendedSection';
import { UpcomingEvents } from '../components/UpcomingEvents';
import { API_URL } from "../shared/api";
import { Calendar } from '../components/Calendar';

const getAuthToken = () => `Bearer ${localStorage.getItem('token')}`;

export const Home = () => {
    const location = useLocation();
    const [showPopup, setShowPopup] = useState(false);

    const checkSubscriptionStatus = async () => {
        try {
            const response = await fetch(`${API_URL}/payment/subscription-status`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getAuthToken(),
                },
            });

            const subscriptionData = await response.json();

            if (response.ok) {
                // Show popup if the user is on the free plan or has no active subscription
                if (!subscriptionData.isActive || subscriptionData.currentPlan === 'Free') {
                    setShowPopup(true);
                }
            } else {
                console.error('Failed to fetch subscription status:', subscriptionData.error);
            }
        } catch (error) {
            console.error('Error fetching subscription status:', error);
        }
    };

    useEffect(() => {
        if (location.state?.fromLogin) {
            checkSubscriptionStatus();
        }
    }, [location.state]);

    return (
        <div className="p-4 md:p-6 md:px-28">
            {showPopup && (
                <PlansPopup onClose={() => setShowPopup(false)} />
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="md:col-span-1">
                    <Progress />
                    {/* <ContinueLearning /> */}
                </div>
                <div>
                    {/* <div className='h-[50vh]'> */}
                    <Calendar />
                    {/* </div> */}
                </div>
                <div>
                    <ContinueLearning />
                </div>
            </div>
            <div className="mt-4 md:mt-6">
                <ActionCards />
            </div>
            <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="md:col-span-2">
                    <RecommendedSection />
                </div>
                <div>
                    <UpcomingEvents />
                </div>
            </div>
        </div>
    );
};
