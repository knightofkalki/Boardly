import { AiOutlineHome, AiOutlineSchedule, AiOutlineTeam, AiOutlineUser } from 'react-icons/ai';
import { FaChalkboardTeacher } from "react-icons/fa";
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, isActive, onClick }) => {
    return (
        <motion.div
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-lg cursor-pointer ${
                isActive ? 'bg-orange-100 text-orange-500' : 'text-gray-500 hover:bg-gray-100'
            }`}
        >
            <Icon size={24} />
        </motion.div>
    );
};

export const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const menuItems = [
        { icon: AiOutlineHome, path: '/' },
        { icon: AiOutlineSchedule, path: '/schedule' },
        { icon: AiOutlineTeam, path: '/communities' },
        { icon: FaChalkboardTeacher, path: '/mentorship' },
    ];

    return (
        <div>
            <div className='h-16 top-0 fixed bg-white left-0 w-16 md-hidden'></div>
            <div className="fixed left-0 top-16 h-[calc(100%-4rem)] w-16 bg-white shadow-lg flex flex-col items-center py-4 space-y-6">
                {menuItems.map((item, index) => (
                    <SidebarItem 
                        key={index}
                        icon={item.icon}
                        isActive={location.pathname === item.path}
                        onClick={() => navigate(item.path)}
                    />
                ))}
            </div>
        </div>
    );
};