"use client";

import { motion } from 'framer-motion';
import { Award, Users, Target, Zap } from 'lucide-react';

export default function About() {
  const stats = [
    { icon: <Users className="w-6 h-6 text-green-600" />, number: "500+", label: "Happy Clients" },
    { icon: <Award className="w-6 h-6 text-green-600" />, number: "10+", label: "Years Experience" },
    { icon: <Target className="w-6 h-6 text-green-600" />, number: "1000+", label: "Projects Completed" },
    { icon: <Zap className="w-6 h-6 text-green-600" />, number: "24/7", label: "Support Available" }
  ];

  return (
    <section id="about" className="relative py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
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
            About TanzaNexTech
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">Technology Partner</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            TanzaNexTech ni kampuni inayojihusisha na huduma za teknolojia kama:
            duka la kisasa la kompyuta na laptop, Uuzaji wa vifaa vya kompyuta (Accessories), Uuzaji wa mifumo ya kibiashara (POS systems)
            vifaa bora, huduma za kitaalamu, na suluhisho za teknolojia
            kwa biashara na watu binafsi.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-green-600">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Content Sections */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              To empower Tanzanian businesses and individuals with cutting-edge technology solutions 
              that drive growth, efficiency, and innovation. We bridge the digital divide by making 
              quality technology accessible and affordable.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To become Tanzania's most trusted technology partner, recognized for excellence in 
              service delivery, innovation, and customer satisfaction across all IT solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Quality Products</h4>
                  <p className="text-gray-600 text-sm">100% genuine products with manufacturer warranty</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Expert Support</h4>
                  <p className="text-gray-600 text-sm">Professional technical assistance 24/7</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Competitive Pricing</h4>
                  <p className="text-gray-600 text-sm">Best value for money with flexible payment options</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Local Expertise</h4>
                  <p className="text-gray-600 text-sm">Deep understanding of Tanzanian market needs</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}