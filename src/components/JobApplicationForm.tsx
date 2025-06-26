import React, { useState, useTransition, Suspense, useId } from 'react';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Link as LinkIcon, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Briefcase,
  FileText,
  Star,
  MapPin,
  Clock,
  Users,
  ArrowLeft,
  Github,
  Linkedin,
  Globe,
  Shield,
  Award,
  Heart
} from 'lucide-react';
import { ApplicationFormData, getApplicationSchema } from '../types/application';
import { useEmailService } from '../hooks/useEmailService';
import { FileUpload } from './FileUpload';

const FormSkeleton = () => (
  <div className="space-y-6">
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="skeleton h-14 w-full" />
    ))}
  </div>
);

interface JobApplicationFormProps {
  jobId: string;
  jobTitle: string;
}

export const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ jobId, jobTitle }) => {
  const [isPending, startTransition] = useTransition();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const { submitApplication, isSubmitting, submitStatus } = useEmailService();
  const formId = useId();

  const applicationSchema = getApplicationSchema(jobId);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    reset,
    watch,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      portfolioUrl: '',
      githubUrl: '',
      linkedinUrl: '',
      experience: undefined,
      coverLetter: '',
      resume: undefined,
      termsAccepted: false,
    },
  });

  const watchedFields = watch();

  const onSubmit = async (data: ApplicationFormData) => {
    startTransition(async () => {
      const result = await submitApplication({ ...data, jobId, jobTitle });
      if (result.success) {
        setShowSuccess(true);
        reset();
        setTimeout(() => setShowSuccess(false), 6000);
      } else {
        setShowError(true);
        setTimeout(() => setShowError(false), 6000);
      }
    });
  };

  const getFieldProgress = () => {
    const requiredFields = ['fullName', 'email', 'phone', 'experience', 'termsAccepted'];
    const completedFields = requiredFields.filter(field => {
      const value = watchedFields[field as keyof ApplicationFormData];
      return value && (typeof value === 'boolean' ? value : value.toString().trim() !== '');
    });
    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  const experienceOptions = [
    { value: '0-1', label: '0-1 years', description: 'Fresh graduate or entry level', icon: '🌱', color: 'from-green-400 to-emerald-500' },
    { value: '1-3', label: '1-3 years', description: 'Some professional experience', icon: '🌿', color: 'from-blue-400 to-cyan-500' },
    { value: '3-5', label: '3-5 years', description: 'Mid-level professional', icon: '🌳', color: 'from-purple-400 to-violet-500' },
    { value: '5+', label: '5+ years', description: 'Senior professional', icon: '🏆', color: 'from-orange-400 to-red-500' },
  ];

  const getJobSpecificFields = () => {
    switch (jobId) {
      case 'graphic-designer':
        return (
          <Controller
            name="portfolioUrl"
            control={control}
            render={({ field }) => (
              <motion.div
                className="form-group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <label htmlFor={`${formId}-portfolio`} className="form-label">
                  <Globe size={18} className="inline mr-2" />
                  Portfolio URL *
                </label>
                <div className="relative">
                  <input
                    {...field}
                    id={`${formId}-portfolio`}
                    type="url"
                    placeholder="https://your-portfolio.com"
                    className={`form-input pl-12 ${errors.portfolioUrl ? 'border-[var(--color-accent-red)] ring-red-100' : 'focus:ring-purple-100'}`}
                  />
                  <Globe size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--color-text-secondary)]" />
                </div>
                <p className="text-sm text-[var(--color-text-tertiary)] flex items-center gap-2">
                  <Star size={14} />
                  Link to your design portfolio, Behance, or Dribbble profile
                </p>
                {errors.portfolioUrl && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-[var(--color-accent-red)] flex items-center gap-1"
                  >
                    <AlertCircle size={16} />
                    {errors.portfolioUrl.message}
                  </motion.p>
                )}
              </motion.div>
            )}
          />
        );

      case 'web-developer':
        return (
          <div className="grid gap-6 md:grid-cols-2">
            <Controller
              name="githubUrl"
              control={control}
              render={({ field }) => (
                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <label htmlFor={`${formId}-github`} className="form-label">
                    <Github size={18} className="inline mr-2" />
                    GitHub Profile *
                  </label>
                  <div className="relative">
                    <input
                      {...field}
                      id={`${formId}-github`}
                      type="url"
                      placeholder="https://github.com/username"
                      className={`form-input pl-12 ${errors.githubUrl ? 'border-[var(--color-accent-red)] ring-red-100' : 'focus:ring-blue-100'}`}
                    />
                    <Github size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--color-text-secondary)]" />
                  </div>
                  {errors.githubUrl && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-[var(--color-accent-red)] flex items-center gap-1"
                    >
                      <AlertCircle size={16} />
                      {errors.githubUrl.message}
                    </motion.p>
                  )}
                </motion.div>
              )}
            />
            <Controller
              name="portfolioUrl"
              control={control}
              render={({ field }) => (
                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <label htmlFor={`${formId}-portfolio`} className="form-label">
                    <Globe size={18} className="inline mr-2" />
                    Portfolio/Website (Optional)
                  </label>
                  <div className="relative">
                    <input
                      {...field}
                      id={`${formId}-portfolio`}
                      type="url"
                      placeholder="https://your-website.com"
                      className={`form-input pl-12 ${errors.portfolioUrl ? 'border-[var(--color-accent-red)] ring-red-100' : 'focus:ring-blue-100'}`}
                    />
                    <Globe size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--color-text-secondary)]" />
                  </div>
                  {errors.portfolioUrl && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-[var(--color-accent-red)] flex items-center gap-1"
                    >
                      <AlertCircle size={16} />
                      {errors.portfolioUrl.message}
                    </motion.p>
                  )}
                </motion.div>
              )}
            />
          </div>
        );

      case 'social-media-executive':
        return (
          <Controller
            name="linkedinUrl"
            control={control}
            render={({ field }) => (
              <motion.div
                className="form-group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <label htmlFor={`${formId}-linkedin`} className="form-label">
                  <Linkedin size={18} className="inline mr-2" />
                  LinkedIn Profile *
                </label>
                <div className="relative">
                  <input
                    {...field}
                    id={`${formId}-linkedin`}
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    className={`form-input pl-12 ${errors.linkedinUrl ? 'border-[var(--color-accent-red)] ring-red-100' : 'focus:ring-blue-100'}`}
                  />
                  <Linkedin size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--color-text-secondary)]" />
                </div>
                <p className="text-sm text-[var(--color-text-tertiary)] flex items-center gap-2">
                  <Star size={14} />
                  Your professional LinkedIn profile
                </p>
                {errors.linkedinUrl && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-[var(--color-accent-red)] flex items-center gap-1"
                  >
                    <AlertCircle size={16} />
                    {errors.linkedinUrl.message}
                  </motion.p>
                )}
              </motion.div>
            )}
          />
        );

      default:
        return (
          <Controller
            name="portfolioUrl"
            control={control}
            render={({ field }) => (
              <motion.div
                className="form-group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <label htmlFor={`${formId}-portfolio`} className="form-label">
                  <LinkIcon size={18} className="inline mr-2" />
                  Portfolio/Website (Optional)
                </label>
                <div className="relative">
                  <input
                    {...field}
                    id={`${formId}-portfolio`}
                    type="url"
                    placeholder="https://your-portfolio.com"
                    className={`form-input pl-12 ${errors.portfolioUrl ? 'border-[var(--color-accent-red)] ring-red-100' : 'focus:ring-purple-100'}`}
                  />
                  <LinkIcon size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--color-text-secondary)]" />
                </div>
                <p className="text-sm text-[var(--color-text-tertiary)] flex items-center gap-2">
                  <Star size={14} />
                  Link to your professional portfolio or website
                </p>
                {errors.portfolioUrl && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-[var(--color-accent-red)] flex items-center gap-1"
                  >
                    <AlertCircle size={16} />
                    {errors.portfolioUrl.message}
                  </motion.p>
                )}
              </motion.div>
            )}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-background)] via-[var(--color-background-alt)] to-[var(--color-surface-variant)] pt-24">
      <div className="container py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            to={`/jobs/${jobId}`}
            className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Job Details
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="card p-8 md:p-12 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-gold)] to-[var(--color-terracotta)]" 
                   style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }} />
            </div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-gold)] rounded-3xl flex items-center justify-center shadow-2xl">
                  <Briefcase size={40} className="text-white" />
                </div>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-gold)] bg-clip-text text-transparent"
                style={{ fontFamily: 'var(--font-family-display)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Apply for {jobTitle}
              </motion.h1>
              
              <motion.h2 
                className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Join Our Creative Team at Shahi Pickle
              </motion.h2>
              
              <motion.p 
                className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Help us craft beautiful experiences for premium handcrafted pickles from Kolkata. 
                Join a passionate team that values creativity, tradition, and innovation.
              </motion.p>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap justify-center gap-6 text-sm"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full backdrop-blur-sm">
                  <Shield size={16} className="text-[var(--color-accent-green)]" />
                  <span>Secure Application</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full backdrop-blur-sm">
                  <Award size={16} className="text-[var(--color-gold)]" />
                  <span>Equal Opportunity</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full backdrop-blur-sm">
                  <Heart size={16} className="text-[var(--color-accent-red)]" />
                  <span>Inclusive Culture</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="card p-6 md:p-10">
            {/* Form Header */}
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-gold)] rounded-2xl flex items-center justify-center">
                  <FileText size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">Application Form</h2>
                  <p className="text-[var(--color-text-secondary)]">Complete your application for {jobTitle}</p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-[var(--color-text-secondary)]">Application Progress</span>
                  <span className="text-sm font-bold text-[var(--color-primary)]">{getFieldProgress()}% Complete</span>
                </div>
                <div className="progress-bar h-3">
                  <motion.div
                    className="progress-fill h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${getFieldProgress()}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-xs text-[var(--color-text-tertiary)] mt-2">
                  Fill in all required fields to submit your application
                </p>
              </div>
            </div>

            <Suspense fallback={<FormSkeleton />}>
              <form onSubmit={handleSubmit(onSubmit)} id={formId} className="space-y-10">
                {/* Personal Information Section */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-3 pb-6 border-b border-[var(--color-border)]">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <User className="text-white" size={20} />
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--color-text)]">Personal Information</h3>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <Controller
                      name="fullName"
                      control={control}
                      render={({ field }) => (
                        <motion.div
                          className="form-group"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <label htmlFor={`${formId}-fullName`} className="form-label">
                            <User size={18} className="inline mr-2" />
                            Full Name *
                          </label>
                          <div className="relative">
                            <input
                              {...field}
                              id={`${formId}-fullName`}
                              type="text"
                              placeholder="Enter your full name"
                              className={`form-input pl-12 ${errors.fullName ? 'border-[var(--color-accent-red)] ring-red-100' : 'focus:ring-blue-100'}`}
                            />
                            <User size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--color-text-secondary)]" />
                          </div>
                          {errors.fullName && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-sm text-[var(--color-accent-red)] flex items-center gap-1"
                            >
                              <AlertCircle size={16} />
                              {errors.fullName.message}
                            </motion.p>
                          )}
                        </motion.div>
                      )}
                    />

                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <motion.div
                          className="form-group"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <label htmlFor={`${formId}-email`} className="form-label">
                            <Mail size={18} className="inline mr-2" />
                            Email Address *
                          </label>
                          <div className="relative">
                            <input
                              {...field}
                              id={`${formId}-email`}
                              type="email"
                              placeholder="your.email@example.com"
                              className={`form-input pl-12 ${errors.email ? 'border-[var(--color-accent-red)] ring-red-100' : 'focus:ring-blue-100'}`}
                            />
                            <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--color-text-secondary)]" />
                          </div>
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-sm text-[var(--color-accent-red)] flex items-center gap-1"
                            >
                              <AlertCircle size={16} />
                              {errors.email.message}
                            </motion.p>
                          )}
                        </motion.div>
                      )}
                    />

                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <motion.div
                          className="form-group md:col-span-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          <label htmlFor={`${formId}-phone`} className="form-label">
                            <Phone size={18} className="inline mr-2" />
                            Phone Number *
                          </label>
                          <div className="relative max-w-md">
                            <input
                              {...field}
                              id={`${formId}-phone`}
                              type="tel"
                              placeholder="+91 98765 43210"
                              className={`form-input pl-12 ${errors.phone ? 'border-[var(--color-accent-red)] ring-red-100' : 'focus:ring-blue-100'}`}
                            />
                            <Phone size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--color-text-secondary)]" />
                          </div>
                          {errors.phone && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-sm text-[var(--color-accent-red)] flex items-center gap-1"
                            >
                              <AlertCircle size={16} />
                              {errors.phone.message}
                            </motion.p>
                          )}
                        </motion.div>
                      )}
                    />
                  </div>

                  {getJobSpecificFields()}
                </motion.section>

                {/* Professional Information Section */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-3 pb-6 border-b border-[var(--color-border)]">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                      <Briefcase className="text-white" size={20} />
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--color-text)]">Professional Information</h3>
                  </div>

                  <Controller
                    name="experience"
                    control={control}
                    render={({ field }) => (
                      <div className="form-group">
                        <label className="form-label mb-6 text-lg">Years of Experience *</label>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                          {experienceOptions.map((option, index) => (
                            <motion.label
                              key={option.value}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className={`
                                relative cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 group hover:scale-105
                                ${field.value === option.value 
                                  ? 'border-[var(--color-primary)] bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-gold)]/10 shadow-lg' 
                                  : 'border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-variant)]'
                                }
                              `}
                            >
                              <input
                                type="radio"
                                {...field}
                                value={option.value}
                                checked={field.value === option.value}
                                className="sr-only"
                              />
                              <div className="text-center">
                                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                  {option.icon}
                                </div>
                                <div className="font-semibold text-[var(--color-text)] mb-2">{option.label}</div>
                                <div className="text-sm text-[var(--color-text-secondary)]">{option.description}</div>
                              </div>
                              {field.value === option.value && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute top-3 right-3"
                                >
                                  <CheckCircle size={24} className="text-[var(--color-primary)]" />
                                </motion.div>
                              )}
                            </motion.label>
                          ))}
                        </div>
                        {errors.experience && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-[var(--color-accent-red)] flex items-center gap-1 mt-4"
                          >
                            <AlertCircle size={16} />
                            {errors.experience.message}
                          </motion.p>
                        )}
                      </div>
                    )}
                  />
                </motion.section>

                {/* Cover Letter Section */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 pb-6 border-b border-[var(--color-border)]">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <FileText className="text-white" size={20} />
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--color-text)]">Tell Us About Yourself</h3>
                  </div>

                  <Controller
                    name="coverLetter"
                    control={control}
                    render={({ field }) => (
                      <div className="form-group">
                        <label htmlFor={`${formId}-cover`} className="form-label text-lg">
                          Cover Letter (Optional)
                        </label>
                        <textarea
                          {...field}
                          id={`${formId}-cover`}
                          rows={8}
                          placeholder={`Tell us why you're excited to join Shahi Pickle as a ${jobTitle} and what makes you the perfect fit for this role...

Share your passion for:
• Our brand and products
• Your relevant experience
• What you can bring to our team
• Your career aspirations`}
                          className={`form-input resize-none ${errors.coverLetter ? 'border-[var(--color-accent-red)] ring-red-100' : 'focus:ring-purple-100'}`}
                          maxLength={1000}
                        />
                        <div className="flex justify-between items-center text-sm mt-2">
                          <p className="text-[var(--color-text-tertiary)] flex items-center gap-2">
                            <Heart size={14} />
                            Share your passion and why you want to work with us
                          </p>
                          <span className={`font-medium ${(field.value?.length || 0) > 900 ? 'text-[var(--color-accent-red)]' : 'text-[var(--color-text-tertiary)]'}`}>
                            {field.value?.length || 0}/1000
                          </span>
                        </div>
                        {errors.coverLetter && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-[var(--color-accent-red)] flex items-center gap-1"
                          >
                            <AlertCircle size={16} />
                            {errors.coverLetter.message}
                          </motion.p>
                        )}
                      </div>
                    )}
                  />
                </motion.section>

                {/* Resume Upload Section */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 pb-6 border-b border-[var(--color-border)]">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                      <FileText className="text-white" size={20} />
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--color-text)]">Resume Upload</h3>
                  </div>
                  
                  <Controller
                    name="resume"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <FileUpload
                        onFileChange={onChange}
                        error={errors.resume?.message}
                      />
                    )}
                  />
                </motion.section>

                {/* Terms and Conditions */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="space-y-6"
                >
                  <Controller
                    name="termsAccepted"
                    control={control}
                    render={({ field }) => (
                      <div className={`p-6 rounded-2xl border-2 transition-all duration-300 ${errors.termsAccepted ? 'border-[var(--color-accent-red)] bg-red-50' : 'border-[var(--color-border)] bg-[var(--color-surface-variant)]'}`}>
                        <label className="flex items-start gap-4 cursor-pointer group">
                          <div className="relative">
                            <input
                              type="checkbox"
                              {...field}
                              checked={field.value}
                              className="w-6 h-6 text-[var(--color-primary)] border-2 border-[var(--color-border)] rounded-lg focus:ring-[var(--color-primary)] focus:ring-2 transition-all duration-200"
                            />
                            {field.value && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                <CheckCircle size={24} className="text-[var(--color-primary)]" />
                              </motion.div>
                            )}
                          </div>
                          <div className="text-sm">
                            <p className="text-[var(--color-text)] font-medium mb-2">
                              I agree to the{' '}
                              <button type="button" className="text-[var(--color-primary)] underline hover:no-underline font-semibold">
                                terms and conditions
                              </button>{' '}
                              and consent to the processing of my personal data for recruitment purposes.
                            </p>
                            <div className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                              <Shield size={16} className="text-[var(--color-accent-green)] mt-0.5 flex-shrink-0" />
                              <p>
                                Your information will be used solely for evaluating your application and will be handled 
                                in accordance with our privacy policy. We respect your privacy and maintain strict confidentiality.
                              </p>
                            </div>
                          </div>
                        </label>
                        {errors.termsAccepted && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-[var(--color-accent-red)] flex items-center gap-1 mt-3"
                          >
                            <AlertCircle size={16} />
                            {errors.termsAccepted.message}
                          </motion.p>
                        )}
                      </div>
                    )}
                  />
                </motion.section>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="pt-8"
                >
                  <button
                    type="submit"
                    disabled={!isValid || isSubmitting || isPending}
                    className={`
                      btn btn-primary w-full text-lg py-6 text-xl font-semibold shadow-2xl
                      ${(!isValid || isSubmitting || isPending) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
                      transition-all duration-300
                    `}
                  >
                    {isSubmitting || isPending ? (
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                        />
                        Submitting Application...
                      </div>
                    ) : (
                      <>
                        <Send size={24} />
                        Submit Application
                      </>
                    )}
                  </button>
                  
                  <p className="text-center text-sm text-[var(--color-text-tertiary)] mt-4">
                    By submitting this application, you acknowledge that all information provided is accurate and complete.
                  </p>
                </motion.div>
              </form>
            </Suspense>
          </div>
        </motion.div>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="bg-gradient-to-r from-[var(--color-accent-green)] to-green-600 text-white p-6 rounded-2xl shadow-2xl max-w-sm">
              <div className="flex items-center gap-3">
                <CheckCircle size={28} />
                <div>
                  <h4 className="font-bold text-lg">Application Submitted!</h4>
                  <p className="text-sm opacity-90">We'll get back to you within 48 hours.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Notification */}
      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="bg-gradient-to-r from-[var(--color-accent-red)] to-red-600 text-white p-6 rounded-2xl shadow-2xl max-w-sm">
              <div className="flex items-center gap-3">
                <AlertCircle size={28} />
                <div>
                  <h4 className="font-bold text-lg">Submission Failed</h4>
                  <p className="text-sm opacity-90">Please check your connection and try again.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};