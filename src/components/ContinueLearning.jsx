import { useNavigate } from "react-router-dom"

export function ContinueLearning() {
	const navigate = useNavigate();
	return (
		<div className="bg-white rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.1)] h-full">
			<div>
		  	<h3 className="text-lg font-semibold mb-10">Continue Learning</h3>
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-base font-normal text-gray-800">Physics</h3>
					<button onClick={() => {navigate('/subject/physics')}} className="bg-orange-500 text-white rounded-lg py-2 px-4 font-medium hover:bg-[#F14A16] transition-colors">Study</button>
				</div>
			</div>
		</div>
	)
}