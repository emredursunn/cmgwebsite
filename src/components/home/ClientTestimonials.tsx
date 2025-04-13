'use client';

import Image from 'next/image';

const ClientTestimonials = () => {
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

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Müşterilerimiz Ne Diyor?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hizmetlerimizden memnun kalan müşterilerimizin yorumları.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {musteriYorumlari.map((yorum) => (
            <div 
              key={yorum.id} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200">
                  <Image 
                    src={yorum.avatar} 
                    alt={yorum.isim} 
                    width={48} 
                    height={48} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{yorum.isim}</h3>
                  <p className="text-sm text-gray-500">{yorum.sirket}</p>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600">"{yorum.yorum}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials; 