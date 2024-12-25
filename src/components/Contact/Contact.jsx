import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./contact.css";
import Support from "../../assets/support.webp"

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
        <>
            <div className="contact-container p-8 rounded-lg shadow-md">
                <div className="support mb-4">
                    <img src={Support} alt="Support" />
                </div>

                <form onSubmit={sendEmail} className="contact-form space-y-4">
                    <h2 className="text-xl font-semibold text-[#ec612a]">Send us a message</h2>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex gap-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Mail"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <textarea
                        name="message"
                        placeholder="Write your message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button type="submit" className="bg-[#ec612a] text-white py-2 px-4 rounded">
                        Send Message
                    </button>
                </form>
            </div>
        </>
    );
}

export default ContactForm;