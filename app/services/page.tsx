"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Baby, HeartPulse, Stethoscope, Microscope, Activity, Scissors, Shield, Users } from "lucide-react"
import { motion } from "framer-motion"

const services = [
  {
    icon: <Baby className="h-12 w-12 text-pink-500" />,
    title: "Obstetric Care",
    description: "Comprehensive prenatal care, delivery services, and postpartum support for expectant mothers.",
    features: ["Prenatal Care", "High-Risk Pregnancy", "Labor & Delivery", "Postpartum Care"],
    image: "/placeholder.svg?height=300&width=400",
    color: "pink",
  },
  {
    icon: <HeartPulse className="h-12 w-12 text-rose-500" />,
    title: "Gynecology",
    description: "Routine and specialized care for women's reproductive health at every stage of life.",
    features: ["Annual Exams", "Pap Smears", "Contraception", "Menstrual Disorders"],
    image: "/placeholder.svg?height=300&width=400",
    color: "rose",
  },
  {
    icon: <Microscope className="h-12 w-12 text-fuchsia-500" />,
    title: "Fertility Treatment",
    description: "Advanced fertility services including IVF, IUI, and personalized fertility plans.",
    features: ["IVF Treatment", "IUI Procedures", "Fertility Testing", "Egg Freezing"],
    image: "/placeholder.svg?height=300&width=400",
    color: "fuchsia",
  },
  {
    icon: <Activity className="h-12 w-12 text-purple-500" />,
    title: "Menopause Care",
    description: "Specialized care and treatment options for women experiencing menopause symptoms.",
    features: ["Hormone Therapy", "Symptom Management", "Bone Health", "Lifestyle Counseling"],
    image: "/placeholder.svg?height=300&width=400",
    color: "purple",
  },
  {
    icon: <Stethoscope className="h-12 w-12 text-pink-600" />,
    title: "Gynecologic Oncology",
    description: "Expert diagnosis and treatment of gynecological cancers with compassionate care.",
    features: ["Cancer Screening", "Surgical Treatment", "Chemotherapy", "Follow-up Care"],
    image: "/placeholder.svg?height=300&width=400",
    color: "pink",
  },
  {
    icon: <Scissors className="h-12 w-12 text-rose-600" />,
    title: "Minimally Invasive Surgery",
    description: "Advanced surgical techniques with smaller incisions, less pain, and faster recovery.",
    features: ["Laparoscopy", "Hysteroscopy", "Robotic Surgery", "Quick Recovery"],
    image: "/placeholder.svg?height=300&width=400",
    color: "rose",
  },
]

export default function ServicesPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        <div className="absolute top-16 right-10 w-40 h-40 bg-pink-200/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-16 w-32 h-32 bg-rose-200/25 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-fuchsia-200/30 rounded-full blur-lg"></div>

        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-lg text-pink-500 rounded-full text-sm shadow-lg border border-pink-200/50">
              <div className="w-2 h-2 bg-pink-400 rounded-full mr-3 animate-pulse"></div>
              Our Services
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight font-poppins">
              Comprehensive Women's{" "}
              <span className="bg-gradient-to-r from-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
                Healthcare Services
              </span>
            </h1>
            <div className="bg-white/50 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-pink-100/50 max-w-3xl mx-auto">
              <p className="text-gray-600 text-lg leading-relaxed">
                We offer a complete range of gynecological and obstetric services, from routine care to specialized
                treatments, all delivered with compassion and expertise.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50 to-pink-50"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={item}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white/70 backdrop-blur-md border border-pink-100">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="relative h-64 md:h-auto">
                        <Image
                          src={service.image || "/placeholder.svg"}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-pink-500/10 backdrop-blur-[1px]"></div>
                      </div>
                      <CardContent className="p-6 flex flex-col justify-between">
                        <div>
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="mb-4"
                          >
                            {service.icon}
                          </motion.div>
                          <CardTitle className="text-xl mb-3 font-poppins">{service.title}</CardTitle>
                          <p className="text-gray-600 mb-4">{service.description}</p>
                          <ul className="space-y-1 mb-4">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-center">
                                <div className={`w-2 h-2 rounded-full bg-${service.color}-500 mr-2`}></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="outline"
                            className={`w-full border-${service.color}-300 text-${service.color}-500 hover:bg-${service.color}-50 backdrop-blur-sm`}
                          >
                            Learn More
                          </Button>
                        </motion.div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-50 to-purple-50"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block px-6 py-3 bg-white/70 backdrop-blur-md text-fuchsia-500 rounded-full text-sm mb-4 shadow-md border border-fuchsia-100">
              Why Choose Us
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-poppins">Excellence in Women's Healthcare</h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={item} className="text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-pink-100 mb-4"
              >
                <Shield className="h-16 w-16 text-pink-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2 font-poppins">Advanced Technology</h3>
                <p className="text-gray-600">State-of-the-art equipment and latest medical technologies</p>
              </motion.div>
            </motion.div>
            <motion.div variants={item} className="text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-rose-100 mb-4"
              >
                <Users className="h-16 w-16 text-rose-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2 font-poppins">Expert Team</h3>
                <p className="text-gray-600">Highly qualified specialists with years of experience</p>
              </motion.div>
            </motion.div>
            <motion.div variants={item} className="text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-fuchsia-100 mb-4"
              >
                <HeartPulse className="h-16 w-16 text-fuchsia-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2 font-poppins">Compassionate Care</h3>
                <p className="text-gray-600">Personalized attention and emotional support</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-50 to-pink-50"></div>
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-pink-100 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-poppins">Ready to Schedule Your Consultation?</h2>
            <p className="text-gray-600 mb-8">
              Our team is here to provide you with the best possible care. Contact us today to learn more about our
              services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                    Contact Us
                  </Button>
                </motion.div>
              </Link>
              <Link href="/about">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="border-rose-300 text-rose-500 hover:bg-rose-50 backdrop-blur-sm px-8 py-3 rounded-full"
                  >
                    Learn More
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
