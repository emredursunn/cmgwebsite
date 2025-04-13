'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PencilRuler, Wrench, TruckIcon, ShieldCheck, Gauge, Search } from 'lucide-react';
import data from '@/data/dummy.json';

const ServicesOverview = () => {
  // Map services from dummy.json with enhanced UI details
  const serviceIcons = {
    'installation': <PencilRuler className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />,
    'maintenance': <Wrench className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />,
    'calibration': <Gauge className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />,
    'equipment': <TruckIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />,
    'emergency': <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />,
  };

  // Use services from data/dummy.json and enhance them with images and icons
  const fuelStationServices = Object.entries(data.services).map(([id, service]) => ({
    id,
    title: service.title,
    description: service.description,
    image: id === 'installation' ? '/images/gas-station.jpg' : 
           id === 'maintenance' ? '/images/canikligasman.png' : '/images/products/product-1.png',
    icon: serviceIcons[id as keyof typeof serviceIcons] || <Wrench className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />,
    link: `/services/${id}`
  }));

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalServiceIndex, setModalServiceIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const dragStartX = useRef(0);
  
  // Add touch and mouse gesture support
  useEffect(() => {
    const sliderElement = sliderRef.current;
    if (!sliderElement) return;
    
    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.changedTouches[0].screenX;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].screenX;
      handleSwipe(touchEndX.current - touchStartX.current);
    };
    
    // Mouse events for desktop
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      dragStartX.current = e.clientX;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
    };
    
    const handleMouseUp = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const dragDistance = e.clientX - dragStartX.current;
      handleSwipe(dragDistance);
      setIsDragging(false);
    };
    
    const handleMouseLeave = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };
    
    const handleSwipe = (swipeDistance: number) => {
      // Required minimum swipe distance (in px)
      const minSwipeDistance = 50;
      
      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
          // Swiped right - go to previous
          handlePrevCard();
        } else {
          // Swiped left - go to next
          handleNextCard();
        }
      }
    };
    
    // Add event listeners
    sliderElement.addEventListener('touchstart', handleTouchStart);
    sliderElement.addEventListener('touchend', handleTouchEnd);
    sliderElement.addEventListener('mousedown', handleMouseDown);
    sliderElement.addEventListener('mousemove', handleMouseMove);
    sliderElement.addEventListener('mouseup', handleMouseUp);
    sliderElement.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      // Remove event listeners
      sliderElement.removeEventListener('touchstart', handleTouchStart);
      sliderElement.removeEventListener('touchend', handleTouchEnd);
      sliderElement.removeEventListener('mousedown', handleMouseDown);
      sliderElement.removeEventListener('mousemove', handleMouseMove);
      sliderElement.removeEventListener('mouseup', handleMouseUp);
      sliderElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [activeIndex, isDragging]);
  
  // Handle animation smoothness
  const changeCard = (newIndex: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex(newIndex);
    
    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  // Navigate to next card
  const handleNextCard = () => {
    if (isAnimating) return;
    changeCard((activeIndex + 1) % fuelStationServices.length);
  };
  
  // Navigate to previous card
  const handlePrevCard = () => {
    if (isAnimating) return;
    changeCard((activeIndex - 1 + fuelStationServices.length) % fuelStationServices.length);
  };
  
  // Handle clicking on a card
  const handleCardClick = (index: number) => {
    if (index === activeIndex) {
      // If it's the active card on mobile, show modal with full description
      if (window.innerWidth < 640) {
        setModalServiceIndex(index);
        setIsModalOpen(true);
      }
    } else {
      // If not the active card, make it active
      changeCard(index);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevCard();
      } else if (e.key === 'ArrowRight') {
        handleNextCard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, isAnimating]);
  
  // Preload images to prevent lag
  useEffect(() => {
    fuelStationServices.forEach(service => {
      const imgElement = document.createElement('img');
      imgElement.src = service.image;
    });
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Hizmetlerimiz</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Akaryakıt istasyonlarınız için profesyonel bakım, kurulum ve destek hizmetleri.
          </p>
        </div>

        {/* Card Slider - allow overflow to show side cards partially */}
        <div 
          ref={sliderRef}
          className={`relative max-w-6xl mx-auto h-[400px] md:h-[500px] overflow-visible px-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          {/* Navigation Controls */}
          <button 
            onClick={handlePrevCard}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-blue-600"
            aria-label="Önceki hizmet"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          
          <button 
            onClick={handleNextCard}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-blue-600"
            aria-label="Sonraki hizmet"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
          
          {/* Cards Container */}
          <div className="flex items-center justify-center h-full">
            {fuelStationServices.map((service, index) => {
              // Calculate the position relative to active index
              const position = index - activeIndex;
              
              // Normalize position for wrapping (if we're at the start/end of the array)
              const normalizedPosition = 
                position < -1 ? fuelStationServices.length - Math.abs(position) : 
                position > 1 ? position - fuelStationServices.length : 
                position;
                
              // Calculate styles based on position
              const zIndex = normalizedPosition === 0 ? 10 : 5;
              const opacity = Math.abs(normalizedPosition) > 1 ? 0 : 1;
              const scale = normalizedPosition === 0 ? 1 : 0.75;
              
              // Calculate transform for positioning including rotation for side cards
              let translateX = '0';
              let rotate = '0deg';
              
              if (normalizedPosition === -1) {
                translateX = '-90%';
                rotate = '-10deg'; // Left card tilts counter-clockwise
              }
              
              if (normalizedPosition === 1) {
                translateX = '90%';
                rotate = '10deg'; // Right card tilts clockwise
              }
              
              if (Math.abs(normalizedPosition) > 1) {
                translateX = normalizedPosition < 0 ? '-150%' : '150%';
              }
              
              return (
                <div
                  key={service.id}
                  onClick={() => handleCardClick(index)}
                  className={`absolute transition-all duration-500 ease-in-out will-change-transform
                             rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-110 hover:ring-4 hover:ring-blue-500
                             ${Math.abs(normalizedPosition) > 1 ? 'pointer-events-none' : 'pointer-events-auto'}`}
                  style={{
                    transform: `translateX(${translateX}) scale(${scale}) rotate(${rotate})`,
                    zIndex,
                    opacity,
                    width: normalizedPosition === 0 ? '60%' : '30%',
                    height: normalizedPosition === 0 ? '90%' : '75%',
                  }}
                >
                  {/* Card Background Image */}
                  <div className="relative w-full h-full">
                    <Image 
                      src={service.image} 
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      priority={index === activeIndex || Math.abs(normalizedPosition) <= 1}
                      className="object-cover"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
                    
                    {/* Card Content */}
                    <div className="absolute inset-0 flex flex-col p-6 sm:p-8 text-white justify-end">
                      <div 
                        className={`transition-all duration-700 bg-black/60 backdrop-blur-sm p-4 sm:p-6 rounded-lg ${
                          normalizedPosition === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                      >
                        <h3 className="text-xl sm:text-2xl font-bold mb-2">{service.title}</h3>
                        <p className="text-white/90 mb-4 line-clamp-3 sm:line-clamp-4">{service.description}</p>
                        
                        {/* Devamını Oku butonu - sadece mobil görünümde ve aktif kartta görünür */}
                        {normalizedPosition === 0 && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalServiceIndex(index);
                              setIsModalOpen(true);
                            }}
                            className="sm:hidden inline-flex items-center text-sm font-medium text-white hover:text-white bg-white/20 hover:bg-white/30 py-1.5 px-3 rounded-lg transition-colors"
                          >
                            Devamını Oku
                            <svg className="ml-1 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Indicator Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {fuelStationServices.map((_, index) => (
            <button
              key={index}
              onClick={() => changeCard(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === activeIndex ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Hizmet ${index + 1}`}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link 
            href="/servisler" 
            className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-2 px-6 rounded-md transition-colors"
          >
            Tüm Hizmetlerimiz
          </Link>
        </div>
      </div>
      
      {/* Mobile Full Description Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-5">
              <div className="flex items-center mb-4">
                <div className="mr-3 bg-blue-100 p-2 rounded-full">
                  {fuelStationServices[modalServiceIndex].icon}
                </div>
                <h3 className="text-xl font-bold">{fuelStationServices[modalServiceIndex].title}</h3>
              </div>
              
              <p className="text-gray-700 mb-6">
                {fuelStationServices[modalServiceIndex].description}
              </p>
              
              <div className="flex justify-between">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-600 font-medium"
                >
                  Kapat
                </button>
                
                <Link
                  href={fuelStationServices[modalServiceIndex].link}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md font-medium"
                >
                  Detaylara Git
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesOverview; 