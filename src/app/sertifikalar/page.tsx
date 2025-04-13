import Link from 'next/link';
import Image from 'next/image';
import { Award, ShieldCheck, File, Calendar, Building, CheckCircle } from 'lucide-react';
import data from '@/data/dummy.json';

// SEO optimizasyonu için statik sayfa oluşturma
export const dynamic = 'force-static';

export const metadata = {
  title: 'Sertifikalarımız | Canikligas',
  description: 'Akaryakıt istasyonu ürün ve hizmetlerimiz için uluslararası sertifikalar',
};

export default function SertifikalarSayfasi() {
  const { certifications } = data;

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20 md:py-28 -mt-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/images/products/product-3.png" 
            alt="Sertifikalar" 
            fill 
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Sertifikalarımız</h1>
            <p className="text-xl max-w-3xl mb-8 text-blue-100 animate-fade-in-delayed">
              Ürünlerimizin kalitesini ve güvenliğini garantileyen uluslararası sertifikalarımızla gurur duyuyoruz.
            </p>
          </div>
        </div>
      </div>

      {/* Sertifikalar Açıklama Bölümü */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Kalite Standartlarımız</h2>
            <p className="text-lg text-gray-600 mb-8">
              Tüm ürünlerimiz, en yüksek kalite, güvenlik ve performans standartlarını karşıladıklarından emin olmak 
              için uluslararası kuruluşlar tarafından sertifikalandırılmıştır.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-blue-50 px-6 py-3 rounded-full text-blue-700 font-medium inline-flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" /> ISO 9001:2015
              </div>
              <div className="bg-green-50 px-6 py-3 rounded-full text-green-700 font-medium inline-flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" /> CE Sertifikası
              </div>
              <div className="bg-purple-50 px-6 py-3 rounded-full text-purple-700 font-medium inline-flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" /> TSE Belgesi
              </div>
              <div className="bg-red-50 px-6 py-3 rounded-full text-red-700 font-medium inline-flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" /> ATEX Sertifikası
              </div>
            </div>
          </div>
          
          {/* Sertifika Nedir Bölümü */}
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mb-16">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <div className="relative h-64 w-full">
                  <Image 
                    src="/images/products/certificate-1.png" 
                    alt="Sertifika Örneği" 
                    fill 
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Sertifikalarımızın Önemi</h3>
                <p className="text-gray-600 mb-4">
                  Sertifikalar, ürünlerimizin belirli standartlara uygunluğunu gösteren resmi belgelerdir. 
                  Bu belgeler, ürünlerimizin kalitesini, güvenliğini ve performansını garantiler.
                </p>
                <p className="text-gray-600">
                  Canikligas olarak, tüm sertifikalarımızı düzenli olarak yeniliyor ve ürünlerimizin 
                  her zaman en son güvenlik ve kalite standartlarına uygun olmasını sağlıyoruz.
                </p>
              </div>
            </div>
          </div>
            
          {/* Sertifikalar Listesi */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Güncel Sertifikalarımız</h2>
            
            <div className="space-y-8">
              {certifications.map((cert, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 group"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="bg-blue-50 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center group-hover:shadow-glow transition-all">
                        {index % 3 === 0 ? (
                          <Award className="text-3xl md:text-4xl text-blue-600" />
                        ) : index % 3 === 1 ? (
                          <ShieldCheck className="text-3xl md:text-4xl text-blue-600" />
                        ) : (
                          <File className="text-3xl md:text-4xl text-blue-600" />
                        )}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{cert.title}</h2>
                      <p className="text-gray-600 mb-4">{cert.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-1 text-gray-700">
                            <Building className="h-4 w-4" />
                            <span className="font-semibold">Sertifika Veren Kurum:</span>
                          </div>
                          <p className="text-gray-600 pl-6">{cert.body}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-1 text-gray-700">
                            <Calendar className="h-4 w-4" />
                            <span className="font-semibold">Geçerlilik Tarihi:</span>
                          </div>
                          <p className="text-gray-600 pl-6">{cert.expiry}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 md:ml-4 mt-4 md:mt-0">
                      <a 
                        href="#"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors font-medium text-sm"
                      >
                        <File className="h-4 w-4" />
                        PDF Görüntüle
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Sertifika yoksa */}
            {certifications.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <File className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Şu anda görüntülenecek sertifika bulunmuyor.</p>
                <p className="text-gray-600">Daha sonra tekrar kontrol edebilirsiniz.</p>
              </div>
            )}
          </div>
          
          {/* CTA Section */}
          <div className="mt-16 text-center bg-blue-50 py-12 px-4 rounded-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Sertifikalarımız Hakkında Sorularınız mı Var?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Ekibimiz, sertifikalarımız ve kalite standartlarımız hakkında size detaylı bilgi vermekten memnuniyet duyacaktır.
            </p>
            <Link
              href="/iletisim"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition-colors shadow-md"
            >
              Bizimle İletişime Geçin
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 