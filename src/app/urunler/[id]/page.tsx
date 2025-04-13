import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Award, ArrowLeft, Check, X } from 'lucide-react';
import data from '@/data/dummy.json';

type ProductCertification = {
  title: string;
  body: string;
  expiry: string;
  image: string;
};

type Product = {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  gallery?: string[];
  features?: string[];
  slug: string;
  certifications?: ProductCertification[];
};

type ProductPageProps = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Generate static paths for all products at build time
export async function generateStaticParams() {
  // Convert the products object to an array of slug objects for static generation
  return Object.entries(data.products).map(([slug, _]) => ({
    id: slug,
  }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const productData = data.products[params.id as keyof typeof data.products];
  
  if (!productData) {
    return {
      title: 'Ürün Bulunamadı | Canikligas',
      description: 'İstenen ürün bulunamadı',
    };
  }

  return {
    title: `${productData.title} | Canikligas Ürünleri`,
    description: productData.description,
  };
}

export default function ProductPage({ params, searchParams }: ProductPageProps) {
  // Get the product data
  const productData = data.products[params.id as keyof typeof data.products];
  
  if (!productData) {
    notFound();
  }

  // Create a complete product object with the slug
  const product: Product = {
    ...productData,
    slug: params.id,
  };

  // Get the category name
  const categoryName = data.productCategories.find(c => c.id === product.category)?.name || '';
  
  // Get selected image for Server-Side Image Gallery
  const selectedImageIndex = searchParams.image ? parseInt(searchParams.image as string, 10) : 0;
  const validImageIndex = product.gallery && product.gallery.length > 0 ? 
    Math.max(0, Math.min(selectedImageIndex, product.gallery.length - 1)) : 0;
  
  // Check if we're in image view modal mode
  const viewMode = searchParams.view as string | undefined;
  const viewIndex = searchParams.viewIndex ? parseInt(searchParams.viewIndex as string, 10) : 0;
  const isImageViewMode = viewMode === 'image' && product.gallery && viewIndex >= 0 && viewIndex < product.gallery.length;
  const viewingCertificate = viewMode === 'cert' && product.certifications && 
    searchParams.certIndex !== undefined && 
    parseInt(searchParams.certIndex as string, 10) >= 0 && 
    parseInt(searchParams.certIndex as string, 10) < (product.certifications?.length || 0);
  
  const certIndex = viewingCertificate ? parseInt(searchParams.certIndex as string, 10) : -1;
  
  // Get selected certificate for anchor navigation
  const selectedCertIndex = searchParams.cert ? parseInt(searchParams.cert as string, 10) : -1;
  
  // Get recommended products (same category, excluding current product)
  const recommendedProducts = Object.entries(data.products)
    .map(([slug, p]) => ({ ...p, slug }))
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3); // Limit to 3 products

  // Return a modal-like view for images
  if (isImageViewMode) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
        <div className="container mx-auto px-4 h-full flex flex-col">
          {/* Modal Header */}
          <div className="flex justify-between items-center py-4 text-white">
            <h2 className="text-xl font-bold truncate">{product.title}</h2>
            <Link 
              href={`/urunler/${product.slug}${searchParams.image ? `?image=${searchParams.image}#gallery` : ''}`}
              className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
              aria-label="Kapat"
            >
              <X size={24} className="text-white" />
            </Link>
          </div>
          
          {/* Modal Content - Image */}
          <div className="flex-1 relative">
            <Image
              src={product.gallery?.[viewIndex] || '/images/products/product-placeholder.png'}
              alt={`${product.title} - Tam Ekran Görünüm`}
              fill
              className="object-contain"
              priority
              sizes="100vw"
            />
            
            {/* Navigation Controls */}
            {product.gallery && product.gallery.length > 1 && (
              <>
                {/* Previous Button */}
                <Link
                  href={`/urunler/${product.slug}?view=image&viewIndex=${viewIndex > 0 ? viewIndex - 1 : product.gallery.length - 1}`}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
                  aria-label="Önceki"
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
                
                {/* Next Button */}
                <Link
                  href={`/urunler/${product.slug}?view=image&viewIndex=${viewIndex < product.gallery.length - 1 ? viewIndex + 1 : 0}`}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
                  aria-label="Sonraki"
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </>
            )}
          </div>
          
          {/* Modal Footer - Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="py-4">
              <div className="flex justify-center gap-2 overflow-x-auto pb-2">
                {product.gallery.map((img, idx) => (
                  <Link 
                    key={idx} 
                    href={`/urunler/${product.slug}?view=image&viewIndex=${idx}`}
                    className={`relative block w-16 h-16 rounded overflow-hidden border-2 transition-all ${idx === viewIndex ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <Image 
                      src={img} 
                      alt={`${product.title} Küçük Resim ${idx + 1}`} 
                      fill 
                      className="object-cover"
                    />
                  </Link>
                ))}
              </div>
              <div className="text-center text-white mt-2">
                <span className="text-sm font-medium">{viewIndex + 1} / {product.gallery.length}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Return certificate modal view
  if (viewingCertificate && product.certifications && certIndex >= 0) {
    const cert = product.certifications[certIndex];
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
        <div className="container mx-auto px-4 h-full flex flex-col">
          {/* Modal Header */}
          <div className="flex justify-between items-center py-4 text-white">
            <h2 className="text-xl font-bold truncate flex items-center">
              <Award className="mr-2" size={20} />
              {cert.title}
            </h2>
            <Link 
              href={`/urunler/${product.slug}#certificate-${certIndex}`}
              className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
              aria-label="Kapat"
            >
              <X size={24} className="text-white" />
            </Link>
          </div>
          
          {/* Modal Content - Certificate */}
          <div className="flex-1 relative">
            <Image
              src={cert.image}
              alt={`${cert.title} - Tam Ekran Görünüm`}
              fill
              className="object-contain"
              priority
              sizes="100vw"
            />
            
            {/* Navigation Controls */}
            {product.certifications.length > 1 && (
              <>
                {/* Previous Button */}
                <Link
                  href={`/urunler/${product.slug}?view=cert&certIndex=${certIndex > 0 ? certIndex - 1 : product.certifications.length - 1}`}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
                  aria-label="Önceki Sertifika"
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
                
                {/* Next Button */}
                <Link
                  href={`/urunler/${product.slug}?view=cert&certIndex=${certIndex < product.certifications.length - 1 ? certIndex + 1 : 0}`}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
                  aria-label="Sonraki Sertifika"
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </>
            )}
          </div>
          
          {/* Modal Footer - Cert Info */}
          <div className="py-4 bg-white/10 backdrop-blur-sm rounded-t-lg mt-4 px-6">
            <div className="flex flex-col text-white max-w-2xl mx-auto">
              <p className="mb-2"><span className="font-medium">Sertifika veren:</span> {cert.body}</p>
              <p><span className="font-medium">Geçerlilik:</span> {cert.expiry}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Product Hero */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 -mt-16 h-16 " />
      <div className="bg-gray-50 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <Link 
            href="/urunler" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeft className="mr-2" size={16} /> Ürünlere Geri Dön
          </Link>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Main Image with Gallery */}
              <div className="relative">
                {/* Image Gallery */}
                <div className="relative h-[400px] md:h-[500px] bg-gray-100">
                  {/* Main Image */}
                  {product.gallery && product.gallery.length > 0 ? (
                    <Image
                      src={product.gallery[validImageIndex]}
                      alt={`${product.title} - Görsel ${validImageIndex + 1}`}
                      fill
                      className="object-contain"
                      priority
                    />
                  ) : (
                    <Image
                      src={product.image || '/images/products/product-placeholder.png'}
                      alt={product.title}
                      fill
                      className="object-contain"
                      priority
                    />
                  )}
                  
                  {/* Navigation Controls */}
                  {product.gallery && product.gallery.length > 1 && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-1">
                      {product.gallery.map((_, idx) => (
                        <Link
                          key={idx}
                          href={`/urunler/${product.slug}?image=${idx}#gallery`}
                          className={`w-2.5 h-2.5 rounded-full ${idx === validImageIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
                          aria-label={`Resim ${idx + 1}`}
                          scroll={false}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Fullscreen Option - Changed to modal view */}
                  {product.gallery && product.gallery.length > 0 && (
                    <Link
                      href={`/urunler/${product.slug}?view=image&viewIndex=${validImageIndex}`}
                      className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all"
                      aria-label="Büyüt"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <polyline points="9 21 3 21 3 15"></polyline>
                        <line x1="21" y1="3" x2="14" y2="10"></line>
                        <line x1="3" y1="21" x2="10" y2="14"></line>
                      </svg>
                    </Link>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-blue-500/90 text-white px-3 py-1 rounded-md text-sm font-medium">
                      {categoryName}
                    </span>
                  </div>
                </div>
                
                {/* Thumbnail Gallery */}
                {product.gallery && product.gallery.length > 1 && (
                  <div id="gallery" className="grid grid-cols-5 gap-2 p-4 bg-gray-50">
                    {product.gallery.map((img, idx) => (
                      <Link 
                        key={idx} 
                        href={`/urunler/${product.slug}?image=${idx}#gallery`}
                        className={`relative block h-16 rounded overflow-hidden border-2 transition-all ${idx === validImageIndex ? 'border-blue-500 shadow-md' : 'border-transparent hover:border-blue-300'}`}
                        scroll={false}
                      >
                        <Image 
                          src={img} 
                          alt={`${product.title} Görsel ${idx + 1}`} 
                          fill 
                          className="object-cover"
                        />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div className="p-6 md:p-8">
                <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
                <p className="text-gray-700 mb-6">{product.description}</p>
                
                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Özellikler</h2>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Certificates Preview */}
                {product.certifications && product.certifications.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Sertifikalar</h2>
                    <div className="flex space-x-4">
                      {product.certifications.map((cert, idx) => (
                        <Link
                          key={idx}
                          href={`/urunler/${product.slug}#certificate-${idx}`}
                          className="group"
                          scroll={true}
                        >
                          <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group-hover:border-blue-500 transition-all">
                            <Image
                              src={cert.image}
                              alt={cert.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-all"
                            />
                          </div>
                          <p className="text-xs mt-1 text-center text-gray-600 group-hover:text-blue-600 transition-all line-clamp-1">
                            {cert.title}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* CTA Section */}
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <p className="text-gray-700 mb-4">
                    Bu ürün hakkında daha fazla bilgi almak ister misiniz? Hemen bizimle iletişime geçin.
                  </p>
                  <Link 
                    href="/iletisim" 
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    İletişime Geçin
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details & Specs */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Ürün Detayları</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-8">
                Bu ürün, akaryakıt istasyonu endüstrisinde en yüksek kalite standartlarını karşılamak için tasarlanmıştır.
                Ürünlerimiz güvenilirlik, emniyet ve uzun vadeli performans sağlamak için titizlikle test edilmektedir.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold mb-2">Anahtar Özellikler</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Yüksek dayanıklılık malzemeleri</li>
                    <li>Enerji verimli çalışma</li>
                    <li>Güvenlik sertifikalı bileşenler</li>
                    <li>Kolay kurulum</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold mb-2">Teknik Destek</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Profesyonel kurulum hizmeti</li>
                    <li>Düzenli bakım servisi</li>
                    <li>7/24 acil destek</li>
                    <li>Yedek parça bulunabilirliği</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Certificates Section */}
      {product.certifications && product.certifications.length > 0 && (
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Ürün Sertifikaları</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {product.certifications.map((cert, index) => (
                <div key={index} id={`certificate-${index}`} className="bg-white p-5 rounded-lg shadow-md flex flex-col h-full group-hover:shadow-lg transition-all scroll-mt-24">
                  <div className="flex-1 mb-4">
                    <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={cert.image}
                        alt={`${cert.title} Sertifikası`}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-all"
                      />
                      {/* Changed to modal view */}
                      <Link
                        href={`/urunler/${product.slug}?view=cert&certIndex=${index}`}
                        className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all"
                        aria-label="Tam Ekran Görüntüle"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <polyline points="9 21 3 21 3 15"></polyline>
                          <line x1="21" y1="3" x2="14" y2="10"></line>
                          <line x1="3" y1="21" x2="10" y2="14"></line>
                        </svg>
                      </Link>
                    </div>
                    
                    <div className="flex items-start">
                      <Award className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <h3 className="text-lg font-bold mb-1 group-hover:text-blue-600 transition-colors">{cert.title}</h3>
                        <p className="text-gray-600 text-sm mb-1">
                          <span className="font-medium">Sertifika veren:</span> {cert.body}
                        </p>
                        <p className="text-gray-600 text-sm">
                          <span className="font-medium">Geçerlilik:</span> {cert.expiry}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <p className="text-gray-700 text-sm">
                        Bu sertifika, ürünümüzün uluslararası standartlara uygunluğunu ve kalitesini belgelemektedir. 
                        Ürünlerimizin güvenilirliği ve kalitesi için düzenli olarak sertifikalandırma süreçlerinden 
                        geçmekteyiz.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Benzer Ürünler</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {recommendedProducts.map((recProduct) => (
                <Link
                  href={`/urunler/${recProduct.slug}`}
                  key={recProduct.id}
                  className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-60">
                    <Image
                      src={recProduct.image || '/images/products/product-placeholder.png'}
                      alt={recProduct.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-block bg-blue-500/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                        {categoryName}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">{recProduct.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{recProduct.description}</p>
                    
                    {/* Features */}
                    {recProduct.features && (
                      <div className="mb-4">
                        <ul className="text-sm text-gray-600 space-y-1">
                          {recProduct.features.slice(0, 2).map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                              <span className="line-clamp-1">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700 font-medium text-sm group-hover:underline">Detayları Görüntüle</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 