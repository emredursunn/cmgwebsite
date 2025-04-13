import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import data from '@/data/dummy.json';

// SEO metadata
export const metadata: Metadata = {
  title: 'Ürünlerimiz | Canikligas',
  description: 'Akaryakıt istasyonları için yüksek kaliteli ürün ve ekipmanlar',
};

// SEO friendly Turkish slugs for categories
const categoryToSlug: Record<string, string> = {
  'fuel-dispensers': 'akaryakit-pompalari',
  'storage-tanks': 'depolama-tanklari',
  'automation-systems': 'otomasyon-sistemleri',
  'spare-parts': 'yedek-parcalar',
  'safety-equipment': 'guvenlik-ekipmanlari'
};

// Reverse mapping to get categoryId from URL slug
const slugToCategory: Record<string, string> = Object.entries(categoryToSlug)
  .reduce((acc, [key, value]) => ({...acc, [value]: key}), {});

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Get the category and search terms from URL parameters
  const categorySlug = searchParams.kategori as string | undefined;
  const categoryParam = categorySlug ? slugToCategory[categorySlug] : undefined;
  const searchTerm = searchParams.arama as string | undefined;
  
  // Parse the products data
  const allProducts = Object.entries(data.products).map(([slug, product]) => ({
    slug,
    ...product,
  }));

  // Filter products based on category and search parameters
  const filteredProducts = allProducts.filter(product => {
    // Category filter
    if (categoryParam && product.category !== categoryParam) {
      return false;
    }
    
    // Search term filter
    if (searchTerm && searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      return (
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        (product.features && 
          product.features.some(feature => 
            feature.toLowerCase().includes(searchLower)
          ))
      );
    }
    
    return true;
  });

  const categories = data.productCategories;
  
  // Determine the active category name for display
  const activeCategoryName = categoryParam 
    ? categories.find(c => c.id === categoryParam)?.name || 'Kategori'
    : 'Tüm Ürünler';
  
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20 md:py-28 -mt-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/images/products/product-2.png" 
            alt="İletişim" 
            fill 
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Ürünlerimiz</h1>
            <p className="text-xl max-w-3xl mb-8 text-blue-100 animate-fade-in-delayed">
            Akaryakıt istasyonları için uluslararası sertifikalara sahip yüksek kaliteli ürünler sunuyoruz.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Categories */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-lg font-bold mb-4 text-gray-800">Kategoriler</h2>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href="/urunler"
                      className={`block w-full text-left py-2 px-3 rounded-md transition ${!categoryParam ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      Tüm Ürünler
                    </Link>
                  </li>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link 
                        href={`/urunler?kategori=${categoryToSlug[category.id]}`}
                        className={`block w-full text-left py-2 px-3 rounded-md transition ${categoryParam === category.id ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              {/* Search Form */}
              <form action="/urunler" method="GET" className="mb-8">
                <div className="relative max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="arama"
                    defaultValue={searchTerm || ''}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ürün ara..."
                  />
                  {categorySlug && (
                    <input type="hidden" name="kategori" value={categorySlug} />
                  )}
                  <button type="submit" className="sr-only">Ara</button>
                </div>
              </form>
              
              {/* Category Title */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {activeCategoryName}
                </h2>
                <p className="text-gray-600 mt-1">
                  {filteredProducts.length} ürün bulundu
                  {searchTerm && (
                    <span className="ml-1">
                      &quot;{searchTerm}&quot; araması için
                    </span>
                  )}
                </p>
              </div>
              
              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <Link
                      href={`/urunler/${product.slug}`}
                      key={product.id}
                      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative h-60">
                        <Image
                          src={product.image || '/images/placeholder.jpg'}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Category Badge */}
                        <div className="absolute top-3 right-3">
                          <span className="inline-block bg-blue-500/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                            {categories.find(c => c.id === product.category)?.name || ''}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">{product.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                        
                        {/* Features */}
                        {product.features && (
                          <div className="mb-4">
                            <ul className="text-sm text-gray-600 space-y-1">
                              {product.features.slice(0, 2).map((feature, index) => (
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
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="text-gray-500 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-xl font-medium mb-2">Sonuç Bulunamadı</h3>
                      <p>Arama kriterlerinize uygun ürün bulunamadı.</p>
                    </div>
                    <Link href="/urunler" className="text-blue-600 hover:underline font-medium">
                      Tüm ürünleri görüntüle
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 