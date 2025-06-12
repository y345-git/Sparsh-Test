"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Heart, Clock, MapPin, Phone, Mail } from "lucide-react"
import { motion } from "framer-motion"
import MapComponent from "@/components/ui/map-component"

const stats = [
  { icon: <Users className="h-8 w-8 text-pink-500" />, number: "10,000+", label: "Happy Patients" },
  { icon: <Award className="h-8 w-8 text-rose-500" />, number: "15+", label: "Years Experience" },
  { icon: <Heart className="h-8 w-8 text-fuchsia-500" />, number: "5,000+", label: "Successful Deliveries" },
  { icon: <Clock className="h-8 w-8 text-purple-500" />, number: "24/7", label: "Emergency Care" },
]

const team = [
  {
    name: "Dr. Anil Magdum",
    role: "Chief Gynecologist & Fertility Specialist",
    image: "/placeholder-male-doctor.svg?height=300&width=300",
    description: "Renowned Gynecologist with 25+ years of experience in women's health and fertility treatments.",
  },
  {
    name: "Dr. Vaishali Magdum",
    role: "Obstetrician & Gynecologist",
    image: "/placeholder-female-doctor.svg?height=300&width=300",
    description: "Experienced Obstetrician and Gynecologist dedicated to compassionate patient care.",
  },
]

export default function AboutPage() {
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
        {/* Floating elements for organic feel */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-rose-200/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-fuchsia-200/25 rounded-full blur-lg"></div>

        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-lg text-pink-500 rounded-full text-sm shadow-lg border border-pink-200/50">
                <div className="w-2 h-2 bg-pink-400 rounded-full mr-3 animate-pulse"></div>
                About Us
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight font-poppins">
                Dedicated to Women's{" "}
                <span className="bg-gradient-to-r from-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
                  Health & Wellness
                </span>
              </h1>
              <div className="bg-white/50 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-pink-100/50">
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  For over 15 years, Women's Care Hospital has been at the forefront of women's healthcare, providing
                  compassionate, comprehensive, and cutting-edge medical services to women of all ages.
                </p>
                <p className="text-gray-600">
                  Our mission is to empower women through exceptional healthcare, supporting them at every stage of
                  their lives with dignity, respect, and clinical excellence.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Hospital Building"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent"></div>
              </div>
              {/* Floating accent elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-pink-400/20 rounded-full blur-md"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-rose-400/15 rounded-full blur-lg"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50 to-pink-50"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={item} className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-pink-100 mb-4"
                >
                  <div className="flex justify-center mb-4">{stat.icon}</div>
                  <div className="text-3xl font-bold text-gray-800 mb-2 font-poppins">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-50 to-purple-50"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <Card className="border-l-4 border-l-pink-500 shadow-lg bg-white/70 backdrop-blur-md border border-pink-100 min-h-[215px]">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 font-poppins">Our Mission</h3>
                  <p className="text-gray-600">
                    To provide exceptional, compassionate healthcare services specifically designed for women, ensuring
                    every patient receives personalized care that addresses their unique needs and concerns throughout
                    their healthcare journey.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <Card className="border-l-4 border-l-fuchsia-500 shadow-lg bg-white/70 backdrop-blur-md border border-fuchsia-100 min-h-[215px]">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 font-poppins">Our Vision</h3>
                  <p className="text-gray-600">
                    To be the leading women's healthcare provider, recognized for our clinical excellence, innovative
                    treatments, and unwavering commitment to improving the health and well-being of women in our
                    community and beyond.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50 to-rose-50"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block px-6 py-3 bg-white/70 backdrop-blur-md text-rose-500 rounded-full text-sm mb-4 shadow-md border border-rose-100">
              Our Team
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-poppins">Meet Our Expert Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our dedicated team of specialists brings together years of experience and expertise in women's healthcare
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {team.map((member, index) => (
              <motion.div key={index} variants={item} className="flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-full max-w-sm"
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white/70 backdrop-blur-md border border-pink-100">
                    <div className="relative h-64">
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                      <div className="absolute inset-0 bg-pink-500/10 backdrop-blur-[1px]"></div>
                    </div>
                    <CardContent className="p-6 min-h-[200px]">
                      <h3 className="text-xl font-bold text-gray-800 mb-1 font-poppins">{member.name}</h3>
                      <p className="text-pink-500 font-medium mb-3">{member.role}</p>
                      <p className="text-gray-600">{member.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-50 to-fuchsia-50"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-lg text-purple-500 rounded-full text-sm shadow-lg border border-purple-200/50 mb-4">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse"></div>
              Visit Us
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-poppins">Our Location</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conveniently located in the heart of the medical district for easy access
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="">
              <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-pink-100 overflow-hidden h-96">
                <MapComponent />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
                    <p className="text-gray-600">Anuradha Heritage Building</p>
                    <p className="text-gray-600">Infront of Hotel White House, 100 ft Road</p>
                    <p className="text-gray-600">Vishrambag Sangli, India, 416416</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-fuchsia-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-fuchsia-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                    <p className="text-gray-600">75067 03470</p>
                    <p className="text-gray-600">96964 69191</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-rose-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                    <p className="text-gray-600">sparshclinicforwomen@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Hours</h4>
                    <p className="text-gray-600">Mon-Fri: 8:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Sat: 9:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">Sun: Emergency Only</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
