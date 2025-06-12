"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Jennifer L.",
    text: "The care I received during my high-risk pregnancy was exceptional. Dr. Johnson and her team were attentive, compassionate, and made me feel safe throughout my journey.",
    service: "Obstetrics",
  },
  {
    name: "Michelle T.",
    text: "After struggling with infertility for years, the team at Women's Care Hospital helped us achieve our dream of having a baby. Their expertise and support made all the difference.",
    service: "Fertility Treatment",
  },
  {
    name: "Rebecca S.",
    text: "The minimally invasive surgery I had for fibroids changed my life. Quick recovery, minimal pain, and the staff was incredible from consultation to follow-up care.",
    service: "Gynecologic Surgery",
  },
  {
    name: "Sophia K.",
    text: "The menopause clinic provided me with personalized care that addressed all my symptoms. For the first time, I felt heard and understood by medical professionals.",
    service: "Menopause Care",
  },
]

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="py-16 bg-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-purple-800 mb-4">Patient Stories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Hear from women who have experienced our compassionate care</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-lg bg-white">
            <CardContent className="p-8">
              <Quote className="h-12 w-12 text-purple-200 mb-4" />
              <p className="text-gray-700 text-lg mb-6 italic">{testimonials[activeIndex].text}</p>
              <div>
                <p className="font-bold text-purple-800">{testimonials[activeIndex].name}</p>
                <p className="text-pink-600">{testimonials[activeIndex].service}</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-purple-800" : "bg-purple-200"}`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
