import { useState } from "react";
import emailjs from "@emailjs/browser";
import Support from "../../assets/support.webp";

function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .send(
                "service_wvw6b88",
                "template_so10lhf",
                {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                },
                "hoJ1UE6r_Gr5Lcg9W"
            )
            .then(
                (result) => {
                    alert("Message sent successfully!");
                    console.log(result.text);
                },
                (error) => {
                    alert("Failed to send the message. Please try again later.");
                    console.log(error.text);
                }
            );
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 px-6 py-8">
            <div className="hidden md:block w-1/2 max-w-md">
                <img src={Support} alt="Support" className="rounded-lg shadow-md" />
            </div>

            <form onSubmit={sendEmail} className="w-full md:w-1/2 max-w-md bg-white p-6 md:p-8 rounded-lg shadow-lg space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Contact Us</h2>
                <a
                    href="/landing"
                    className="text-[#3c82f6] text-end block font-semibold hover:underline"
                >Go to Home
                </a>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#ec612a] focus:outline-none"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#ec612a] focus:outline-none"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#ec612a] focus:outline-none"
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#ec612a] focus:outline-none"
                    />
                </div>
                <textarea
                    name="message"
                    placeholder="Write your message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#ec612a] focus:outline-none"
                    rows="4"
                />
                <button
                    type="submit"
                    className="w-full bg-[#ec612a] text-white py-3 rounded font-semibold hover:bg-[#d55422] transition duration-300"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
}

export default ContactForm;
