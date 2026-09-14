import React, { useState, useEffect, useRef } from 'react';
import { sendContactEmail, emailConfig } from '../../config/email';
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setTimeout(() => nameInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setIsSubmitted(false);
      setErrors({});
      setSubmitError(null);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) newErrors.name = 'Please enter your name.';
    if (!email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!message.trim() || message.trim().length < 10) {
      newErrors.message = 'Please provide a message with at least 10 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setSubmitError(null);

    try {
      await sendContactEmail({
        name: name.trim(),
        email: email.trim(),
        subject: 'Inquiry from StatKick Navbar Modal',
        message: message.trim(),
      });
      setIsSubmitted(true);
    } catch (error: unknown) {
      console.error('Email submission error:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : `Unable to dispatch message at this time. Please reach out directly to ${emailConfig.contactEmail}.`;
      setSubmitError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setName('');
    setEmail('');
    setMessage('');
    setIsSubmitted(false);
    setSubmitError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg rounded-2xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 text-gray-900 relative animate-in zoom-in-95 duration-200"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <span className="inline-block px-2.5 py-1 text-xs font-semibold text-green-700 bg-green-50 rounded-full mb-2">
                Get In Touch
              </span>
              <h2 id="contact-modal-title" className="text-2xl font-bold tracking-tight">
                Contact StatKick Team
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Have a question about our football statistics formulas, a tool suggestion, or feedback? Drop us a note below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="modal-name" className="block text-xs font-semibold text-gray-700 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  ref={nameInputRef}
                  id="modal-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className={`w-full px-3.5 py-2 text-sm rounded-lg border ${
                    errors.name
                      ? 'border-red-500 bg-red-50/20 focus:ring-red-500'
                      : 'border-gray-300  bg-white  focus:ring-green-500'
                  } focus:outline-none focus:ring-2`}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="flex items-center gap-1 text-xs text-red-600 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="modal-email" className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="modal-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className={`w-full px-3.5 py-2 text-sm rounded-lg border ${
                    errors.email
                      ? 'border-red-500 bg-red-50/20 focus:ring-red-500'
                      : 'border-gray-300  bg-white  focus:ring-green-500'
                  } focus:outline-none focus:ring-2`}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="flex items-center gap-1 text-xs text-red-600 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="modal-message" className="block text-xs font-semibold text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="modal-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you with football metrics or site features?"
                  className={`w-full px-3.5 py-2 text-sm rounded-lg border ${
                    errors.message
                      ? 'border-red-500 bg-red-50/20 focus:ring-red-500'
                      : 'border-gray-300  bg-white  focus:ring-green-500'
                  } focus:outline-none focus:ring-2`}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p className="flex items-center gap-1 text-xs text-red-600 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.message}
                  </p>
                )}
              </div>

              {submitError && (
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Failed to send message</p>
                    <p>{submitError}</p>
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed rounded-lg shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Submit Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Message Sent Successfully
            </h3>
            <p className="text-sm text-gray-600 max-w-sm mx-auto mb-6">
              Thank you for reaching out, <strong>{name}</strong>! Your message has been received by our editorial team. We will review your inquiry and respond to <strong>{email}</strong> promptly.
            </p>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
