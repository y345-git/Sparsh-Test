"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface MobileNavProps {
  onClose: () => void
}

export default function MobileNav({ onClose }: MobileNavProps) {
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto md:hidden">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <div className="text-purple-800 font-bold text-xl">Women's Care Hospital</div>
          <button onClick={onClose} className="text-gray-500">
            <span className="sr-only">Close menu</span>
            &times;
          </button>
        </div>

        <nav className="space-y-4">
          <Link
            href="/"
            className="block py-2 border-b border-gray-100 flex justify-between items-center"
            onClick={onClose}
          >
            Home <ChevronRight size={16} />
          </Link>
          <Link
            href="/about"
            className="block py-2 border-b border-gray-100 flex justify-between items-center"
            onClick={onClose}
          >
            About us <ChevronRight size={16} />
          </Link>
          <Link
            href="/specialities"
            className="block py-2 border-b border-gray-100 flex justify-between items-center"
            onClick={onClose}
          >
            Services & Specialities <ChevronRight size={16} />
          </Link>
          <Link
            href="/doctors"
            className="block py-2 border-b border-gray-100 flex justify-between items-center"
            onClick={onClose}
          >
            Doctors <ChevronRight size={16} />
          </Link>
          <Link
            href="/pay-online"
            className="block py-2 border-b border-gray-100 flex justify-between items-center"
            onClick={onClose}
          >
            Pay Online <ChevronRight size={16} />
          </Link>
          <Link
            href="/advanced-care"
            className="block py-2 border-b border-gray-100 flex justify-between items-center"
            onClick={onClose}
          >
            Advanced Care <ChevronRight size={16} />
          </Link>
          <Link
            href="/patient-care"
            className="block py-2 border-b border-gray-100 flex justify-between items-center"
            onClick={onClose}
          >
            Patient Care <ChevronRight size={16} />
          </Link>
          <Link
            href="/locations"
            className="block py-2 border-b border-gray-100 flex justify-between items-center"
            onClick={onClose}
          >
            Locations <ChevronRight size={16} />
          </Link>
          <Link
            href="/careers"
            className="block py-2 border-b border-gray-100 flex justify-between items-center"
            onClick={onClose}
          >
            Careers <ChevronRight size={16} />
          </Link>
          <Link
            href="/wellness"
            className="block py-2 border-b border-gray-100 flex justify-between items-center"
            onClick={onClose}
          >
            Wellness Zone <ChevronRight size={16} />
          </Link>

          <div className="pt-4 mt-4 border-t border-gray-100">
            <Link href="/contact" className="block py-2 text-purple-800 font-medium" onClick={onClose}>
              Contact Us: 080 1234 5678
            </Link>
          </div>

          <div className="pt-4">
            <select className="w-full p-2 border rounded bg-white">
              <option>English</option>
              <option>Spanish</option>
            </select>
          </div>
        </nav>
      </div>
    </div>
  )
}
