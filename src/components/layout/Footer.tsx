import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin,
  Heart,
  Award,
  Users,
  Globe,
  ArrowUp
} from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-400', bgColor: 'hover:bg-pink-500/20' },
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-400', bgColor: 'hover:bg-blue-500/20' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-sky-400', bgColor: 'hover:bg-sky-500/20' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-600', bgColor: 'hover:bg-blue-600/20' },
  ];

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Products', href: '/products' },
    { name: 'Careers', href: '/' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
    { name: 'Recipes', href: '/recipes' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Refund Policy', href: '/refund' },
  ];

  const stats = [
    { icon: Users, label: 'Happy Customers', value: '50K+' },
    { icon: Award, label: 'Years of Excellence', value: '25+' },
    { icon: Globe, label: 'Cities Served', value: '100+' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-dark)] to-[var(--color-gold)] text-white overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10" />
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container relative">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-12 border-b border-white/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                    <Icon size={28} className="text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-[var(--color-gold-light)] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dark)] rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-2xl">♔</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl tracking-wide">SHAHI PICKLE</h3>
                  <p className="text-white/80 text-sm font-medium tracking-wider">Premium Handcrafted Pickles</p>
                </div>
              </div>
              
              <p className="text-white/90 leading-relaxed max-w-md">
                Preserving the authentic taste of Bengali culinary traditions for over 25 years. 
                Our handcrafted pickles are made with the finest ingredients and time-honored recipes, 
                bringing the royal flavors of Bengal to your table.
              </p>

              <div className="flex items-center gap-2 text-white/80">
                <Heart size={16} className="text-red-400" />
                <span className="text-sm">Made with love in Kolkata, India</span>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h4 className="font-semibold text-xl mb-6 relative">
                Quick Links
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[var(--color-gold)] to-transparent" />
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-white/80 hover:text-white transition-all duration-200 text-sm flex items-center gap-2 group"
                    >
                      <div className="w-1 h-1 bg-[var(--color-gold)] rounded-full group-hover:w-2 transition-all duration-200" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h4 className="font-semibold text-xl mb-6 relative">
                Get in Touch
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[var(--color-gold)] to-transparent" />
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3 group">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors duration-200">
                    <MapPin size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white/90 text-sm leading-relaxed">
                      123 Park Street, Kolkata<br />
                      West Bengal 700016, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors duration-200">
                    <Phone size={18} className="text-white" />
                  </div>
                  <a href="tel:+919876543210" className="text-white/90 text-sm hover:text-white transition-colors">
                    +91 98765 43210
                  </a>
                </div>
                
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors duration-200">
                    <Mail size={18} className="text-white" />
                  </div>
                  <a href="mailto:hr@shahipickle.com" className="text-white/90 text-sm hover:text-white transition-colors">
                    hr@shahipickle.com
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-4">
                <h5 className="font-medium text-white mb-4">Follow Our Journey</h5>
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${social.bgColor} ${social.color}`}
                        aria-label={social.name}
                      >
                        <Icon size={20} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-white/20 py-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
              <p className="text-white/80">
                © {currentYear} Shahi Pickle. All rights reserved.
              </p>
              <div className="flex items-center gap-1 text-white/60">
                <span>Crafted with</span>
                <Heart size={14} className="text-red-400 mx-1" />
                <span>in Kolkata</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              {legalLinks.map((link, index) => (
                <React.Fragment key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-white/80 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className="text-white/40">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-gold)] rounded-full flex items-center justify-center shadow-2xl text-white hover:shadow-3xl transition-all duration-300 z-40"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
};