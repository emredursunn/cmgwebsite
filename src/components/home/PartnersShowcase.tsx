'use client';

import Image from 'next/image';
import { Marquee } from '../ui/Marquee';

// Partner data
const partners = [
  { name: 'Shell', logo: '/images/partners/shell.png' },
  { name: 'Petrol Ofisi', logo: '/images/partners/petrolofisi.png' },
  { name: 'Opet', logo: '/images/partners/opet.jpeg' },
  { name: 'BP', logo: '/images/partners/bp.png' },
  { name: 'Aygaz', logo: '/images/partners/aygaz.jpeg' },
];

const PartnersShowcase = () => {
  return (
    <section className="bg-white py-8 md:py-12 mx-auto">
      <div className="container mx-auto px-4 mb-6 md:mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ortaklarımız</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Size en iyi akaryakıt hizmetlerini sunmak için bu şirketlerle işbirliği yapmaktan gurur duyuyoruz.
          </p>
      </div>
      
      <Marquee pauseOnHover={true} speed={50}>
        {/* Kayan partnerler */}
        {partners.map((partner, index) => (
          <div
            key={index}
            className="relative h-full w-fit mx-6 sm:mx-8 md:mx-[4rem] flex items-center justify-center"
          >
            <div className="min-w-[100px] flex items-center justify-center hover:scale-110 transition-all duration-300">
              <Image
                src={partner.logo}
                alt={partner.name}
                className="h-[50px] sm:h-[60px] md:h-[80px] w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                width={100}
                height={100}
              />
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default PartnersShowcase;
