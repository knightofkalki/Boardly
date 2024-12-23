import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import HeroImage from "../../assets/hero.svg"

function Counter({ value, label }) {
	const [count, setCount] = useState(0);
	const [hasAnimated, setHasAnimated] = useState(false); // Prevent re-triggering animation

	const startAnimation = () => {
			if (hasAnimated) return; // Avoid multiple triggers
			setHasAnimated(true);

			const duration = 1000; // Animation duration in milliseconds
			const frames = duration / 16; // Approximate frames at 60 FPS
			const increment = value / frames; // Increment per frame
			let current = 0;

			const animate = () => {
					current += increment;
					if (current >= value) {
							setCount(value); // Set final value and stop animation
							return;
					}
					setCount(Math.round(current)); // Update count
					requestAnimationFrame(animate);
			};

			requestAnimationFrame(animate); // Start animation
	};

	const ref = useRef(null);

	useEffect(() => {
			const observer = new IntersectionObserver(
					([entry]) => {
							if (entry.isIntersecting) {
									startAnimation();
							}
					},
					{ threshold: 0.5 } // Adjust the threshold for when the animation should start
			);

			if (ref.current) {
					observer.observe(ref.current);
			}

			return () => {
					if (ref.current) {
							observer.unobserve(ref.current);
					}
			};
	}, [hasAnimated]); // Ensure effect depends on the `hasAnimated` flag

	return (
			<div ref={ref} className="text-center">
					<span className="text-4xl font-bold text-gray-800">{count}+</span>
					<p className="mt-2 text-gray-600">{label}</p>
			</div>
	);
}


export default function Hero() {
	const [isLogin, setIsLogin] = useState(false);
	const { login } = useAuth();
	const navigate = useNavigate();
	
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		phone: '',
		class: '10th',
		password: '' 
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isLogin) {
			if (login(formData.email, formData.password)) {
				navigate('/');
			} else {
				alert('Invalid credentials. Try boardly@gmail.com / 123');
			}
		} else {
			console.log('Sign up form submitted:', formData);
		}
	};

	return (
		<div className="relative min-h-screen">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					<motion.div 
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						className="bg-white rounded-3xl shadow-lg p-8"
					>
						
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-semibold">
								{isLogin ? 'Welcome Back!' : 'Start practising, for free!'}
							</h2>
							<button 
								onClick={() => setIsLogin(!isLogin)}
								className="text-[#FF5533] hover:underline text-sm"
							>
								{isLogin ? 'New user? Sign up' : 'Already have an account? Login'}
							</button>
						</div>

						<AnimatePresence mode="wait">
							<motion.div
								key={isLogin ? 'login' : 'signup'}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
							>
								<button className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 px-4 mb-6 hover:bg-gray-50 transition-colors">
									<span className="w-5 h-5 flex items-center justify-center bg-white">
										<svg viewBox="0 0 24 24" width="18" height="18">
											<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
											<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
											<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
											<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
										</svg>
									</span>
									{isLogin ? 'Sign in with Google' : 'Sign up with Google'}
								</button>

								<div className="text-center mb-6">OR</div>

								<form onSubmit={handleSubmit} className="space-y-4">
									{!isLogin && (
										<>
											<div>
												<label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
												<input 
													id="fullName"
													type="text"
													placeholder="Your name"
													className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
													value={formData.fullName}
													onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
													required
												/>
											</div>
											<div>
												<label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
												<div className="flex">
													<span className="inline-flex items-center px-3 border border-r-0 rounded-l-md bg-gray-50 text-gray-500 sm:text-sm">
														+91
													</span>
													<input 
														id="phone"
														type="tel"
														placeholder="Enter your Mobile number"
														pattern="[0-9]{10}"
														className="flex-1 block w-full px-3 py-2 bg-white border border-l-0 border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
														value={formData.phone}
														onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
														required
													/>
												</div>
											</div>
											<div>
												<span className="block text-sm font-medium text-gray-700 mb-2">Select your Class</span>
												<div className="flex gap-8">
													<label className="inline-flex items-center">
														<input
															type="radio"
															className="form-radio text-blue-600"
															name="class"
															value="10th"
															checked={formData.class === '10th'}
															onChange={(e) => setFormData({ ...formData, class: e.target.value })}
														/>
														<span className="ml-2">Class 10th</span>
													</label>
													<label className="inline-flex items-center">
														<input
															type="radio"
															className="form-radio text-blue-600"
															name="class"
															value="12th"
															checked={formData.class === '12th'}
															onChange={(e) => setFormData({ ...formData, class: e.target.value })}
														/>
														<span className="ml-2">Class 12th</span>
													</label>
												</div>
											</div>
											{!isLogin && (
												<div>
													<label htmlFor="coaching" className="block text-sm font-medium text-gray-700">Select Coaching</label>
													<select
														id="coaching"
														className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
														value={formData.coaching}
														onChange={(e) => setFormData({ ...formData, coaching: e.target.value })}
														required
													>
														<option value="">Select your coaching</option>
														<option value="coaching1">Coaching 1</option>
														<option value="coaching2">Coaching 2</option>
														<option value="coaching3">Coaching 3</option>
													</select>
												</div>
						)}
										</>
									)}
									<div>
										<label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
										<input 
											id="email"
											type="email"
											placeholder="Enter Email"
											className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
											value={formData.email}
											onChange={(e) => setFormData({ ...formData, email: e.target.value })}
											required
										/>
									</div>
									<div>
										<label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
										<input 
											id="password"
											type="password"
											placeholder="Enter Password"
											className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
											value={formData.password}
											onChange={(e) => setFormData({ ...formData, password: e.target.value })}
											required
										/>
									</div>

									<button
										type="submit"
										className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
									>
										{isLogin ? 'Sign In' : 'Send OTP'}
									</button>
								</form>
							</motion.div>
						</AnimatePresence>
					</motion.div>
					<motion.div 
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						className="text-center lg:text-left"
					>
						<h1 className="text-4xl lg:text-5xl font-bold text-[#FF5722] mb-4">
							Boards? Bring It On!
						</h1>
						<h2 className="text-3xl lg:text-4xl font-bold text-[#FF5722] mb-8">
							We've Got Your Back
						</h2>
						<img
							src={HeroImage}
							alt="Student studying"
							className="mx-auto max-w-full h-auto"
						/>
					</motion.div>
				</div>
				<motion.div 
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mt-16 bg-[#FFE5D9] rounded-3xl p-8 grid grid-cols-2 lg:grid-cols-4 gap-8"
				>
					<Counter value={100} label="Sample papers" />
					<Counter value={3000} label="Topic-Wise Questions" />
					<Counter value={1000} label="Students Enrolled" />
					<Counter value={100} label="Mentors Support" />
				</motion.div>
			</div>
		</div>
	);
}
