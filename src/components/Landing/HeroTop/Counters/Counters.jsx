import { motion } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react';

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

export default function Counters() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 bg-[#FFE5D9] rounded-3xl p-4 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
            <Counter value={100} label="Sample papers" />
            <Counter value={3000} label="Topic-Wise Questions" />
            <Counter value={1000} label="Students Enrolled" />
            <Counter value={100} label="Mentors Support" />
        </motion.div>
    );
}
