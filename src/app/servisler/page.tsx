import Link from 'next/link';
import Image from 'next/image';
import { PencilRuler, Wrench, CheckCircle, TrendingUp, Clock, Shield, Gauge, TruckIcon } from 'lucide-react';
import data from '@/data/dummy.json';
import ClientTestimonials from '@/components/home/ClientTestimonials';

// SEO optimizasyonu için statik sayfa oluşturma
export const dynamic = 'force-static';

export const metadata = {
  title: 'Hizmetlerimiz | Canikligas',
  description: 'Profesyonel akaryakıt istasyonu kurulum ve bakım hizmetlerimiz ile kaliteli ve güvenilir çözümler sunuyoruz.',
};

export default function ServislerSayfasi() {
  const servisler = Object.entries(data.services).map(([id, service]) => ({
    id,
    ...service,
  }));

  // Servislere ikon ve renkler atama
  const servisIkonlari = {
    'installation': <PencilRuler className="w-16 h-16 text-blue-600" />,
    'maintenance': <Wrench className="w-16 h-16 text-blue-600" />,
    'calibration': <Gauge className="w-16 h-16 text-blue-600" />,
    'equipment': <TruckIcon className="w-16 h-16 text-blue-600" />,
    'emergency': <Shield className="w-16 h-16 text-blue-600" />,
  };

  // Örnek müşteri yorumları
  const musteriYorumlari = [
    {
      id: 1,
      isim: "Ahmet Yılmaz",
      sirket: "ABC Petrol",
      yorum: "Canikligas ile çalışmaya başladığımızdan beri istasyonumuzun verimliliği %30 arttı. Profesyonel ekipleri ve kaliteli hizmetleri için teşekkür ederiz.",
      avatar: "/images/products/product-1.png",
    },
    {
      id: 2,
      isim: "Ayşe Demir",
      sirket: "XYZ Enerji",
      yorum: "Bakım hizmetlerindeki titizlikleri ve hızlı müdahaleleri sayesinde işletmemiz kesintisiz çalışabiliyor. Canikligas ekibine güveniyoruz.",
      avatar: "/images/products/product-2.png",
    },
    {
      id: 3,
      isim: "Mehmet Kaya",
      sirket: "Star Petrol",
      yorum: "İstasyonumuzun kurulumundan bu yana 5 yıldır Canikligas ile çalışıyoruz. Sundukları çözümler ve destekleri için teşekkürler.",
      avatar: "/images/products/product-3.png",
    }
  ];

  // Hizmet avantajları
  const hizmetAvantajlari = [
    {
      icon: <CheckCircle className="h-8 w-8 text-green-500" />,
      baslik: "Kalite Garantisi",
      aciklama: "Tüm hizmetlerimiz uluslararası standartlara uygun olarak gerçekleştirilir."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
      baslik: "Verimlilik Artışı",
      aciklama: "Sistemlerinizin performansını artırarak işletme maliyetlerinizi düşürüyoruz."
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-500" />,
      baslik: "Hızlı Servis",
      aciklama: "7/24 teknik destek ve 24 saat içinde yerinde servis garantisi sunuyoruz."
    },
    {
      icon: <Shield className="h-8 w-8 text-red-500" />,
      baslik: "Güvenlik Odaklı",
      aciklama: "Tüm servis süreçlerimizde güvenlik en öncelikli konumuzdur."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20 md:py-28 -mt-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/images/products/product-1.png" 
            alt="Akaryakıt İstasyonu Servisleri" 
            fill 
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Hizmetlerimiz</h1>
            <p className="text-xl max-w-3xl mb-8 text-blue-100 animate-fade-in-delayed">
              Akaryakıt istasyonunuzun kurulumundan bakımına kadar tüm süreçlerde profesyonel, 
              güvenilir ve müşteri odaklı hizmetler sunuyoruz.
            </p>
            <Link
              href="/iletisim"
              className="inline-block bg-white text-blue-800 font-bold px-8 py-4 rounded-md hover:bg-blue-50 transition duration-300 shadow-lg animate-fade-in-delayed"
            >
              Bizimle İletişime Geçin
            </Link>
          </div>
        </div>
      </div>

      {/* Hizmet Avantajları */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Neden Bizi Tercih Etmelisiniz?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Yılların deneyimi ve uzman kadromuzla akaryakıt istasyonları için en iyi çözümleri sunuyoruz.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {hizmetAvantajlari.map((avantaj, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 text-center"
              >
                <div className="inline-flex items-center justify-center h-16 w-16 bg-gray-50 rounded-full mb-4">
                  {avantaj.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{avantaj.baslik}</h3>
                <p className="text-gray-600">{avantaj.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ana Hizmetler */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Sunduğumuz Hizmetler</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Akaryakıt istasyonunuzun tüm ihtiyaçlarını karşılayacak kapsamlı hizmetlerimiz.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {servisler.map((servis) => (
              <div 
                key={servis.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow group"
              >
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-2/5 bg-blue-50 p-8 flex items-center justify-center">
                    <div className="transform group-hover:scale-110 transition-transform duration-300">
                      {servisIkonlari[servis.id as keyof typeof servisIkonlari]}
                    </div>
                  </div>
                  <div className="md:w-3/5 p-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors">{servis.title}</h2>
                    <p className="text-gray-600 mb-4">{servis.description}</p>
                    <div className="border-t border-gray-100 pt-4">
                      <h3 className="font-semibold mb-2 text-gray-700">Hizmet Kapsamı:</h3>
                      <p className="text-gray-600">{servis.details}</p>
                    </div>
                    <div className="mt-6">
                      <Link
                        href="/iletisim"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Detaylı Bilgi Alın
                        <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Müşteri Yorumları */}
      <ClientTestimonials />

      
      {/* Çağrı Butonu Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Hizmetlerimiz Hakkında Bilgi Almak İster misiniz?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Uzman ekibimiz, akaryakıt istasyonunuz için en uygun çözümleri sunmak için hazır.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/iletisim"
              className="inline-block bg-white text-blue-700 font-bold py-4 px-8 rounded-md hover:bg-blue-50 transition-colors"
            >
              İletişime Geçin
            </Link>
            <Link
              href="/urunler"
              className="inline-block bg-transparent text-white border-2 border-white font-bold py-4 px-8 rounded-md hover:bg-white/10 transition-colors"
            >
              Ürünlerimizi İnceleyin
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 