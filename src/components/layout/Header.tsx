'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Tally3, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll position
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navigation = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Hizmetler', href: '/servisler' },
    { name: 'Ürünler', href: '/urunler' },
    { name: 'Sertifikalar', href: '/sertifikalar' },
    { name: 'İletişim', href: '/iletisim' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex h-16 items-center justify-between">
          <div className="flex lg:flex-1">
            <Link href="/" className={`-m-1.5 p-1.5 font-bold text-2xl transition-colors ${
              scrolled ? 'text-blue-700' : 'text-white'
            }`}>
              Canikligas
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Ana menüyü aç</span>
              <Tally3 className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold leading-6 transition-colors ${
                  scrolled ? 'text-gray-900 hover:text-blue-700' : 'text-white hover:text-blue-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link 
              href="/iletisim" 
              className="text-sm font-semibold leading-6 text-white bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
            >
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          {/* Close button overlay */}
          <div 
            className="absolute inset-0 z-0"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          
          {/* Menu panel */}
          <div 
            className="absolute top-0 right-0 z-10 h-full w-[80%] max-w-sm bg-gradient-to-br from-blue-900 to-slate-900 transform transition-transform duration-300"
            style={{ 
              boxShadow: '-5px 0 25px rgba(0, 0, 0, 0.15)'
            }}
          >
            <div className="relative flex flex-col h-full text-white">
              {/* Header with logo and close */}
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <Link href="/" className="font-bold text-2xl text-white">
                  Canikligas
                </Link>
                <button
                  type="button"
                  className="rounded-full p-2 bg-white/10 hover:bg-white/20 text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Menüyü kapat</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto py-6 px-5">
                <div className="flex flex-col space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="py-3 px-4 rounded-lg text-lg font-medium text-white hover:bg-white/10 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Contact Button */}
              <div className="p-5 border-t border-white/10">
                <Link
                  href="/iletisim"
                  className="block w-full py-3 px-4 bg-white text-blue-800 rounded-lg font-bold text-center transition-colors hover:bg-blue-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Bize Ulaşın
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 