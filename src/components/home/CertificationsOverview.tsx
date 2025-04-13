'use client';

import Link from 'next/link';
import { Award, ShieldCheck } from 'lucide-react';

import data from '@/data/dummy.json';

const CertificationsOverview = () => {
  const { certifications } = data;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sertifikalarımız</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tüm ürünlerimiz ve hizmetlerimizle uluslararası kalite standartlarına uygunluğa sahiptir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                {index % 2 === 0 
                  ? <Award className="w-8 h-8 text-blue-600" />
                  : <ShieldCheck className="w-8 h-8 text-blue-600" />
                }
              </div>
              <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
              <p className="text-gray-600 mb-1">{cert.description}</p>
              <p className="text-sm text-gray-500 mb-4">Sertifika Verilen: {cert.body}</p>
              <p className="text-sm text-gray-500">Geçerlilik Süresi: {cert.expiry}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/sertifikalar" 
            className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-2 px-6 rounded-md transition-colors"
          >
            Tüm Sertifikaları Gör
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CertificationsOverview; 