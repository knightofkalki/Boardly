import { AiOutlineHome, AiOutlineSchedule, AiOutlineTeam, AiOutlineUser } from 'react-icons/ai';
import { FaChalkboardTeacher } from "react-icons/fa";
import { BiPackage } from "react-icons/bi";
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, label, isActive, onClick }) => {
    return (
        <motion.div
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`relative group flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer ${isActive ? 'text-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
        >
            <Icon size={24} />
						<span
                className="hidden md:flex absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 text-sm bg-gray-800 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg" >
                {label}
            </span>
        </motion.div>
    );
};

export const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { icon: AiOutlineHome, path: '/', label: 'Home' },
        { icon: AiOutlineSchedule, path: '/schedule', label: 'Schedule' },
        { icon: AiOutlineTeam, path: '/communities', label: 'Communities' },
        { icon: FaChalkboardTeacher, path: '/mentorship', label: 'Mentorship' },
        { icon: BiPackage, path: '/subscriptions', label: 'Subscriptions' },
    ];

    return (
        <>
            {/* Sidebar for larger screens */}
            <div className="hidden md:flex fixed left-0 top-16 h-[calc(100%-4rem)] w-16 bg-white shadow-lg flex-col items-center py-4 space-y-6">
                {menuItems.map((item, index) => (
                    <SidebarItem
                        key={index}
                        icon={item.icon}
                        label={item.label}
                        isActive={location.pathname === item.path}
                        onClick={() => navigate(item.path)}
                    />
                ))}
            </div>

            {/* Bottom bar for mobile screens */}
            <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-around items-center py-2 md:hidden z-40">
                {menuItems.map((item, index) => (
                    <SidebarItem
                        key={index}
                        icon={item.icon}
                        label={item.label}
                        isActive={location.pathname === item.path}
                        onClick={() => navigate(item.path)}
                    />
                ))}
            </div>
        </>
    );
};
