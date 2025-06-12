import HeroSection from "@/components/sections/hero-section"
import ServicesSection from "@/components/sections/services-section"
import DoctorsSection from "@/components/sections/doctors-section"
import StatsSection from "@/components/sections/stats-section"
import ContactSection from "@/components/sections/contact-section"

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <DoctorsSection />
      <ContactSection />
    </>
  )
}
