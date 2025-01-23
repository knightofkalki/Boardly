import { useEffect, useState } from 'react';
import Banner from "../../assets/banner.svg";

export function LandingNavbar() {

	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > window.innerHeight) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div className="mb-10">
			<nav className={`bg-white shadow-lg fixed top-0 w-full z-50 ${scrolled ? 'scrolled' : ''}`}>
				<div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-[4.5rem]">
						<div className="flex-shrink-0 flex items-center">
							<span
								className="text-[#F14A16] mooli-regular text-[42px] h-[93px] font-normal leading-[64px] flex items-center text-center z-50 ml-8"
								style={{ cursor: 'default' }}
							>
								<img src={Banner} alt="Boardly" />
							</span>
						</div>
						<div className="flex items-center space-x-4">
							{scrolled ? (
								<>
									<a href="#" className="px-4 py-2 text-gray-600 hover:text-gray-800">
										Sign Up
									</a>
									<a href="#" className="px-4 py-2 text-gray-600 hover:text-gray-800">
										Log In
									</a>
								</>
							) : (
								<>
									<button className="px-4 py-2 text-gray-600 hover:text-gray-800">
										About
									</button>
									<a href="/contact" className="px-4 py-2 text-gray-600 hover:text-gray-800">
										Contact
									</a>
								</>
							)}
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
}
