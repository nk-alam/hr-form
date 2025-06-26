import { useState, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { ApplicationFormData, EmailTemplateParams } from '../types/application';

// EmailJS configuration - Replace with your actual keys
const EMAILJS_SERVICE_ID = 'service_shahi_pickle';
const EMAILJS_TEMPLATE_ID = 'template_job_application';
const EMAILJS_PUBLIC_KEY = 'your_emailjs_public_key';

interface SubmissionData extends ApplicationFormData {
  jobId: string;
  jobTitle: string;
}

export const useEmailService = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const submitApplication = useCallback(async (data: SubmissionData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Initialize EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // Prepare email template parameters
      const templateParams: EmailTemplateParams = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        portfolioUrl: data.portfolioUrl || 'Not provided',
        githubUrl: data.githubUrl || 'Not provided',
        linkedinUrl: data.linkedinUrl || 'Not provided',
        experience: data.experience,
        coverLetter: data.coverLetter || 'Not provided',
        jobId: data.jobId,
        jobTitle: data.jobTitle,
      };

      // Convert resume to base64 if provided
      if (data.resume) {
        try {
          const resumeBase64 = await convertFileToBase64(data.resume);
          templateParams.resumeAttachment = resumeBase64;
        } catch (error) {
          console.error('Error converting resume to base64:', error);
        }
      }

      // Send email to hr@shahipickle.com using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          ...templateParams,
          to_email: 'hr@shahipickle.com',
        },
        EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setSubmitStatus('success');
        
        // Send auto-reply to applicant
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          'template_auto_reply',
          {
            to_email: data.email,
            applicant_name: data.fullName,
            job_title: data.jobTitle,
          },
          EMAILJS_PUBLIC_KEY
        );
        
        return { success: true, message: 'Application submitted successfully!' };
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Email submission error:', error);
      setSubmitStatus('error');
      return { 
        success: false, 
        message: 'Failed to submit application. Please try again.' 
      };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    submitApplication,
    isSubmitting,
    submitStatus,
  };
};