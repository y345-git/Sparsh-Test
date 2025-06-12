import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const doctors = [
  {
    name: "Dr. Anil Magdum",
    specialty: "Obstetrics & Gynecology",
    image: "/placeholder.svg?height=300&width=300",
    link: "/doctors/anil-magdum",
  },
  {
    name: "Dr. Vaishali Magdum",
    specialty: "Reproductive Endocrinology",
    image: "/placeholder.svg?height=300&width=300",
    link: "/doctors/vaishali-magdum",
  },
]

export default function DoctorsSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 bg-pink-100 text-pink-500 rounded-full text-sm mb-4">Our Experts</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Specialists</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experienced gynecologists dedicated to providing exceptional care for women
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {doctors.map((doctor, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="flex flex-col md:flex-row">
                <div className="relative h-64 md:h-auto md:w-1/3">
                  <Image src={doctor.image || "/placeholder.svg"} alt={doctor.name} fill className="object-cover" />
                </div>
                <div className="p-6 md:w-2/3 flex flex-col justify-center">
                  <h3 className="font-bold text-xl text-gray-800 mb-1">{doctor.name}</h3>
                  <p className="text-pink-500 font-medium mb-4">{doctor.specialty}</p>
                  <Link href={doctor.link}>
                    <Button variant="outline" className="w-full border-pink-500 text-pink-500 hover:bg-pink-50">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
