"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Baby, HeartPulse, Microscope, Activity } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const services = [
  {
    icon: <Baby className="h-8 w-8 text-pink-500" />,
    title: "Obstetric Care",
    description: "Comprehensive prenatal care, delivery services, and postpartum support for expectant mothers.",
    link: "/services/obstetrics",
  },
  {
    icon: <HeartPulse className="h-8 w-8 text-pink-500" />,
    title: "Gynecology",
    description: "Routine and specialized care for women's reproductive health at every stage of life.",
    link: "/services/gynecology",
  },
  {
    icon: <Microscope className="h-8 w-8 text-pink-500" />,
    title: "Fertility Treatment",
    description: "Advanced fertility services including IVF, IUI, and personalized fertility plans.",
    link: "/services/fertility",
  },
  {
    icon: <Activity className="h-8 w-8 text-pink-500" />,
    title: "Menopause Care",
    description: "Specialized care and treatment options for women experiencing menopause symptoms.",
    link: "/services/menopause",
  },
]

export default function ServicesSection() {
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
    <section className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50 to-pink-50"></div>
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block px-6 py-3 bg-white/70 backdrop-blur-md text-pink-500 rounded-full text-sm mb-4 shadow-md border border-pink-100">
            Our Specialties
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 font-poppins">
            Comprehensive Women's Healthcare Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At Women's Care Hospital, we offer a wide range of specialized gynecological and obstetric services to
            address all aspects of women's health.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item}>
              <Link href={service.link} className="group">
                <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-500 bg-white/70 backdrop-blur-md overflow-hidden">
                  <CardContent className="p-6 relative">
                    <motion.div
                      className="mb-4 relative z-10"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {service.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 relative z-10">{service.title}</h3>
                    <p className="text-gray-600 relative z-10">{service.description}</p>

                    {/* Liquid bubble effect on hover */}
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-100 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-700 group-hover:scale-150"></div>
                    <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-pink-200 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500 delay-100 group-hover:scale-150"></div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
