const StartStudying = () => {

    return (
        <button onClick={() => window.scrollTo({ top: document.getElementById('start').offsetTop - 50, behavior: 'smooth' })} className="relative group border-none bg-transparent p-0 outline-none cursor-pointer font-mono font-light uppercase text-base">
            <span className="absolute top-0 left-0 w-full h-full bg-orange-500 bg-opacity-25 rounded-lg transform translate-y-0.5 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-[250ms] group-active:translate-y-px" />
            <span className="absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-l from-orange-600 via-orange-500 to-orange-600" />
            <div className="relative flex items-center justify-between py-3 px-6 text-lg text-white rounded-lg transform -translate-y-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 gap-3 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110">
                <span className="select-none">Start session</span>
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2 -mr-1 transition duration-250 group-hover:translate-x-1">
                    <path clipRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" fillRule="evenodd" />
                </svg>
            </div>
        </button>
    );
}

export default StartStudying;
