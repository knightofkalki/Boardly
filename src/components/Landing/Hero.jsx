import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import HeroImage from "../../assets/hero.svg"
import { API_URL } from "../../shared/api";
import { useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';


const passwordStrength = (password) => {
	const criteria = [
	  { regex: /[A-Z]/, score: 1 }, 
	  { regex: /[a-z]/, score: 1 }, 
	  { regex: /[0-9]/, score: 1 }, 
	  { regex: /[!@#$%^&*(),.?":{}|<>]/, score: 1 }, 
	  { regex: /.{8,}/, score: 1 }, 
	];
  
	let score = 0;
  
	criteria.forEach((criterion) => {
	  if (criterion.regex.test(password)) {
		score += criterion.score;
	  }
	});
  
	return score;
  };
  
  const PasswordStrengthMeter = ({ password }) => {
	const [strength, setStrength] = useState(0);
	const [strengthLabel, setStrengthLabel] = useState('');
	const [strengthColor, setStrengthColor] = useState('');
  
	useEffect(() => {
	  const strengthScore = passwordStrength(password);
  
	  setStrength(strengthScore);
  
	  if (strengthScore <= 1) {
		setStrengthLabel('Weak');
		setStrengthColor('red');
	  } else if (strengthScore === 2) {
		setStrengthLabel('Fair');
		setStrengthColor('orange');
	  } else if (strengthScore === 3) {
		setStrengthLabel('Good');
		setStrengthColor('yellow');
	  } else if (strengthScore >= 4) {
		setStrengthLabel('Strong');
		setStrengthColor('green');
	  }
	}, [password]);
	if(password==""){return null}
	return (
	  <div className="mt-2">
		<div className="w-full bg-gray-200 rounded-full h-2.5">
		  <div
			className={`h-2.5 rounded-full ${strengthColor === 'red' && 'bg-red-500'} ${strengthColor === 'orange' && 'bg-orange-400'} ${strengthColor === 'yellow' && 'bg-yellow-400'} ${strengthColor === 'green' && 'bg-green-400'}`}
			style={{ width: `${(strength / 5) * 100}%` }}
		  ></div>
		</div>
		<div className="mt-1 text-sm">
		  <span className={`font-semibold ${strengthColor === 'red' && 'text-red-500'} ${strengthColor === 'orange' && 'text-orange-500'} ${strengthColor === 'yellow' && 'text-yellow-500'} ${strengthColor === 'green' && 'text-green-500'}`}>
			{strengthLabel}
		  </span>
		</div>
	  </div>
	);
  };

function Counter({ value, label }) {
	const [count, setCount] = useState(0);
	const [hasAnimated, setHasAnimated] = useState(false); // Prevent re-triggering animation
	const startAnimation = useCallback(() => {
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
	}, [hasAnimated, value]);

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

		const currentRef = ref.current;
		if (currentRef) {
			observer.observe(currentRef);
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, [hasAnimated, startAnimation]); // Ensure effect depends on the `hasAnimated` flag

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
		password: '',
		gender: '',
	});
	const [isEmailVerified, setIsEmailVerified] = useState(false);
	const [isVerificationInProgress, setIsVerificationInProgress] = useState(false)
	const [showOtp, setShowOtp] = useState(false)
	const [showEmailVerifyBtn, setShowEmailVerifyBtn] = useState(true)
	const [showVerificationStatus, setShowVerificationStatus] = useState(false)
	const [passwordsMatch, setPasswordsMatch] = useState(true)
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(true);

	const handleEmailVerification = async () => {
		if (!formData.email) return;

		setIsVerificationInProgress(true);
		try {
			
			const response = await fetch(`${API_URL}/auth/email_verification`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email: formData.email }),
			});
			console.log(response)
			if (response.ok) {
				console.log('OTP sent successfully');
				setShowOtp(true)
			} else {
				const error = await response.json();
				console.error('Error sending OTP:', error);
				alert(`Error sending OTP: ${error.message}`);
			}
		} catch (error) {
			console.error('Error during OTP request:', error);
			alert('Something went wrong. Please try again.');
		} finally {
			setIsVerificationInProgress(false);
		}
	};

	const handleOtpVerification = async (e) => {
		e.preventDefault();
		if (!formData.otp || !formData.email) return;

		try {
			const response = await fetch(`${API_URL}/auth/email_verification-otp`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email: formData.email, otp: formData.otp }),
			});

			if (response.ok) {
				const result = await response.json();
				console.log('OTP verification successful:', result);
				setIsEmailVerified(true); // Set email as verified
				setShowOtp(false)
				setShowEmailVerifyBtn(false)
				setShowVerificationStatus(true)
			} else {
				const error = await response.json();
				console.error('OTP verification failed:', error);
				alert(`OTP verification failed: ${error.message}`);
			}
		} catch (error) {
			console.error('Error during OTP verification:', error);
			alert('Something went wrong during OTP verification. Please try again.');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword && !isLogin) {
			setPasswordsMatch(false); 
			return;
		  }
		  setPasswordsMatch(true); 
		  setShowConfirmPassword(false)
		setShowVerificationStatus(false)
		if (isLogin) {
			console.log('login');
			try {
				const loginSuccessful = await login(formData.email, formData.password);
				if (loginSuccessful) {
					console.log('Logged in successfully!');
					navigate('/', { state: { fromLogin: true } });
				} else {
					console('Invalid credentials. Please try again.');
				}
			} catch (error) {
				console.error('Error during login:', error);
				alert('Something went wrong during login. Please try again.');
			}
		} else {
			const apiUserClass = formData.class === '10th' ? '10' : '12';

			const signupData = {
				name: formData.fullName,
				gender: formData.gender,
				email: formData.email,
				password: formData.password,
				phone: formData.phone,
				userClass: apiUserClass,
				institute: formData.coaching || 'N/A',
			};

			try {
				const response = await fetch(`${API_URL}/auth/register`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(signupData),
				});

				if (response.ok) {
					const result = await response.json();
					console.log('Signup successful:', result);
					console.log('Signup successful! Please log in.');
					setIsLogin(true);
				} else {
					const error = await response.json();
					console.error('Signup failed:', error);
					alert(`Signup failed: ${error.message}`);
				}
			} catch (error) {
				console.error('Error during signup:', error);
				alert('Something went wrong during signup. Please try again.');
			}
		}
	};

	const goLogin = ()=>{
		setIsLogin(false)
		setShowConfirmPassword(true)
	}
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
								onClick={() => {setIsLogin(!isLogin);
									setShowConfirmPassword(false)}}
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
												<>
													<div>
														<label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
														<select
															id="gender"
															className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
															value={formData.gender}
															onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
															required
														>
															<option value="">Select Gender</option>
															<option value="male">Male</option>
															<option value="female">Female</option>
															<option value="other">Other</option>
														</select>
													</div>
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
												</>
											)}
										</>
									)}
									<div>

									<label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
									<div className="flex items-center">
										<input
										id="email"
										type="email"
										placeholder="Enter Email"
										className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										value={formData.email}
										onChange={(e) => setFormData({ ...formData, email: e.target.value })}
										required
										/>
										{
											showEmailVerifyBtn && !isLogin && (
												<button
													type="button"
													onClick={handleEmailVerification}
													className="ml-2 py-2 px-4 text-sm font-medium text-white bg-orange-500 hover:bg-orange-700 rounded-md"
													disabled={isVerificationInProgress}
													>
													{isVerificationInProgress ? 'Verifying...' : 'Verify'}
												</button>
											)
										}
										{
											isEmailVerified && showVerificationStatus &&(
												<p className='font-bold rounded-md ml-4 text-green-400 p-2'>Verified</p>
											)
										}
									</div>
									</div>

									{showOtp && (
									<>
										<div>
										<label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP</label>
										<input
											id="otp"
											type="text"
											placeholder="Enter OTP"
											className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
											value={formData.otp}
											onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
											required
										/>
										</div>
										<button
										type="button"
										onClick={handleOtpVerification}
										className="mt-4 py-2 px-4 text-sm font-medium text-white bg-orange-500 hover:bg-orange-700 rounded-md"
										>
										Verify OTP
										</button>
									</>
									)}

									<label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
										<div className="relative">
										<input
											id="password"
											type={passwordVisible ? 'text' : 'password'}
											className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
											value={formData.password}
											onChange={(e) => setFormData({ ...formData, password: e.target.value })}
											required
										/>
										
										<button
											type="button"
											onClick={() => setPasswordVisible(!passwordVisible)}
											className="absolute inset-y-0 right-3 flex items-center"
										>
											{passwordVisible?  <FaRegEyeSlash /> : <FaRegEye />}
										</button>
										
										</div>
										
							
									{showConfirmPassword && (
										<>
										<PasswordStrengthMeter password={formData.password} />
										<div>
										<label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
										<div className="relative">
										<input
											id="confirmPassword"
											type={confirmPasswordVisible ? 'text' : 'password'}
											className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
											value={formData.confirmPassword}
											onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
											required
										/>
										<button
											type="button"
											onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
											className="absolute inset-y-0 right-3 flex items-center"
										>
											{confirmPasswordVisible?  <FaRegEyeSlash /> : <FaRegEye />}
										</button>
										
										</div>
										
									</div>
									</>
									)}
									
									
									{!passwordsMatch && !isLogin && (
										<p className="text-red-500 text-sm mt-2">Passwords do not match.</p>
									)}
									<button
									type="submit"
									className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${(!isEmailVerified && !isLogin)? 'bg-gray-400 cursor-not-allowed': 'bg-orange-500 hover:bg-orange-700 cursor-pointer'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
									disabled={!isEmailVerified && !isLogin} 
									
									>
									{isLogin ? 'Sign In' : 'Sign Up'}
									
									</button>
									{isLogin && (
											<button
												type="button"
												className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${(!isEmailVerified && !isLogin)? 'bg-gray-400 cursor-not-allowed': 'bg-orange-500 hover:bg-orange-700 cursor-pointer'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
												onClick={() => {
													navigate('/forgot-password');
												}}
											>
												Forgot Password?
											</button>
										)
										}
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
							We&apos;ve Got Your Back
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
