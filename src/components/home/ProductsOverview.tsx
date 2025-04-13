import Link from 'next/link';
import Image from 'next/image';
import data from '@/data/dummy.json';

const ProductsOverview = () => {
  const { products } = data.home;
  console.log("urunler",products);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ürünlerimiz</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Uluslararası sertifikalara sahip, akaryakıt istasyonları için yüksek kaliteli ürünler sunuyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div key={product.name} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src={product.image || '/images/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <Link 
                  href={product.link} 
                  className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-2 px-6 rounded-md transition-colors"
                  >
                  Ürüne Git
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/urunler" 
            className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-2 px-6 rounded-md transition-colors"
          >
            Tüm Ürünleri Gör
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsOverview; 