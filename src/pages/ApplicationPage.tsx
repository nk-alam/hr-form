import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { JobApplicationForm } from '../components/JobApplicationForm';

// Job titles mapping
const jobTitles = {
  'graphic-designer': 'Graphic Designer',
  'web-developer': 'Web Developer',
  'social-media-executive': 'Social Media Executive',
  'quality-analyst': 'Quality Analyst',
};

export const ApplicationPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  
  if (!jobId || !jobTitles[jobId as keyof typeof jobTitles]) {
    return <Navigate to="/" replace />;
  }

  const jobTitle = jobTitles[jobId as keyof typeof jobTitles];

  return <JobApplicationForm jobId={jobId} jobTitle={jobTitle} />;
};