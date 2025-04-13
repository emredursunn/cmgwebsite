import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found | Fuel Station',
  description: 'The page you are looking for does not exist',
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center p-8">
        <h1 className="text-6xl font-bold text-blue-700 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
} 