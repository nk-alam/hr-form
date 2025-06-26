import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  ArrowRight,
  Palette,
  Code,
  Share2,
  CheckCircle,
  TrendingUp,
  Package,
  Truck
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  department: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  location: string;
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  featured?: boolean;
}

const jobs: Job[] = [
  {
    id: 'graphic-designer',
    title: 'Graphic Designer',
    department: 'Creative',
    type: 'Full-time',
    location: 'Kolkata / Remote',
    experience: '1-5 years',
    salary: '₹3-8 LPA',
    description: 'Create stunning visual designs for our premium pickle brand, from packaging to digital marketing materials.',
    requirements: [
      'Proficiency in Adobe Creative Suite',
      'Strong portfolio showcasing brand design',
      'Understanding of print and digital design',
      'Creative thinking and attention to detail'
    ],
    benefits: [
      'Creative freedom and ownership',
      'Work with premium brand',
      'Flexible working hours',
      'Health insurance'
    ],
    icon: Palette,
    color: 'from-purple-500 to-pink-500',
    featured: true,
  },
  {
    id: 'web-developer',
    title: 'Web Developer',
    department: 'Technology',
    type: 'Full-time',
    location: 'Kolkata / Remote',
    experience: '2-6 years',
    salary: '₹5-12 LPA',
    description: 'Build and maintain our e-commerce platform and digital presence using modern web technologies.',
    requirements: [
      'React, Node.js, TypeScript expertise',
      'Experience with e-commerce platforms',
      'Database design and optimization',
      'API development and integration'
    ],
    benefits: [
      'Latest technology stack',
      'Remote work flexibility',
      'Learning and development budget',
      'Performance bonuses'
    ],
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'social-media-executive',
    title: 'Social Media Executive',
    department: 'Marketing',
    type: 'Full-time',
    location: 'Kolkata',
    experience: '1-3 years',
    salary: '₹2.5-5 LPA',
    description: 'Manage our social media presence and create engaging content that tells our brand story.',
    requirements: [
      'Social media platform expertise',
      'Content creation and copywriting',
      'Analytics and reporting skills',
      'Understanding of food industry trends'
    ],
    benefits: [
      'Creative content creation',
      'Brand building experience',
      'Social media tools access',
      'Team outings and events'
    ],
    icon: Share2,
    color: 'from-green-500 to-teal-500',
  },
  {
    id: 'quality-analyst',
    title: 'Quality Analyst',
    department: 'Operations',
    type: 'Full-time',
    location: 'Kolkata',
    experience: '2-5 years',
    salary: '₹3-7 LPA',
    description: 'Ensure our pickles meet the highest quality standards through rigorous testing and process improvement.',
    requirements: [
      'Food technology or related degree',
      'Quality control experience',
      'Knowledge of food safety standards',
      'Analytical and problem-solving skills'
    ],
    benefits: [
      'Work with premium products',
      'Process improvement opportunities',
      'Professional development',
      'Health and safety training'
    ],
    icon: CheckCircle,
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'supply-chain-coordinator',
    title: 'Supply Chain Coordinator',
    department: 'Operations',
    type: 'Full-time',
    location: 'Kolkata',
    experience: '2-4 years',
    salary: '₹4-8 LPA',
    description: 'Manage our supply chain operations, from sourcing premium ingredients to ensuring timely delivery of our products.',
    requirements: [
      'Supply chain or logistics background',
      'Experience with inventory management',
      'Knowledge of food industry regulations',
      'Strong analytical and communication skills',
      'Proficiency in ERP systems',
      'Understanding of vendor management'
    ],
    benefits: [
      'Work with premium ingredient suppliers',
      'Process optimization opportunities',
      'Travel opportunities across India',
      'Performance-based incentives',
      'Professional development in logistics',
      'Health insurance and benefits'
    ],
    icon: Truck,
    color: 'from-indigo-500 to-purple-500',
    featured: true,
  },
];

export const JobsPage: React.FC = () => {
  const featuredJobs = jobs.filter(job => job.featured);
  const regularJobs = jobs.filter(job => !job.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-background)] via-[var(--color-background-alt)] to-[var(--color-surface-variant)] pt-24">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="mb-8">
              <motion.div 
                className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-gold)] rounded-3xl flex items-center justify-center shadow-2xl"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Briefcase size={40} className="text-white" />
              </motion.div>
            </div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-gold)] bg-clip-text text-transparent"
              style={{ fontFamily: 'var(--font-family-display)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Join Our Flavorful Journey
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Be part of preserving Bengali culinary traditions while building a modern, innovative food brand
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border shadow-lg hover:shadow-xl transition-all duration-300">
                <Users size={20} className="text-[var(--color-primary)]" />
                <span className="font-medium">Growing Team</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border shadow-lg hover:shadow-xl transition-all duration-300">
                <Star size={20} className="text-[var(--color-primary)]" />
                <span className="font-medium">Premium Brand</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border shadow-lg hover:shadow-xl transition-all duration-300">
                <TrendingUp size={20} className="text-[var(--color-primary)]" />
                <span className="font-medium">Fast Growing</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Jobs */}
      {featuredJobs.length > 0 && (
        <section className="py-12">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">Featured Opportunities</h2>
              <p className="text-[var(--color-text-secondary)]">High-priority positions we're actively hiring for</p>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-2">
              {featuredJobs.map((job, index) => (
                <JobCard key={job.id} job={job} index={index} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Jobs */}
      <section className="py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">Open Positions</h2>
            <p className="text-[var(--color-text-secondary)]">Explore all available opportunities to join our team</p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {regularJobs.map((job, index) => (
              <JobCard key={job.id} job={job} index={index + featuredJobs.length} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-gold)]/5" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-4">
                Don't see the perfect role?
              </h3>
              <p className="text-[var(--color-text-secondary)] mb-6 max-w-2xl mx-auto text-lg">
                We're always looking for talented individuals who share our passion for quality and innovation. 
                Send us your resume and let's explore possibilities together.
              </p>
              <a
                href="mailto:hr@shahipickle.com"
                className="btn btn-primary text-lg px-8 py-4"
              >
                Send Your Resume
                <ArrowRight size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

interface JobCardProps {
  job: Job;
  index: number;
  featured?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, index, featured = false }) => {
  const Icon = job.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`card p-6 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group ${
        featured ? 'ring-2 ring-[var(--color-primary)] ring-opacity-20 shadow-xl' : ''
      }`}
    >
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-gold)] text-white text-xs font-semibold rounded-full shadow-lg">
            Featured
          </span>
        </div>
      )}

      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[var(--color-primary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-4">
          <motion.div 
            className={`w-14 h-14 bg-gradient-to-br ${job.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Icon size={28} className="text-white" />
          </motion.div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-1 group-hover:text-[var(--color-primary)] transition-colors">
              {job.title}
            </h3>
            <p className="text-[var(--color-text-secondary)] text-sm font-medium">{job.department}</p>
          </div>
        </div>

        <p className="text-[var(--color-text-secondary)] mb-6 line-clamp-2 leading-relaxed">{job.description}</p>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)] bg-[var(--color-surface-variant)] px-3 py-1 rounded-full">
            <Briefcase size={14} />
            {job.type}
          </div>
          <div className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)] bg-[var(--color-surface-variant)] px-3 py-1 rounded-full">
            <MapPin size={14} />
            {job.location}
          </div>
          <div className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)] bg-[var(--color-surface-variant)] px-3 py-1 rounded-full">
            <Clock size={14} />
            {job.experience}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-[var(--color-primary)]">{job.salary}</span>
            <span className="text-sm text-[var(--color-text-secondary)] ml-1">per annum</span>
          </div>
          <Link
            to={`/jobs/${job.id}`}
            className="btn btn-primary group-hover:scale-105 transition-transform duration-200"
          >
            View Details
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};