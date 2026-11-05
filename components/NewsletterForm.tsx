'use client';

import { useState } from "react";

export default function NewsletterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim() || !email.trim()) {
            alert("Please fill in both name and email fields.");
            return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Here you can handle the form submission, e.g., send the data to your backend or an email service
        console.log("Form submitted:", { name, email });

        setSuccess(true);
    }



    return (
        <section className="mx-auto w-full max-w-xl px-4 py-12 sm:px-6">
            <h2 className="mb-3 text-2xl font-bold text-green-700">Join Our Health Newsletter</h2>

            <p className="mb-6 text-gray-700">Get helpful health and wellness articles delivered to your inbox</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="mb-1 block font-medium text-green-500">Full name</label>
                    <input type="text" id="name" value={name} onChange={(e) => { setName(e.target.value); setSuccess(false) }} className="w-full rounded-lg border border-green-500 text-black/70 px-4 py-3 outline-none" placeholder="Enter your name" />
                </div>

                <div>
                    <label htmlFor="email" className="mb-1 block font-medium text-green-500">Email address</label>
                    <input type="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value); setSuccess(false) }} className="w-full rounded-lg border border-green-500 text-black/70 outline-none px-4 py-3" placeholder="Enter your email" />
                </div>

                <button type="submit" className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800">Subscribe</button>
            </form>

            {success && <p className="mt-4 text-green-700 font-medium">Thank you! You have successfully subscribed</p>}
        </section>
    )
}
