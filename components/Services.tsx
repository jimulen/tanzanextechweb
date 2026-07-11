"use client";

import { motion } from 'framer-motion';
import {
  GlobeAltIcon,
  CogIcon,
  SpeakerWaveIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  ServerIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Services() {
  const { t } = useLanguage();
  const services = [
    {
      title: t('services.webDev'),
      description: "Modern, fast and SEO-optimized websites built with latest technologies.",
      icon: <GlobeAltIcon className="w-8 h-8 text-white" />,
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Modern Tech Stack"]
    },
    {
      title: t('services.softwareDev'),
      description: "Custom business systems that improve efficiency and scalability.",
      icon: <CogIcon className="w-8 h-8 text-white" />,
      features: ["Custom Solutions", "Scalable Architecture", "Cloud Integration", "API Development"]
    },
    {
      title: t('services.itSupport'),
      description: "Reliable technical support, maintenance and troubleshooting services.",
      icon: <SpeakerWaveIcon className="w-8 h-8 text-white" />,
      features: ["24/7 Support", "Remote Assistance", "On-site Service", "Preventive Maintenance"]
    },
    {
      title: "Hardware Sales",
      description: "Quality computers, laptops, and accessories from leading brands.",
      icon: <ComputerDesktopIcon className="w-8 h-8 text-white" />,
      features: ["Brand New Products", "Warranty Included", "Installation Service", "Technical Support"]
    },
    {
      title: "Mobile Solutions",
      description: "Custom mobile apps and mobile device management solutions.",
      icon: <DevicePhoneMobileIcon className="w-8 h-8 text-white" />,
      features: ["iOS & Android", "Cross-Platform", "App Store Deployment", "Maintenance"]
    },
    {
      title: "Data Security",
      description: "Comprehensive security solutions to protect your business data.",
      icon: <ShieldCheckIcon className="w-8 h-8 text-white" />,
      features: ["Data Backup", "Virus Protection", "Network Security", "Security Audits"]
    }
  ];

  return (
    <section id="services" className="relative py-20 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 right-20 w-80 h-80 bg-green-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            {t('services.title')}
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('services.subtitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">IT Solutions</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.description')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Icon */}
              <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    {feature}
                  </div>
                ))}
              </div>

              {/* Hover Line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-green-600 to-green-800 transition-all duration-300 group-hover:w-full rounded-b-2xl"></div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-12 text-white"
        >
          <h3 className="text-3xl font-bold mb-4">
            Need a Custom Solution?
          </h3>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto text-lg">
            We specialize in creating tailored IT solutions to meet your specific business requirements. 
            Let's discuss how we can help transform your business.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center bg-white text-green-600 font-semibold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors gap-2"
          >
            Get Custom Quote
            <ServerIcon className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
