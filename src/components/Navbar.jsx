import { Bell } from 'lucide-react'
import ProfileIcon from '../assets/profile.svg'

export function Navbar() {
    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                <div className="flex-shrink-0 flex items-center">
                    <span className="text-[#F14A16] mooli-regular text-[42px] w-[291px] h-[93px] font-normal leading-[64px] flex items-center text-center z-50 ml-8">
                        Boardly.in
                    </span>
                </div>
                    <div className="flex items-center">
                        <button className="p-2 rounded-full text-gray-400 hover:text-gray-600">
                            <span className="sr-only">View notifications</span>
                            <Bell className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <button className="ml-3 p-2 rounded-full text-gray-400 hover:text-gray-600">
                            <span className="sr-only">View profile</span>
                            <img src={ProfileIcon} alt="Profile" className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

