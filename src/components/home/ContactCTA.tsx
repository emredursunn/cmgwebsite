import { Phone, Clipboard, Settings, CheckCircle, ArrowRight } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';

const ContactCTA = () => {
  // İş akışı adımları
  const workflowSteps = [
    {
      icon: <Phone className="w-10 h-10 text-white" />,
      title: "Bize Ulaşın",
      description: "İhtiyaçlarınızı bize bildirin, hızlıca yanıt verelim."
    },
    {
      icon: <Clipboard className="w-10 h-10 text-white" />,
      title: "Keşif & Planlama",
      description: "İstasyonunuzu inceleyelim ve size özel plan hazırlayalım."
    },
    {
      icon: <Settings className="w-10 h-10 text-white" />,
      title: "Uygulama",
      description: "Profesyonel ekibimizle hizmet veya kurulumu gerçekleştirelim."
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-white" />,
      title: "Teslimat & Kontrol",
      description: "İşimizi kalite kontrolü ile tamamlayalım."
    }
  ];

  return (
    <section className="py-16 bg-white text-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Akaryakıt İstasyonunuzu Yenileyelim</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Yılların deneyimi ile istasyonlarınızın bakım, onarım ve kurulum hizmetleri için yanınızdayız.
          </p>
        </div>
        
        {/* İş Akışı Adımları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 mb-12 max-w-6xl mx-auto">
          {workflowSteps.map((step, index) => (
            <AnimatedSection key={index} animationType="fade-up" delay={index * 175}>
              <div className="relative h-full">
                {/* Adım Kartı - Sabit yükseklik eklendi */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg p-6 h-64 hover:shadow-lg transition-shadow border border-blue-200 shadow-sm flex flex-col">
                  <div className="flex flex-col items-center text-center h-full justify-between">
                    <div className="bg-blue-500/30 p-3 rounded-full mb-4">
                      {step.icon}
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-blue-100">{step.description}</p>
                    </div>
                    <div className="mt-2 invisible">
                      {/* Bu boş div, alt boşluk için kullanılır */}
                    </div>
                  </div>
                </div>
                
                {/* Bağlantı Oku - son adım hariç */}
                {index < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-5 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-blue-500" />
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
        
        {/* Bize Ulaşın Kartı */}
        {/* <div className="bg-gray-100 border border-gray-200 rounded-xl p-8 max-w-4xl mx-auto text-center shadow-sm">
          <h3 className="text-2xl font-bold mb-4 text-black">Profesyonel Hizmetlerimizden Faydalanın</h3>
          <p className="text-gray-600 mb-6">
            İstasyonunuz için bakım, kurulum veya ürün tedariği konusunda uzman ekibimiz yanınızda. 
            Hemen bize ulaşın, akaryakıt istasyonunuz için en iyi çözümleri sunalım.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/iletisim" 
              className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-2 px-6 rounded-md transition-colors"
              >
              Hemen İletişime Geçin
            </Link>
            <a 
              href="tel:+905321234567" 
              className="flex items-center text-blue-700 hover:text-blue-900 font-semibold"
            >
              <Phone className="w-5 h-5 mr-2" />
              +90 532 123 45 67
            </a>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default ContactCTA; 