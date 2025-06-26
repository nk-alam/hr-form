import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Briefcase, Home, Phone, Mail, Sun, Moon, Globe, ChevronDown } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Jobs', href: '/', icon: Briefcase },
    { name: 'About', href: '/about', icon: Home },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  ];

  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === '/') return 'Home';
    if (path.includes('/jobs/') && path.includes('/apply')) return 'Apply';
    if (path.includes('/jobs/')) return 'Job Details';
    return path.replace('/', '').replace('-', ' ').toUpperCase();
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-2xl'
          : 'bg-gradient-to-r from-[var(--color-primary)]/95 via-[var(--color-primary-dark)]/95 to-[var(--color-gold)]/95 backdrop-blur-md'
      }`}
      style={{
        background: isScrolled 
          ? undefined 
          : 'linear-gradient(135deg, rgba(139, 69, 19, 0.95) 0%, rgba(101, 67, 33, 0.95) 50%, rgba(212, 160, 23, 0.95) 100%)'
      }}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5 pointer-events-none" />
      
      <div className="container relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-4 group relative">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              {/* Crown with glow effect */}
              <div className="w-14 h-14 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dark)] rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                <div className="relative w-14 h-14 bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dark)] rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-2xl">♔</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-2xl"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </div>
              </div>
            </motion.div>
            
            <div className="flex flex-col">
              <motion.h1 
                className={`font-display font-bold text-2xl tracking-wide transition-colors duration-300 ${
                  isScrolled ? 'text-[var(--color-primary)]' : 'text-white'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                SHAHI PICKLE
              </motion.h1>
              <motion.p 
                className={`text-sm font-medium tracking-wider transition-colors duration-300 ${
                  isScrolled ? 'text-[var(--color-text-secondary)]' : 'text-white/80'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Premium Handcrafted Pickles
              </motion.p>
            </div>
          </Link>

          {/* Breadcrumb - Desktop Only */}
          <div className="hidden lg:flex items-center gap-2 text-sm">
            <span className={`transition-colors duration-300 ${
              isScrolled ? 'text-[var(--color-text-tertiary)]' : 'text-white/60'
            }`}>
              Careers
            </span>
            <span className={`transition-colors duration-300 ${
              isScrolled ? 'text-[var(--color-text-tertiary)]' : 'text-white/40'
            }`}>
              /
            </span>
            <span className={`font-medium transition-colors duration-300 ${
              isScrolled ? 'text-[var(--color-primary)]' : 'text-white'
            }`}>
              {getBreadcrumb()}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? isScrolled
                        ? 'bg-[var(--color-primary)] text-white shadow-lg'
                        : 'bg-white/20 text-white backdrop-blur-sm'
                      : isScrolled
                      ? 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-variant)]'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-gold)] rounded-xl -z-10"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-3 rounded-xl transition-all duration-300 ${
                isScrolled
                  ? 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-variant)]'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Language Selector */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className={`flex items-center gap-2 p-3 rounded-xl transition-all duration-300 ${
                  isScrolled
                    ? 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-variant)]'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{currentLanguage.flag}</span>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`} 
                />
              </motion.button>

              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 overflow-hidden min-w-[140px]"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLanguage(lang);
                          setIsLanguageOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[var(--color-surface-variant)] transition-colors duration-200"
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-sm font-medium text-[var(--color-text)]">{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-3 rounded-xl transition-all duration-300 ${
              isScrolled
                ? 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-variant)]'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden border-t border-white/20 py-6 bg-white/10 backdrop-blur-xl rounded-b-2xl mt-4"
            >
              <div className="flex flex-col gap-2">
                {navigation.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-200 ${
                          isActive(item.href)
                            ? 'bg-white/20 text-white'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile Theme & Language */}
                <div className="flex items-center gap-2 px-4 pt-4 border-t border-white/20 mt-4">
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                  >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    <span className="font-medium">Theme</span>
                  </button>
                  
                  <button
                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                  >
                    <span className="text-lg">{currentLanguage.flag}</span>
                    <span className="font-medium">{currentLanguage.name}</span>
                  </button>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};