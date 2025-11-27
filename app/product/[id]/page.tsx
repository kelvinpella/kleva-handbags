import { getHandbagById, getSimilarHandbags } from '@/lib/supabase';
import ProductGallery from '@/components/ProductGallery';
import WhatsAppButton from '@/components/WhatsappButton';
import ProductCard from '@/components/ProductCard';
import { notFound } from 'next/navigation';
    import { Handbag } from '@/typings';
import Link from 'next/link';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const handbag = await getHandbagById(resolvedParams.id);

  if (!handbag) {
    return {
      title: 'Product Not Found - Pochi Store',
    };
  }

  return {
    title: `${handbag.name} - Pochi Store`,
    description: handbag.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const handbag = await getHandbagById(resolvedParams.id);

  if (!handbag) {
    console.log('Handbag not found, showing 404');
    notFound();
  }

  const similarHandbags = await getSimilarHandbags(resolvedParams.id, handbag.condition);
  const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/product/${resolvedParams.id}`;

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-neutral-200">
        <nav className="flex text-xs text-neutral-600 flex-wrap items-center">
          <Link href="/" className="hover:text-neutral-900 transition-colors">
            Nyumbani
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={handbag.condition === 'new' ? '/new-handbags' : '/second-hand'}
            className="hover:text-neutral-900 transition-colors"
          >
            {handbag.condition === 'new' ? 'Pochi Mpya' : 'Pochi za Mtumba'}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-900 truncate max-w-[200px] md:max-w-none">
            {handbag.name}
          </span>
        </nav>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={handbag.images} productName={handbag.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand and Badges */}
            <div className="flex items-center justify-between">
              <p className="text-xs text-neutral-600 uppercase tracking-wide font-bold">
                {handbag.brand}
              </p>
              {handbag.condition === 'second-hand' && (
                <span className="bg-neutral-900 text-white px-3 py-1 text-xs font-bold">
                  MTUMBA
                </span>
              )}
            </div>

            {/* Product Name */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">
                {handbag.name}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-bold text-red-600">
                TSh {handbag.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {/* Stock Status */}
            {handbag.stock_status === 'out_of_stock' && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm">
                <p className="font-medium">Pochi hii haipatikani kwa sasa</p>
              </div>
            )}

            {/* Description */}
            <div className="border-t border-neutral-200 pt-6">
              <p className="text-neutral-700 text-sm leading-relaxed">
                {handbag.description}
              </p>
            </div>

            {/* Product Details */}
            <div className="border-t border-neutral-200 pt-6 space-y-3">
              <h3 className="font-bold text-neutral-900 text-sm uppercase tracking-wide">
                Maelezo ya Kina
              </h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <dt className="text-neutral-600">Chapa</dt>
                  <dd className="font-medium text-neutral-900">{handbag.brand}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <dt className="text-neutral-600">Rangi</dt>
                  <dd className="font-medium text-neutral-900">{handbag.color}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <dt className="text-neutral-600">Vifaa</dt>
                  <dd className="font-medium text-neutral-900">{handbag.material}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <dt className="text-neutral-600">Hali</dt>
                  <dd className="font-medium text-neutral-900">
                    {handbag.condition === 'new' ? 'Mpya' : 'Mtumba'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* WhatsApp Button */}
            {handbag.stock_status === 'in_stock' && (
              <div className="border-t border-neutral-200 pt-6">
                <WhatsAppButton
                  phoneNumber={handbag.whatsapp_number}
                  productName={handbag.name}
                  productPrice={handbag.price}
                  productUrl={productUrl}
                />
                <p className="text-xs text-neutral-600 text-center mt-3">
                  Bonyeza hapa kuwasiliana nasi kupitia WhatsApp
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products */}
        {similarHandbags && similarHandbags.length > 0 && (
          <div className="mt-16 border-t border-neutral-200 pt-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-8">
              Pochi Zinazofanana
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
              {similarHandbags.map((item) => (
                <ProductCard key={item.id} handbag={item as Handbag} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}