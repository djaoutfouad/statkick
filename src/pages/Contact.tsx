import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { sendContactEmail, emailConfig } from '../config/email';
import { InputField } from '../components/ui/InputField';
import { Button } from '../components/ui/Button';
import { Mail, Send, CheckCircle2, MessageSquare, HelpCircle, ShieldCheck, AlertCircle, Loader2, Copy, ExternalLink } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const seoData = {
    title: 'Contact Support & Feedback | StatKick',
    description: 'Get in touch with the StatKick analytics team. Inquire about our football mathematical models, suggest new tools, or submit feedback.',
    canonicalPath: '/contact',
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Feedback / Tool Suggestion');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Spam defense honeypot
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

  const contactEmail = emailConfig.contactEmail;

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) errs.name = 'Please enter your name.';
    if (!email.trim()) {
      errs.email = 'Please provide a valid contact email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a properly formatted email address.';
    }
    if (!message.trim() || message.trim().length < 10) {
      errs.message = 'Please provide at least 10 characters explaining your inquiry.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const getMailtoUrl = () => {
    const fullBody = `Name: ${name}\nEmail: ${email}\nCategory: ${subject}\n\nMessage:\n${message}`;
    return `mailto:${contactEmail}?subject=${encodeURIComponent(`[StatKick Inquiry] ${subject}`)}&body=${encodeURIComponent(fullBody)}`;
  };

  const handleCopyMessage = () => {
    const fullText = `To: ${contactEmail}\nSubject: [StatKick Inquiry] ${subject}\nFrom: ${name} <${email}>\n\n${message}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Spam / bot protection: honeypot check
    if (honeypot.trim().length > 0) {
      return;
    }

    // 2. Rapid submission throttle (5 seconds cooldown)
    const now = Date.now();
    if (now - lastSubmitTime < 5000) {
      setSubmitError('Please wait a few moments before submitting another request.');
      return;
    }

    if (!validate()) return;

    setIsLoading(true);
    setSubmitError(null);
    setLastSubmitTime(now);

    try {
      await sendContactEmail({
        name: name.trim(),
        email: email.trim(),
        subject: `[${subject}] Inquiry from ${name.trim()}`,
        message: message.trim(),
      });
      setSubmitted(true);
    } catch (error: unknown) {
      console.error('Email dispatch error:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : `Unable to dispatch message at this time. Please reach out directly to ${contactEmail}.`;
      setSubmitError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setHoneypot('');
    setSubmitError(null);
    setSubmitted(false);
  };

  return (
    <div className="w-full pb-8">
      <SEOHead {...seoData} />
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <header className="my-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200 mb-3">
          <Mail className="w-3.5 h-3.5" />
          Support & Communications
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
          Contact StatKick
        </h1>
        <p className="mt-2 text-base text-gray-600 max-w-2xl">
          Have an inquiry regarding our football metric models, a feature suggestion, or feedback on our tools? We are glad to hear from you.
        </p>
      </header>

      {/* Meaningful Editorial Context Before Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-green-600" />
              General Inquiries
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              We welcome thoughts on formula refinements, edge cases in scoring algorithms, and suggestions for new tactical calculators.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
              <HelpCircle className="w-4 h-4 text-green-600" />
              Formula Questions
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Wondering why a specific positional weight is assigned in our Player Performance Rater or how PPDA is mapped? Check out our tool methodologies or reach out directly.
            </p>
          </div>

          <div className="rounded-2xl border border-green-200 bg-green-50/50 p-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-green-800 mb-1">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              Privacy Assurance
            </div>
            <p className="text-[11px] text-green-700 leading-relaxed">
              Messages submitted via this interface are used strictly to reply to your inquiry. We do not sell or profile contact information.
            </p>
          </div>
        </div>

        {/* Contact Form Console */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-2xs">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot field for bot suppression (hidden from real users) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website_hp">Leave this field blank</label>
                  <input
                    id="website_hp"
                    type="text"
                    name="website_hp"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    id="contact-name"
                    label="Your Name"
                    type="text"
                    value={name}
                    onChange={setName}
                    placeholder="e.g. Alex Ferguson"
                    required
                    error={errors.name}
                  />
                  <InputField
                    id="contact-email"
                    label="Email Address"
                    type="text"
                    value={email}
                    onChange={setEmail}
                    placeholder="alex@example.com"
                    required
                    error={errors.email}
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-gray-700 mb-1">
                    Subject Category
                  </label>
                  <select
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  >
                    <option value="Feedback / Tool Suggestion">Feedback / Tool Suggestion</option>
                    <option value="Formula Clarification">Formula Clarification</option>
                    <option value="Bug Report in Calculation">Bug Report in Calculation</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please describe your question, feedback, or tool suggestion in detail..."
                    className={`block w-full rounded-lg border py-2.5 px-3.5 text-sm text-gray-900 bg-white transition-colors focus:outline-none focus:ring-2 ${
                      errors.message
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-green-600 focus:ring-green-500/20'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-600 mt-1">{errors.message}</p>
                  )}
                </div>

                {submitError && (
                  <div className="space-y-3 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs leading-relaxed">
                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">Unable to dispatch message</p>
                        <p>{submitError}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-red-200">
                      <a
                        href={getMailtoUrl()}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-red-300 text-red-700 text-xs font-semibold hover:bg-red-50"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Open in Mail Client
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyMessage}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-red-300 text-red-700 text-xs font-semibold hover:bg-red-50"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        {copied ? 'Copied to Clipboard!' : 'Copy Formatted Text'}
                      </button>
                    </div>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-xs text-gray-500 hover:text-green-600 underline"
                  >
                    Direct email: {contactEmail}
                  </a>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoading}
                    icon={isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  >
                    {isLoading ? 'Sending Message...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Message Sent Successfully
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you, <strong>{name}</strong>! Your inquiry regarding <em>"{subject}"</em> has been received by our editorial and technical team. We will review your message and reply to <strong>{email}</strong> shortly.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                  <a
                    href={getMailtoUrl()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors shadow-2xs"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open in Mail Client
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors shadow-2xs"
                  >
                    <Copy className="w-4 h-4 text-gray-500" />
                    {copied ? 'Copied!' : 'Copy Message & Recipient'}
                  </button>
                </div>

                <Button variant="secondary" size="sm" onClick={handleReset}>
                  Send Another Inquiry
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Informational Guidance Section */}
      <section className="rounded-2xl border border-gray-200 bg-gray-50/50 p-6 text-xs text-gray-600 space-y-3 leading-relaxed mt-8">
        <h3 className="text-sm font-bold text-gray-900">
          Frequently Asked Contact Topics
        </h3>
        <p>
          <strong>Can I request custom statistical formulas?</strong> Yes! We frequently expand our toolkit with emerging metrics from expected goals (xG) to defensive pressing sequences.
        </p>
        <p>
          <strong>Are calculations stored on your servers?</strong> No. All calculator runs happen strictly inside your browser environment.
        </p>
      </section>
    </div>
  );
};
