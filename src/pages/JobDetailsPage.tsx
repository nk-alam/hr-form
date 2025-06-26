import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Briefcase, 
  Users, 
  CheckCircle, 
  Star,
  ArrowRight,
  Palette,
  Code,
  Share2,
  Truck
} from 'lucide-react';

// Job data (in a real app, this would come from an API)
const jobsData = {
  'graphic-designer': {
    title: 'Graphic Designer',
    department: 'Creative',
    type: 'Full-time',
    location: 'Kolkata / Remote',
    experience: '1-5 years',
    salary: '₹3-8 LPA',
    icon: Palette,
    color: 'from-purple-500 to-pink-500',
    overview: 'Join our creative team to design stunning visual experiences for Shahi Pickle, a premium handcrafted pickle brand from Kolkata. You\'ll be responsible for creating compelling designs across packaging, digital marketing, and brand communications.',
    responsibilities: [
      'Design packaging for premium pickle products',
      'Create digital marketing materials for social media and website',
      'Develop brand guidelines and visual identity elements',
      'Collaborate with marketing team on campaign visuals',
      'Design print materials including brochures, flyers, and advertisements',
      'Maintain brand consistency across all touchpoints',
      'Work on product photography and image editing',
      'Create illustrations and custom graphics as needed'
    ],
    requirements: [
      'Bachelor\'s degree in Graphic Design, Visual Arts, or related field',
      'Proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign)',
      'Strong portfolio showcasing brand design and packaging work',
      'Understanding of print production and digital design principles',
      'Knowledge of typography, color theory, and composition',
      'Experience with food/FMCG brand design preferred',
      'Creative thinking and attention to detail',
      'Ability to work in a fast-paced environment'
    ],
    benefits: [
      'Competitive salary with performance bonuses',
      'Creative freedom and ownership of projects',
      'Work with a premium, growing brand',
      'Flexible working hours and remote work options',
      'Health insurance and medical benefits',
      'Professional development opportunities',
      'Team outings and cultural events',
      'Free pickle samples (of course!)'
    ],
    culture: 'At Shahi Pickle, we blend traditional Bengali culinary heritage with modern design sensibilities. Our creative team values innovation, authenticity, and attention to detail. You\'ll work in a collaborative environment where your creative input is valued and your designs directly impact our brand\'s growth.'
  },
  'web-developer': {
    title: 'Web Developer',
    department: 'Technology',
    type: 'Full-time',
    location: 'Kolkata / Remote',
    experience: '2-6 years',
    salary: '₹5-12 LPA',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    overview: 'Build and maintain our digital presence as we scale our e-commerce operations. You\'ll work with modern technologies to create seamless user experiences for our customers.',
    responsibilities: [
      'Develop and maintain e-commerce website using React/Next.js',
      'Build responsive web applications with excellent UX',
      'Integrate payment gateways and shipping APIs',
      'Implement SEO best practices and performance optimization',
      'Develop admin dashboards for inventory and order management',
      'Create and maintain RESTful APIs using Node.js',
      'Work with databases (MongoDB/PostgreSQL) for data management',
      'Implement security best practices and data protection'
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      'Strong proficiency in React, Node.js, and TypeScript',
      'Experience with e-commerce platforms and payment integration',
      'Knowledge of database design and optimization',
      'Familiarity with cloud platforms (AWS/GCP)',
      'Understanding of web security and performance optimization',
      'Experience with version control (Git) and CI/CD',
      'Problem-solving skills and attention to detail'
    ],
    benefits: [
      'Competitive salary with equity options',
      'Work with latest technology stack',
      'Remote work flexibility',
      'Learning and development budget (₹50,000/year)',
      'Health insurance and wellness programs',
      'Performance-based bonuses',
      'Conference and training opportunities',
      'Collaborative and innovative work environment'
    ],
    culture: 'Our tech team is passionate about building scalable solutions that help preserve and promote Bengali culinary traditions. We value clean code, innovative thinking, and continuous learning. You\'ll have the opportunity to work on challenging problems while making a real impact on our business growth.'
  },
  'social-media-executive': {
    title: 'Social Media Executive',
    department: 'Marketing',
    type: 'Full-time',
    location: 'Kolkata',
    experience: '1-3 years',
    salary: '₹2.5-5 LPA',
    icon: Share2,
    color: 'from-green-500 to-teal-500',
    overview: 'Lead our social media strategy and create engaging content that tells the story of our authentic Bengali pickles. You\'ll build our online community and drive brand awareness.',
    responsibilities: [
      'Develop and execute social media strategy across platforms',
      'Create engaging content including posts, stories, and videos',
      'Manage Instagram, Facebook, Twitter, and YouTube channels',
      'Plan and execute social media campaigns and contests',
      'Engage with followers and build online community',
      'Collaborate with influencers and food bloggers',
      'Monitor social media analytics and optimize performance',
      'Coordinate with design team for visual content creation'
    ],
    requirements: [
      'Bachelor\'s degree in Marketing, Communications, or related field',
      'Proven experience in social media management',
      'Strong content creation and copywriting skills',
      'Knowledge of social media analytics tools',
      'Understanding of food industry and Bengali culture',
      'Creative thinking and trend awareness',
      'Excellent communication and interpersonal skills',
      'Basic photography and video editing skills'
    ],
    benefits: [
      'Competitive salary with performance incentives',
      'Creative content creation opportunities',
      'Brand building experience with growing company',
      'Access to latest social media tools and platforms',
      'Health insurance and medical benefits',
      'Team outings and food events',
      'Professional development in digital marketing',
      'Flexible working hours'
    ],
    culture: 'Our marketing team is passionate about storytelling and building authentic connections with our audience. We celebrate creativity, cultural heritage, and community building. You\'ll work in a dynamic environment where your ideas can directly impact our brand\'s social presence.'
  },
  'quality-analyst': {
    title: 'Quality Analyst',
    department: 'Operations',
    type: 'Full-time',
    location: 'Kolkata',
    experience: '2-5 years',
    salary: '₹3-7 LPA',
    icon: CheckCircle,
    color: 'from-orange-500 to-red-500',
    overview: 'Ensure our pickles meet the highest quality standards through rigorous testing and process improvement. You\'ll be responsible for maintaining the authentic taste and quality that our customers love.',
    responsibilities: [
      'Conduct quality control tests on raw materials and finished products',
      'Develop and implement quality assurance procedures',
      'Monitor production processes and identify improvement opportunities',
      'Ensure compliance with food safety standards and regulations',
      'Maintain quality documentation and records',
      'Train production staff on quality procedures',
      'Investigate quality issues and implement corrective actions',
      'Coordinate with suppliers for raw material quality'
    ],
    requirements: [
      'Bachelor\'s degree in Food Technology, Chemistry, or related field',
      'Experience in food quality control and assurance',
      'Knowledge of FSSAI, HACCP, and other food safety standards',
      'Strong analytical and problem-solving skills',
      'Attention to detail and accuracy in testing',
      'Understanding of food preservation and processing',
      'Good communication and documentation skills',
      'Ability to work in production environment'
    ],
    benefits: [
      'Competitive salary with annual increments',
      'Work with premium, authentic food products',
      'Process improvement and innovation opportunities',
      'Professional development in food technology',
      'Health insurance and safety training',
      'Performance-based bonuses',
      'Collaborative work environment',
      'Career growth opportunities'
    ],
    culture: 'Our operations team takes pride in maintaining the authentic taste and quality of traditional Bengali pickles. We value precision, continuous improvement, and food safety. You\'ll work with passionate professionals who care deeply about delivering the best products to our customers.'
  },
  'supply-chain-coordinator': {
    title: 'Supply Chain Coordinator',
    department: 'Operations',
    type: 'Full-time',
    location: 'Kolkata',
    experience: '2-4 years',
    salary: '₹4-8 LPA',
    icon: Truck,
    color: 'from-indigo-500 to-purple-500',
    overview: 'Manage our supply chain operations from sourcing premium ingredients to ensuring timely delivery of our products. You\'ll work with suppliers across India to maintain our quality standards while optimizing costs and efficiency.',
    responsibilities: [
      'Source and procure premium ingredients from trusted suppliers',
      'Manage inventory levels and optimize stock turnover',
      'Coordinate with logistics partners for timely deliveries',
      'Monitor supplier performance and maintain quality standards',
      'Negotiate contracts and pricing with vendors',
      'Implement supply chain optimization strategies',
      'Track and analyze supply chain metrics and KPIs',
      'Ensure compliance with food safety and regulatory requirements',
      'Manage relationships with packaging and raw material suppliers',
      'Coordinate with production team for demand planning'
    ],
    requirements: [
      'Bachelor\'s degree in Supply Chain Management, Logistics, or related field',
      'Experience in supply chain operations, preferably in food industry',
      'Knowledge of inventory management and demand planning',
      'Understanding of food safety regulations and compliance',
      'Proficiency in ERP systems and supply chain software',
      'Strong analytical and problem-solving skills',
      'Excellent communication and negotiation abilities',
      'Experience with vendor management and procurement',
      'Knowledge of logistics and transportation management',
      'Ability to work in fast-paced environment'
    ],
    benefits: [
      'Competitive salary with performance-based incentives',
      'Travel opportunities across India for supplier visits',
      'Work with premium ingredient suppliers and vendors',
      'Process optimization and efficiency improvement projects',
      'Professional development in supply chain management',
      'Health insurance and comprehensive benefits package',
      'Flexible working arrangements',
      'Career advancement opportunities in operations',
      'Exposure to end-to-end supply chain operations',
      'Team building events and company outings'
    ],
    culture: 'Our supply chain team is the backbone of our operations, ensuring that we source the finest ingredients while maintaining cost efficiency. We value strategic thinking, relationship building, and operational excellence. You\'ll work with a dedicated team that takes pride in delivering quality products to our customers across India.'
  }
};

export const JobDetailsPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  
  if (!jobId || !jobsData[jobId as keyof typeof jobsData]) {
    return <Navigate to="/" replace />;
  }

  const job = jobsData[jobId as keyof typeof jobsData];
  const Icon = job.icon;

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
            to="/"
            className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Jobs
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="card p-8 md:p-10"
            >
              <div className="flex items-start gap-6 mb-8">
                <motion.div 
                  className={`w-20 h-20 bg-gradient-to-br ${job.color} rounded-3xl flex items-center justify-center flex-shrink-0 shadow-2xl`}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon size={40} className="text-white" />
                </motion.div>
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-3">{job.title}</h1>
                  <p className="text-lg text-[var(--color-text-secondary)] mb-6">{job.department} Department</p>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-[var(--color-text-secondary)] bg-[var(--color-surface-variant)] px-4 py-2 rounded-full">
                      <Briefcase size={18} />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-2 text-[var(--color-text-secondary)] bg-[var(--color-surface-variant)] px-4 py-2 rounded-full">
                      <MapPin size={18} />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-[var(--color-text-secondary)] bg-[var(--color-surface-variant)] px-4 py-2 rounded-full">
                      <Clock size={18} />
                      {job.experience}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 border-t border-[var(--color-border)] gap-6">
                <div>
                  <span className="text-3xl font-bold text-[var(--color-primary)]">{job.salary}</span>
                  <span className="text-[var(--color-text-secondary)] ml-2 text-lg">per annum</span>
                </div>
                <Link
                  to={`/jobs/${jobId}/apply`}
                  className="btn btn-primary text-lg px-8 py-4 w-full sm:w-auto"
                >
                  Apply Now
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>

            {/* Job Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card p-8"
            >
              <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">Job Overview</h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg">{job.overview}</p>
            </motion.div>

            {/* Responsibilities */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card p-8"
            >
              <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">Key Responsibilities</h2>
              <ul className="space-y-4">
                {job.responsibilities.map((responsibility, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <CheckCircle size={20} className="text-[var(--color-accent-green)] flex-shrink-0 mt-1" />
                    <span className="text-[var(--color-text-secondary)] leading-relaxed">{responsibility}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card p-8"
            >
              <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">Requirements</h2>
              <ul className="space-y-4">
                {job.requirements.map((requirement, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Star size={20} className="text-[var(--color-primary)] flex-shrink-0 mt-1" />
                    <span className="text-[var(--color-text-secondary)] leading-relaxed">{requirement}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Culture */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card p-8"
            >
              <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">Our Culture</h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg">{job.culture}</p>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="card p-6"
            >
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-6">Benefits & Perks</h3>
              <ul className="space-y-3">
                {job.benefits.map((benefit, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                  >
                    <CheckCircle size={16} className="text-[var(--color-accent-green)] flex-shrink-0 mt-1" />
                    <span className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Apply CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="card p-6 text-center bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-gold)]/5"
            >
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">Ready to Apply?</h3>
              <p className="text-[var(--color-text-secondary)] mb-6 text-sm leading-relaxed">
                Join our team and be part of preserving Bengali culinary heritage while building a modern food brand.
              </p>
              <Link
                to={`/jobs/${jobId}/apply`}
                className="btn btn-primary w-full mb-4"
              >
                Apply for this Position
                <ArrowRight size={18} />
              </Link>
              <p className="text-xs text-[var(--color-text-tertiary)]">
                Application takes 5-10 minutes to complete
              </p>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="card p-6"
            >
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-4">Have Questions?</h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-4 leading-relaxed">
                Feel free to reach out to our HR team for any queries about this position or our company culture.
              </p>
              <a
                href="mailto:hr@shahipickle.com"
                className="text-[var(--color-primary)] hover:underline text-sm font-medium flex items-center gap-2"
              >
                <Users size={16} />
                hr@shahipickle.com
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};