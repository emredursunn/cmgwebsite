'use client';

import Link from 'next/link';
import Image from 'next/image';
import data from '@/data/dummy.json';
import AnimatedSection from '../ui/AnimatedSection';

// Define types for the hero data
type Stat = {
  value: string;
  label: string;
};

type HeroData = {
  headline: string;
  subheadline: string;
  cta: string;
  stats: Stat[];
};

const HeroSection = () => {
  // Cast the data to our type to ensure TypeScript knows about the stats property
  const { headline, subheadline, cta, stats } = data.home.hero as HeroData;

  return (
    <div className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/canikligasman.png"
          alt="Fuel station background"
          fill
          className="object-cover opacity-40"
          style={{ objectPosition: 'top' }} 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/10 to-transparent"></div>
      </div>
      
      {/* Hero content */}
      <div className="container mx-auto px-4 relative z-10 py-20 md:py-48">
        <div className="max-w-2xl">
          <div className="inline-block bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-md mb-4 transition-transform hover:scale-105">
            100% Memnuniyet Garantisi
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            {headline}
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl animate-fade-in-delayed">
            {subheadline}
          </p>
          
          <Link 
            href="/iletisim" 
            className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            {cta}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      
        {/* Stats Section with glass morphism effect */}
        <div className="mt-16 md:mt-48 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat: Stat, index: number) => (
              <AnimatedSection animationType="fade-up" delay={index * 100}>
              <div 
                key={index} 
                className="backdrop-blur-md bg-white/10 p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-1 hover:shadow-glow group"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {stat.value}
                </div>
                <div className="text-gray-300 group-hover:text-white transition-colors">
                  {stat.label}
                </div>
              </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
