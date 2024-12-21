export function LandingNavbar() {
    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <span className="text-[#F14A16] mooli-regular text-[42px] w-[291px] h-[93px] font-normal leading-[64px] flex items-center text-center z-50 ml-8">
                            Boardly.in
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                            Sign In
                        </button>
                        <button className="px-4 py-2 bg-[#F14A16] text-white rounded-md hover:bg-[#d43e11]">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
