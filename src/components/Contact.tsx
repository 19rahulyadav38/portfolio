"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone, Send, CheckCircle, XCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { submitContactForm } from "@/app/actions";
import { SectionHeading } from "@/components/SectionHeading";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalState, setModalState] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeModal = () => setModalState(prev => ({ ...prev, show: false }));

  useEffect(() => {
    if (!modalState.show) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [modalState.show]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    try {
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
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div aria-hidden="true" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/15 blur-[140px] rounded-full pointer-events-none" />
      {/* Modal Notification */}
      <AnimatePresence>
        {modalState.show && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-background/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#111] border border-white/10 p-6 rounded-2xl shadow-2xl max-w-sm w-full relative"
            >
              <button
                onClick={closeModal}
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
                <h3 id="contact-modal-title" className="text-xl font-bold text-white mb-2">
                  {modalState.type === "success" ? "Message Sent!" : "Error Sending"}
                </h3>
                <p className="text-brand-muted mb-6">
                  {modalState.message}
                </p>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeModal}
                  className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeading
            eyebrow="// 07 · open a session"
            title={<>Let&apos;s build something that <span className="text-gradient">stays up.</span></>}
            description="Whether you have a question, an opportunity, or just want to say hi, I'll try my best to get back to you!"
          />

          <ul className="space-y-3 mb-8">
            <li>
              <a href="mailto:19rahulyadav38@gmail.com" className="group flex items-center gap-4 text-brand-muted hover:text-white transition-colors">
                <span className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0"><Mail className="w-4 h-4" /></span>
                19rahulyadav38@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+916306875871" className="group flex items-center gap-4 text-brand-muted hover:text-white transition-colors">
                <span className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0"><Phone className="w-4 h-4" /></span>
                +91 6306875871
              </a>
            </li>
            <li className="flex items-center gap-4 text-brand-muted">
              <span className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0"><MapPin className="w-4 h-4" /></span>
              Sector 121, Noida, Uttar Pradesh
            </li>
          </ul>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.linkedin.com/in/rahulyadav19/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 hover:bg-white/5 transition-colors"
            >
              LinkedIn
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="https://github.com/19rahulyadav38"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 hover:bg-white/5 transition-colors"
            >
              GitHub
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-panel overflow-hidden self-start"
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-white/[0.02]">
            <span className="w-2.5 h-2.5 rounded-full bg-danger/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-warn/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-signal/70" />
            <span className="ml-3 font-mono text-xs text-brand-muted">new-message.ts</span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            {/* Honeypot: hidden from people, bots tend to fill it in */}
            <input
              type="text"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <div>
              <label htmlFor="name" className="block font-mono text-xs text-brand-light mb-2">name</label>
              <input type="text" id="name" name="name" required maxLength={100} className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 placeholder:text-white/25 focus:outline-none focus:border-brand/60 focus:ring-1 focus:ring-brand/60 transition-colors" placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="email" className="block font-mono text-xs text-brand-light mb-2">email</label>
              <input type="email" id="email" name="email" required maxLength={200} className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 placeholder:text-white/25 focus:outline-none focus:border-brand/60 focus:ring-1 focus:ring-brand/60 transition-colors" placeholder="john@example.com" />
            </div>
            <div>
              <label htmlFor="message" className="block font-mono text-xs text-brand-light mb-2">message</label>
              <textarea id="message" name="message" required maxLength={5000} rows={5} className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 placeholder:text-white/25 focus:outline-none focus:border-brand/60 focus:ring-1 focus:ring-brand/60 transition-colors resize-none" placeholder="Tell me about your project or role..." />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand text-white py-3.5 rounded-lg font-medium hover:bg-brand-hover transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-brand/25"
            >
              {isSubmitting ? "Sending..." : (
                <>
                  <span>Send message</span>
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
