/**
 * Contact & Consultation Enquiry Service.
 * Form validation and submission handler.
 * Ready for Phase 2 webhook / database lead management.
 */

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service: string;
  description: string;
}

export interface FormSubmissionResult {
  success: boolean;
  message: string;
  leadId?: string;
  errors?: Record<string, string>;
}

export function validateContactForm(data: ContactFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please provide your name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid business email address.';
  }

  if (!data.service || data.service === '') {
    errors.service = 'Please select a service or area of interest.';
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.description = 'Please describe your process or goals (at least 10 characters).';
  }

  return errors;
}

export async function submitContactEnquiry(
  data: ContactFormData
): Promise<FormSubmissionResult> {
  const errors = validateContactForm(data);
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Please resolve the highlighted validation errors.',
      errors
    };
  }

  // Check if a Phase 2 webhook is active in environment variables
  const webhookUrl = import.meta.env.VITE_LEAD_WEBHOOK_URL;

  if (webhookUrl && !webhookUrl.includes('example.com')) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          submittedAt: new Date().toISOString(),
          source: 'MRK AI Website Lead Form'
        })
      });
      if (!res.ok) throw new Error('Failed to deliver lead to webhook endpoint');
      return {
        success: true,
        message: 'Your enquiry has been received. Ravi Kiran will review and respond shortly.',
        leadId: `LEAD-${Date.now().toString().slice(-6)}`
      };
    } catch (err: any) {
      console.warn('Phase 2 webhook unavailable, falling back to local simulation:', err);
    }
  }

  // Phase 1 Frontend-Only Simulation
  await new Promise(resolve => setTimeout(resolve, 800));

  return {
    success: true,
    message: 'Enquiry received in simulation mode. For real contact, reach out at kiranmukkarula.work@gmail.com.',
    leadId: `SIM-${Date.now().toString().slice(-6)}`
  };
}
