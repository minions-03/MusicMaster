import React, { useState } from "react";
import API from "../services/api";

const ContactUs = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: ""
	});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");
		try {
			const response = await API.post("/contact", formData);
			if (response.data.success) {
				setIsSubmitted(true);
				setTimeout(() => {
					setIsSubmitted(false);
					setFormData({ name: "", email: "", message: "" });
				}, 3000);
			}
		} catch (err) {
			setError(err.response?.data?.message || "Failed to send message. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 py-12 px-4">
			<div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
				<h1 className="text-3xl font-bold text-center mb-6 text-purple-900">Contact Us</h1>
				{isSubmitted ? (
					<div className="text-center">
						<div className="text-6xl mb-4">✅</div>
						<h2 className="text-2xl font-bold text-gray-800 mb-4">Message Sent!</h2>
						<p className="text-gray-600 text-lg">Thank you for contacting us. We'll get back to you soon.</p>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
							<input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Your name" required />
						</div>
						<div>
							<label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
							<input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="your@email.com" required />
						</div>
						<div>
							<label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
							<textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none" placeholder="Type your message..." required></textarea>
						</div>
						{error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">{error}</div>}
						<button type="submit" disabled={isLoading} className={`w-full py-3 px-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 hover:scale-105'}`}>{isLoading ? 'Sending...' : 'Send Message'}</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default ContactUs;
