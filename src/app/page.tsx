import HeroSection from '@/components/home/HeroSection';
import ServicesOverview from '@/components/home/ServicesOverview';
import ProductsOverview from '@/components/home/ProductsOverview';
import PartnersShowcase from '@/components/home/PartnersShowcase';
import CertificationsOverview from '@/components/home/CertificationsOverview';
import ContactCTA from '@/components/home/ContactCTA';
import ClientTestimonials from '@/components/home/ClientTestimonials';
import AnimatedSection from '@/components/ui/AnimatedSection';

// Force static generation for SEO optimization
export const dynamic = 'force-static';

// SEO için metadata
export const metadata = {
  title: 'Canikligas - Yüksek Kaliteli Ürün ve Hizmetler',
  description: 'Akaryakıt istasyonu ekipmanları, kurulum ve bakım hizmetlerinde uluslararası sertifikalı lider tedarikçi',
};

export default function Home() {
  return (
    <div className="-mt-16">
      {/* Hero animasyon gerektirmez, ekranın üst kısmında olduğu için */}
      <HeroSection />
      
      {/* İletişim çağrı butonu için animasyon */}
      <AnimatedSection animationType="fade-in" delay={100}>
        <ContactCTA />
      </AnimatedSection>

      {/* Hizmetler için animasyon */}
      <AnimatedSection animationType="fade-up" delay={250}>
        <ServicesOverview />
      </AnimatedSection>
      
      {/* Ürünler için animasyon */}
      <AnimatedSection animationType="fade-up" delay={300}>
        <ProductsOverview />
      </AnimatedSection>
      
      {/* Partner'lar için animasyon */}
      <AnimatedSection animationType="fade-in" delay={350}>
        <PartnersShowcase />
      </AnimatedSection>
      
      {/* Sertifikalar için animasyon */}
      <AnimatedSection animationType="fade-up" delay={400}>
        <CertificationsOverview />
      </AnimatedSection>
      
      {/* Müşteri yorumları için animasyon */}
      <AnimatedSection animationType="fade-up" delay={450}>
        <ClientTestimonials />
      </AnimatedSection>
      
    </div>
  );
}