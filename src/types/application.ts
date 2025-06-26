import { z } from 'zod';

const baseApplicationSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[+]?[0-9]{10,14}$/, 'Please enter a valid phone number'),
  portfolioUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Please enter a valid GitHub URL').optional().or(z.literal('')),
  linkedinUrl: z.string().url('Please enter a valid LinkedIn URL').optional().or(z.literal('')),
  experience: z.enum(['0-1', '1-3', '3-5', '5+'], {
    errorMap: () => ({ message: 'Please select your experience level' }),
  }),
  coverLetter: z.string().max(1000, 'Cover letter must be under 1000 characters').optional(),
  resume: z.instanceof(File, { message: 'Please upload your resume' }).optional(),
  termsAccepted: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
});

// Job-specific schema variations
export const getApplicationSchema = (jobId: string) => {
  switch (jobId) {
    case 'graphic-designer':
      return baseApplicationSchema.extend({
        portfolioUrl: z.string().url('Please enter a valid portfolio URL').min(1, 'Portfolio URL is required for this position'),
      });
    
    case 'web-developer':
      return baseApplicationSchema.extend({
        githubUrl: z.string().url('Please enter a valid GitHub URL').min(1, 'GitHub profile is required for this position'),
      });
    
    case 'social-media-executive':
      return baseApplicationSchema.extend({
        linkedinUrl: z.string().url('Please enter a valid LinkedIn URL').min(1, 'LinkedIn profile is required for this position'),
      });
    
    default:
      return baseApplicationSchema;
  }
};

export type ApplicationFormData = z.infer<typeof baseApplicationSchema>;

export interface EmailTemplateParams {
  fullName: string;
  email: string;
  phone: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  experience: string;
  coverLetter?: string;
  resumeAttachment?: string;
  jobId: string;
  jobTitle: string;
}