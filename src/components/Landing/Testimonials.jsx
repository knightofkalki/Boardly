import testimonials from "../../data/testimonials.json";

export default function Testimonials() {
  return (
    <div className="py-20 overflow-hidden bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <h2 className="text-4xl font-bold text-center text-[#FF5533]">
          Hear From Our Students
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex gap-6 animate-marquee">
          {[...testimonials, ...testimonials].map((testimonial, idx) => (
            <div
              key={`${testimonial.name}-${idx}`}
              className="flex-shrink-0 w-[400px] bg-gray-50 rounded-2xl p-8 space-y-4"
            >
              <p className="text-gray-600 leading-relaxed">
                {testimonial.text}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[#FF5533] font-medium">
                  {testimonial.name}
                </span>
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
