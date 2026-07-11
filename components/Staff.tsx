"use client";

import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail, Briefcase } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Staff() {
  const { t } = useLanguage();
  const staffMembers = [
    {
      name: "Jimulen M. Johansen",
      role: "CEO & Founder",
      img: "jimmy.jpg",
      bio: "Visionary leader with 15+ years in IT industry, driving digital transformation across Tanzania.",
      social: { linkedin: "#", twitter: "#", email: "ceo@tanzanex.tech" }
    },
    {
      name: "Samira Young",
      role: "Head of Sales",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Expert in client relations and business development with a track record of successful partnerships.",
      social: { linkedin: "#", twitter: "#", email: "rispa@tanzanex.tech" }
    },
    {
      name: "Canisius Mwita",
      role: "Lead Developer",
      img: "https://randomuser.me/api/portraits/men/56.jpg",
      bio: "Full-stack developer specializing in scalable web applications and enterprise solutions.",
      social: { linkedin: "#", twitter: "#", email: "canisius@tanzanex.tech" }
    },
    {
      name: "Janeth Gasper",
      role: "Marketing Manager",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
      bio: "Digital marketing expert helping businesses grow through innovative strategies and campaigns.",
      social: { linkedin: "#", twitter: "#", email: "janeth@tanzanex.tech" }
    },
  ];

  return (
    <section id="staff" className="relative py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-32 left-32 w-64 h-64 bg-green-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl"></div>
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
            <Briefcase className="w-4 h-4 mr-2 text-green-800" />
            {t('staff.title')}
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">{t('staff.subtitle').split(' ')[1] || 'Expert Team'}</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('staff.description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {staffMembers.map((staff, index) => (
            <motion.div
              key={staff.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative h-48 bg-gradient-to-br from-green-400 to-green-600">
                <img
                  src={staff.img}
                  alt={staff.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Social Links */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {staff.social.linkedin && (
                    <a
                      href={staff.social.linkedin}
                      className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-gray-700" />
                    </a>
                  )}
                  {staff.social.twitter && (
                    <a
                      href={staff.social.twitter}
                      className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <Twitter className="w-4 h-4 text-gray-700" />
                    </a>
                  )}
                  {staff.social.email && (
                    <a
                      href={`mailto:${staff.social.email}`}
                      className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <Mail className="w-4 h-4 text-gray-700" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{staff.name}</h3>
                <p className="text-green-600 font-semibold text-sm mb-3">{staff.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {staff.bio}
                </p>
                
                {/* Hover Line */}
                <div className="mt-4 h-1 w-0 bg-gradient-to-r from-green-600 to-green-800 group-hover:w-full transition-all duration-300 rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Join Our Growing Team
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals who are passionate about technology and innovation.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center bg-green-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-green-700 transition-colors"
          >
            Explore Career Opportunities
          </a>
        </motion.div>
      </div>
    </section>
  );
}