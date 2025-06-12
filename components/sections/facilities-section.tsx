import Image from "next/image"
import { CheckCircle } from "lucide-react"

const facilities = [
  "State-of-the-art Labor & Delivery Suites",
  "Advanced Diagnostic Imaging Center",
  "Minimally Invasive Surgery Center",
  "Fertility Treatment Center",
  "Dedicated Women's Health Research Unit",
  "Comfortable Private Patient Rooms",
]

export default function FacilitiesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-purple-800 mb-6">State-of-the-Art Facilities</h2>
            <p className="text-gray-600 mb-8">
              Our hospital is equipped with the latest technology and modern amenities to provide the highest standard
              of care for women's health. From advanced diagnostic equipment to comfortable recovery spaces, every
              aspect of our facility is designed with your comfort and care in mind.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {facilities.map((facility, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-800 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{facility}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Hospital Facilities"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
