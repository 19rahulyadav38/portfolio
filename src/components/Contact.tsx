"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link, Mail, Send, CheckCircle, XCircle, X } from "lucide-react";
import { useState } from "react";
import { submitContactForm } from "@/app/actions";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalState, setModalState] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    try {
      // Calls the secure Next.js 14 Server Action
      const data = await submitContactForm(formData);

      if (data.success) {
        setModalState({ show: true, type: "success", message: "Thanks for reaching out! I'll get back to you soon." });
        formElement.reset();
      } else {
        console.error("Form Error", data);
        setModalState({ show: true, type: "error", message: "Something went wrong processing your request. Please try again." });
      }
    } catch (error) {
      console.error("Submission Error", error);
      setModalState({ show: true, type: "error", message: "Network error occurred. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative">
      {/* Modal Notification */}
      <AnimatePresence>
        {modalState.show && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#111] border border-white/10 p-6 rounded-2xl shadow-2xl max-w-sm w-full relative"
            >
              <button 
                onClick={() => setModalState(prev => ({ ...prev, show: false }))}
                className="absolute top-4 right-4 text-brand-muted hover:text-white transition-colors"
                type="button"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex flex-col items-center text-center mt-4">
                {modalState.type === "success" ? (
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                ) : (
                  <XCircle className="w-16 h-16 text-red-500 mb-4" />
                )}
                <h3 className="text-xl font-bold text-white mb-2">
                  {modalState.type === "success" ? "Message Sent!" : "Error Sending"}
                </h3>
                <p className="text-brand-muted mb-6">
                  {modalState.message}
                </p>
                <button
                  type="button"
                  onClick={() => setModalState(prev => ({ ...prev, show: false }))}
                  className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-brand/10 rounded-xl text-brand">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
          </div>
          <p className="text-brand-muted mb-8 leading-relaxed">
            I'm currently looking for new opportunities as a Senior Software Engineer.
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-brand-muted hover:text-white transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <a href="mailto:19rahulyadav38@gmail.com" className="hover:underline">19rahulyadav38@gmail.com</a>
            </div>
            <div className="flex items-center gap-3 text-brand-muted hover:text-white transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <a href="tel:+916306875871" className="hover:underline">+91 6306875871</a>
            </div>
            <div className="flex items-center gap-3 text-brand-muted hover:text-white transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <span>Sector 121, Noida, Uttar Pradesh</span>
            </div>
          </div>

          <a
            href="https://www.linkedin.com/in/rahulyadav19/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 glass-panel hover:bg-brand/10 hover:border-brand/30 transition-all duration-300 group"
          >
            <Link className="w-5 h-5 text-[#0077b5] group-hover:scale-110 transition-transform" />
            <span className="font-medium">Connect on LinkedIn</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <form onSubmit={handleSubmit} className="glass-panel p-8 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-brand-muted mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-muted mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-brand-muted mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand text-white py-3 rounded-lg font-medium hover:bg-brand-hover transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Sending..." : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
