import emailjs from 'emailjs-com';

export interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  contactEmail: string;
}

export const emailConfig: EmailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_thde51k',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_dikqnx7',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'KkOaLV5ja-W7kDfXv',
  contactEmail: 'contact.statkick@gmail.com',
};

export interface SendContactEmailParams {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export async function sendContactEmail(params: SendContactEmailParams): Promise<void> {
  const { serviceId, templateId, publicKey } = emailConfig;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('Email service configuration is currently unavailable. Please use our direct contact email.');
  }

  // Exact template parameters mapped for template_dikqnx7
  const templateParams: Record<string, string> = {
    from_name: params.name,
    from_email: params.email,
    subject: params.subject || 'General Feedback / Inquiry',
    message: params.message,
    name: params.name,
    reply_to: params.email,
    timestamp: new Date().toISOString(),
  };

  await emailjs.send(serviceId, templateId, templateParams, publicKey);
}
