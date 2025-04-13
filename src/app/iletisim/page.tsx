import { MailIcon, Phone, MapPin } from 'lucide-react';
import data from '@/data/dummy.json';
import Image from 'next/image';
import ContactForm from '@/components/contact/ContactForm';

// SEO optimizasyonu için statik sayfa oluşturma
export const dynamic = 'force-static';

export const metadata = {
  title: 'İletişim | Canikligas',
  description: 'Akaryakıt istasyonu kurulumu, bakım hizmetleri ve ürün bilgileri için ekibimizle iletişime geçin',
};

export default function IletisimSayfasi() {
  const { address, email, phone } = data.contact;

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20 md:py-28 -mt-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/images/products/product-2.png" 
            alt="İletişim" 
            fill 
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Bize Ulaşın</h1>
            <p className="text-xl max-w-3xl mb-8 text-blue-100 animate-fade-in-delayed">
              Akaryakıt istasyonu ihtiyaçlarınız için buradayız. Hizmetlerimiz ve ürünlerimiz hakkında bilgi almak için bizimle iletişime geçin.
            </p>
          </div>
        </div>
      </div>

      {/* İletişim Bölümü */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* İletişim Bilgileri */}
            <div>
              <h2 className="text-2xl font-bold mb-6">İletişim Bilgilerimiz</h2>
              <p className="text-gray-600 mb-8">
                Hizmetlerimiz veya ürünlerimiz hakkında sorularınız mı var? Ekibimiz size yardımcı olmak için hazır.
                İletişim formunu doldurun veya aşağıdaki bilgileri kullanarak bizimle iletişime geçin.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-blue-100 rounded-full p-3">
                      <MapPin className="text-blue-600 text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Adres</h3>
                    <p className="text-gray-600">{address}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-blue-100 rounded-full p-3">
                      <MailIcon className="text-blue-600 text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">E-posta</h3>
                    <a href={`mailto:${email}`} className="text-blue-600 hover:text-blue-800">
                      {email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-blue-100 rounded-full p-3">
                      <Phone className="text-blue-600 text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Telefon</h3>
                    <a href={`tel:${phone}`} className="text-blue-600 hover:text-blue-800">
                      {phone}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 border-t border-gray-200 pt-8">
                <h3 className="font-semibold text-lg mb-3">Çalışma Saatleri</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>Pazartesi - Cuma: 09:00 - 18:00</li>
                  <li>Cumartesi: 10:00 - 16:00</li>
                  <li>Pazar: Kapalı</li>
                </ul>
              </div>
              
              <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="font-semibold text-lg mb-3 text-blue-800">Acil Servis</h3>
                <p className="text-gray-700 mb-3">
                  Akaryakıt istasyonunuz için 7/24 acil teknik destek hizmetimiz mevcuttur.
                </p>
                <a href={`tel:${phone}`} className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
                  <Phone className="mr-2 h-4 w-4" /> Acil Servis Hattı
                </a>
              </div>
            </div>
            
            {/* İletişim Formu */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Bize Mesaj Gönderin</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Harita Bölümü */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Bizi Bulun</h2>
            <div className="aspect-w-16 aspect-h-9 w-full bg-gray-300 h-96 rounded-lg overflow-hidden shadow-md">
              {/* Gerçek uygulamada buraya Google Maps gelir */}
              <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3124.952604281466!2d27.195966199999997!3d38.4425637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b963d6da7031eb%3A0x29be781d1cfc3a55!2zQ0FOxLBLTMSwR0FT!5e0!3m2!1str!2str!4v1744494269887!5m2!1str!2str" 
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 