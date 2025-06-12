"use client"

export default function MapComponent() {
  return (
    <div className="w-full h-full bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.0307456593!2d74.56999!3d16.8563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1237f52c65db5%3A0xb5d12a0ddcbd3b89!2sSparsh%20Hospital!5e0!3m2!1sen!2sin!4v1718175000000!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Sparsh Hospital Location"
      />
    </div>
  )
}
