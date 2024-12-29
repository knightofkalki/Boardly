import { useState } from 'react';
import { Bell } from 'lucide-react';
import ProfileIcon from '../assets/profile.svg';
import { useAuth } from '../context/AuthContext';
import Banner from "../assets/banner.svg";
import { Link } from 'react-router-dom';


export function Navbar() {
    const [isNotificationOpen, setNotificationOpen] = useState(false);
    const [isProfileOpen, setProfileOpen] = useState(false);
    const { currentUser } = useAuth();
    const { signout } = useAuth();

    const toggleNotification = () => {
        setNotificationOpen((prev) => !prev);
        setProfileOpen(false);
    };

    const toggleProfile = () => {
        setProfileOpen((prev) => !prev);
        setNotificationOpen(false);
    };

    const closeMenus = () => {
        setNotificationOpen(false);
        setProfileOpen(false);
    };

    const navigateToSettings = () => {
        window.location.href = '/settings';
    };

    const handleSignout = () => {
        signout();
        localStorage.clear();
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
    };

    return (
        <nav className="bg-white shadow-lg h-16 sticky top-0 z-50">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 relative">
                    <div className="flex items-center">
                        <Link to="/">
                            <img src={Banner} alt="Boardly" />
                        </Link>
                    </div>
                    <div className="flex items-center relative">
                        <button
                            onClick={toggleNotification}
                            className="p-2 rounded-full text-gray-400 hover:text-gray-600 relative"
                        >
                            <span className="sr-only">View notifications</span>
                            <Bell className="h-6 w-6" aria-hidden="true" />
                        </button>
                        {isNotificationOpen && (
                            <div className="absolute top-12 right-12 bg-white shadow-lg rounded-lg w-64 p-4">
                                <h3 className="font-semibold text-lg mb-2">Notifications</h3>
                                <ul>
                                    <li className="py-1 text-gray-700">No new notifications</li>
                                </ul>
                            </div>
                        )}

                        <button
                            onClick={toggleProfile}
                            className="ml-3 p-2 rounded-full text-gray-400 hover:text-gray-600 relative"
                        >
                            <span className="sr-only">View profile</span>
                            <img src={ProfileIcon} alt="Profile" className="h-6 w-6" />
                        </button>
                        {isProfileOpen && (
                            <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg w-64 p-4 z-50">
                                <div className="mb-4">
                                    <h3 className="font-semibold text-lg text-gray-900">{currentUser.name}</h3>
                                    <p className="text-sm text-gray-600">{currentUser.email}</p>
                                </div>
                                <div className="border-t border-gray-200 pt-2">
                                    <div>
                                        <button className="py-2 text-gray-700 hover:text-gray-900 cursor-pointer">
                                            Class: {currentUser.userClass}
                                        </button>
                                    </div>
                                    <div>
                                        <button className="py-2 text-gray-700 hover:text-gray-900 cursor-pointer">
                                            Institute: {currentUser.institute}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        onClick={navigateToSettings}
                                        className="py-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                                    >
                                        Settings
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={handleSignout}
                                        className="py-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {(isNotificationOpen || isProfileOpen) && (
                <div
                    className="fixed inset-0 bg-transparent z-40"
                    onClick={closeMenus}
                />
            )}
        </nav>
    );
}