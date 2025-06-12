"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, Calendar, MessageCircle, Stethoscope } from "lucide-react"
import { motion } from "framer-motion"

const contactInfo = [
  {
    icon: <MapPin className="h-6 w-6 text-pink-500" />,
    title: "Address",
    details: [
      "Anuradha Heritage Building",
      "Infront of Hotel White House, 100 ft Road",
      "Vishrambag Sangli, India, 416416",
    ],
    color: "pink",
  },
  {
    icon: <Phone className="h-6 w-6 text-rose-500" />,
    title: "Phone",
    details: ["75067 03470", "96964 69191"],
    color: "rose",
  },
  {
    icon: <Mail className="h-6 w-6 text-fuchsia-500" />,
    title: "Email",
    details: ["sparshclinicforwomen@gmail.com"],
    color: "fuchsia",
  },
  {
    icon: <Clock className="h-6 w-6 text-purple-500" />,
    title: "Hours",
    details: ["Mon-Fri: 8:00 AM - 8:00 PM", "Sat: 9:00 AM - 5:00 PM", "Sun: Emergency Only"],
    color: "purple",
  },
]

const quickActions = [
  {
    icon: <MessageCircle className="h-8 w-8 text-pink-500" />,
    title: "General Inquiry",
    description: "Ask us anything",
    color: "pink",
  },
  {
    icon: <Stethoscope className="h-8 w-8 text-rose-500" />,
    title: "Emergency Care",
    description: "24/7 emergency services",
    color: "rose",
  },
  {
    icon: <Calendar className="h-8 w-8 text-fuchsia-500" />,
    title: "Information",
    description: "Learn about our services",
    color: "fuchsia",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

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
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-50 to-fuchsia-100"></div>
        {/* Floating elements */}
        <div className="absolute top-12 right-16 w-40 h-40 bg-pink-200/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-rose-200/25 rounded-full blur-xl"></div>
        <div className="absolute top-2/3 right-1/4 w-24 h-24 bg-fuchsia-200/30 rounded-full blur-lg"></div>

        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-lg text-pink-500 rounded-full text-sm shadow-lg border border-pink-200/50">
              <div className="w-2 h-2 bg-pink-400 rounded-full mr-3 animate-pulse"></div>
              Contact Us
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight font-poppins">
              Get in{" "}
              <span className="bg-gradient-to-r from-pink-500 to-fuchsia-500 bg-clip-text text-transparent">Touch</span>
            </h1>
            <div className="bg-white/50 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-pink-100/50 max-w-3xl mx-auto">
              <p className="text-gray-600 text-lg leading-relaxed">
                We're here to help you with all your healthcare needs. Reach out to us for inquiries or emergency care.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50 to-pink-50"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {quickActions.map((action, index) => (
              <motion.div key={index} variants={item}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card
                    className={`text-center hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-${action.color}-500 bg-white/70 backdrop-blur-md border border-${action.color}-100`}
                  >
                    <CardContent className="p-6">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="flex justify-center mb-4"
                      >
                        {action.icon}
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 font-poppins">{action.title}</h3>
                      <p className="text-gray-600">{action.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50 to-fuchsia-50"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-lg text-fuchsia-500 rounded-full text-sm shadow-lg border border-fuchsia-200/50 mb-4">
              <div className="w-2 h-2 bg-fuchsia-400 rounded-full mr-3 animate-pulse"></div>
              Contact Information
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-poppins">How to Reach Us</h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div key={index} variants={item}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="text-center shadow-lg bg-white/70 backdrop-blur-md border border-pink-100 h-48 flex flex-col">
                    <CardHeader className="pb-2 flex-shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="flex justify-center mb-2"
                      >
                        {info.icon}
                      </motion.div>
                      <CardTitle className="text-lg font-poppins">{info.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-center">
                      <div className="space-y-1">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 text-sm leading-relaxed">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-50 to-pink-50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <div className="inline-block px-6 py-3 bg-white/70 backdrop-blur-md text-purple-500 rounded-full text-sm mb-4 shadow-md border border-purple-100">
                  Send Message
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4 font-poppins">Contact Form</h2>
                <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
              </div>

              <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-pink-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className="bg-white/80 backdrop-blur-sm border-pink-100 focus:border-pink-300 focus:ring-pink-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        className="bg-white/80 backdrop-blur-sm border-pink-100 focus:border-pink-300 focus:ring-pink-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                        className="bg-white/80 backdrop-blur-sm border-pink-100 focus:border-pink-300 focus:ring-pink-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select onValueChange={(value) => handleSelectChange("inquiryType", value)}>
                        <SelectTrigger
                          id="inquiryType"
                          className="bg-white/80 backdrop-blur-sm border-pink-100 focus:border-pink-300 focus:ring-pink-200"
                        >
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="services">Services Information</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                          <SelectItem value="billing">Billing</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter subject"
                      required
                      className="bg-white/80 backdrop-blur-sm border-pink-100 focus:border-pink-300 focus:ring-pink-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter your message"
                      rows={5}
                      required
                      className="bg-white/80 backdrop-blur-sm border-pink-100 focus:border-pink-300 focus:ring-pink-200"
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <div className="inline-block px-6 py-3 bg-white/70 backdrop-blur-md text-rose-500 rounded-full text-sm mb-4 shadow-md border border-rose-100">
                  Location
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4 font-poppins">Find Us</h2>
                <p className="text-gray-600">We're conveniently located in the heart of Sangli for easy access.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="lg:col-span-3"
                >
                  <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-pink-100 overflow-hidden h-[500px]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.0307456593!2d74.56999!3d16.8563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1237f52c65db5%3A0xb5d12a0ddcbd3b89!2sSparsh%20Hospital!5e0!3m2!1sen!2sin!4v1718175000000!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Sparsh Hospital Location"
                    ></iframe>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="lg:col-span-2 space-y-4"
                >
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <Card className="border-l-4 border-l-pink-500 bg-white/70 backdrop-blur-md border border-pink-100">
                      <CardContent className="p-6">
                        <h3 className="font-bold text-gray-800 mb-2 font-poppins">Directions</h3>
                        <p className="text-gray-600 text-sm mb-2">
                          Located on 100 ft Road, Vishrambag, Sangli, easily accessible by public transport and with
                          parking available.
                        </p>
                        <p className="text-gray-600 text-sm">
                          <strong>Landmark:</strong> Infront of Hotel White House, Anuradha Heritage Building
                        </p>
                        <div className="mt-4">
                          <a
                            href="https://maps.app.goo.gl/haziKAz2yaPuTNEG8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-500 hover:text-pink-600 text-sm flex items-center"
                          >
                            <MapPin size={14} className="mr-1" /> Get Directions on Google Maps
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-400/80 to-pink-500/80"></div>
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/30 max-w-2xl mx-auto"
          >
            <div className="inline-block px-6 py-3 bg-red-500/80 backdrop-blur-sm text-white rounded-full text-sm mb-4">
              Emergency
            </div>
            <h2 className="text-3xl font-bold text-white mb-4 font-poppins">Emergency Care</h2>
            <p className="text-pink-100 mb-8">
              For medical emergencies, please call our emergency hotline immediately or visit our emergency department.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-white text-red-500 hover:bg-gray-100 px-8 py-3 rounded-full shadow-md">
                  <Phone size={16} className="mr-2" />
                  Emergency: 75067 03470
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
