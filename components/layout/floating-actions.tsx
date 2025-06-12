import Link from "next/link"
import { Calendar, MessageCircle, Stethoscope } from "lucide-react"

export default function FloatingActions() {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
      <Link
        href="/appointment"
        className="flex flex-col items-center justify-center w-16 h-16 bg-purple-800 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors"
      >
        <Calendar size={20} />
        <span className="text-xs mt-1">Book</span>
      </Link>

      <Link
        href="/enquiry"
        className="flex flex-col items-center justify-center w-16 h-16 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-500 transition-colors"
      >
        <MessageCircle size={20} />
        <span className="text-xs mt-1">Enquire</span>
      </Link>

      <Link
        href="/checkup"
        className="flex flex-col items-center justify-center w-16 h-16 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-500 transition-colors"
      >
        <Stethoscope size={20} />
        <span className="text-xs mt-1">Checkup</span>
      </Link>
    </div>
  )
}
