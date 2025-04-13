import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import data from '@/data/dummy.json';

const Footer = () => {
  const { address, email, phone } = data.contact;
  
  const socialLinks = [
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-slate-900 text-white relative">
      {/* Footer Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Company Info */}
          <div className="md:w-1/3">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Canikligas</h3>
              <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Kalite ve müşteri memnuniyeti taahhüdümüzle, profesyonel akaryakıt istasyonu kurulum, bakım hizmetleri ve ürün ihracatı.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  aria-label={link.label} 
                  className="bg-slate-800 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Map and Contact */}
          <div className="md:w-2/3">
            <div className="bg-slate-800 rounded-xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Map */}
                <div className="h-64 md:h-auto relative">
                    <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3124.952604281466!2d27.195966199999997!3d38.4425637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b963d6da7031eb%3A0x29be781d1cfc3a55!2zQ0FOxLBLTMSwR0FT!5e0!3m2!1str!2str!4v1744494269887!5m2!1str!2str" 
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                
                {/* Contact Info */}
                <div className="p-6 md:p-8 bg-gradient-to-br from-slate-800 to-slate-900">
                  <h3 className="text-xl font-bold mb-6 text-blue-400">Bize Ulaşın</h3>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <div className="bg-blue-600/20 p-2 rounded-lg mt-1">
                        <MapPin className="text-blue-400" size={20} />
                      </div>
                      <div>
                        <span className="block text-sm text-gray-400 mb-1">Adresimiz</span>
                        <span className="text-white">{address}</span>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-4">
                      <div className="bg-blue-600/20 p-2 rounded-lg mt-1">
                        <Mail className="text-blue-400" size={20} />
                      </div>
                      <div>
                        <span className="block text-sm text-gray-400 mb-1">E-posta</span>
                        <a href={`mailto:${email}`} className="text-white hover:text-blue-400 transition-colors">{email}</a>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-4">
                      <div className="bg-blue-600/20 p-2 rounded-lg mt-1">
                        <Phone className="text-blue-400" size={20} />
                      </div>
                      <div>
                        <span className="block text-sm text-gray-400 mb-1">Telefon</span>
                        <a href={`tel:${phone}`} className="text-white hover:text-blue-400 transition-colors">{phone}</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Canikligas. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 