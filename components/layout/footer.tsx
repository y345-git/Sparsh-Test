"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Mail, Phone, MapPin } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <footer className="bg-white pt-12 pb-6 border-t relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-pink-100/30 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-rose-100/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Column 1 - About */}
          <motion.div variants={item}>
            <div className="flex items-center mb-4">
              <div className="relative h-12 w-12 mr-2">
                <Image src="/sparsh-logo.jpeg" alt="Sparsh Hospital Logo" fill className="object-contain" />
              </div>
              <motion.h3
                className="text-gray-700 font-bold text-lg"
                whileHover={{ color: "#ec4899" }}
                transition={{ duration: 0.3 }}
              >
                Sparsh Hospital
              </motion.h3>
            </div>
            <p className="text-gray-600 mb-4 text-sm md:text-base">
              Leading gynecology hospital providing comprehensive women's healthcare services with compassion and
              expertise for all ages & stages of women.
            </p>
            <div className="flex space-x-4">
              <motion.div
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link
                  href="https://www.facebook.com/sparshclinic1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-600 transition-colors"
                >
                  <Facebook size={20} />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Column 2 - Quick Links */}
          <motion.div variants={item}>
            <h3 className="text-gray-700 font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "About Us", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "Our Doctors", href: "/doctors" },
                { name: "Blog", href: "/blog" },
                { name: "Contact Us", href: "/contact" },
              ].map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-pink-500 transition-colors text-sm md:text-base block py-1"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 - Contact */}
          <motion.div variants={item}>
            <h3 className="text-gray-700 font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <motion.li
                className="flex items-start"
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <MapPin size={18} className="text-pink-500 mr-2 mt-1 flex-shrink-0" />
                </motion.div>
                <span className="text-gray-600 text-sm md:text-base">
                  Anuradha Heritage Building Dr.Killedar Eye Hospital (Old), Infront of Hotel White House, 100 ft Road,
                  Vishrambag Sangli., Sangli, India, 416416
                </span>
              </motion.li>
              <motion.li
                className="flex items-start"
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Phone size={18} className="text-pink-500 mr-2 mt-1 flex-shrink-0" />
                </motion.div>
                <div>
                  <span className="text-gray-600 text-sm md:text-base block">75067 03470</span>
                  <span className="text-gray-600 text-sm md:text-base block">96964 69191</span>
                </div>
              </motion.li>
              <motion.li
                className="flex items-start"
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Mail size={18} className="text-pink-500 mr-2 mt-1 flex-shrink-0" />
                </motion.div>
                <span className="text-gray-600 text-sm md:text-base">sparshclinicforwomen@gmail.com</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-100 mt-10 pt-6"
        >
          <p className="text-gray-600 text-xs md:text-sm text-center">
            © {new Date().getFullYear()} Sparsh Hospital. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
