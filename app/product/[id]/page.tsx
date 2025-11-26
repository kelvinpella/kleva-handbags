import { getHandbagById, getSimilarHandbags } from "@/lib/supabase";
import ProductGallery from "@/components/ProductGallery";
import WhatsAppButton from "@/components/WhatsappButton";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";
import { Handbag } from "@/typings";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const handbag = await getHandbagById(params.id);

  if (!handbag) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${handbag.name} - Pochi Store`,
    description: handbag.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const handbag = await getHandbagById(params.id);

  if (!handbag) {
    notFound();
  }

  const similarHandbags = await getSimilarHandbags(
    params.id,
    handbag.condition
  );
  const productUrl = `${
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  }/product/${params.id}`;

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-orange-600">
            Nyumbani
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={
              handbag.condition === "new" ? "/new-handbags" : "/second-hand"
            }
            className="hover:text-orange-600"
          >
            {handbag.condition === "new" ? "Pochi Mpya" : "Pochi za Mtumba"}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 truncate">{handbag.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Gallery */}
          <div>
            <ProductGallery
              images={handbag.images}
              productName={handbag.name}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {handbag.name}
              </h1>
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                {handbag.brand}
              </p>
            </div>

            <div className="flex items-baseline space-x-3">
              <span className="text-4xl font-bold text-gray-900">
                TSh {handbag.price.toLocaleString()}
              </span>
              {handbag.condition === "second-hand" && (
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded text-sm font-medium">
                  Mtumba
                </span>
              )}
            </div>

            {handbag.stock_status === "out_of_stock" && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
                <p className="font-medium">Pochi hii haipatikani kwa sasa</p>
              </div>
            )}

            <div className="border-t border-b border-gray-200 py-6 space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg">
                Maelezo ya Bidhaa
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {handbag.description}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Maelezo ya Kina</h3>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-gray-500">Chapa</dt>
                  <dd className="font-medium text-gray-900">{handbag.brand}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Rangi</dt>
                  <dd className="font-medium text-gray-900">{handbag.color}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Vifaa</dt>
                  <dd className="font-medium text-gray-900">
                    {handbag.material}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">Hali</dt>
                  <dd className="font-medium text-gray-900">
                    {handbag.condition === "new" ? "Mpya" : "Mtumba"}
                  </dd>
                </div>
              </dl>
            </div>

            {handbag.stock_status === "in_stock" && (
              <div className="pt-4">
                <WhatsAppButton
                  phoneNumber={handbag.whatsapp_number}
                  productName={handbag.name}
                  productPrice={handbag.price}
                  productUrl={productUrl}
                />
                <p className="text-xs text-gray-500 text-center mt-3">
                  Bonyeza hapa kuwasiliana nasi kupitia WhatsApp
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products */}
        {similarHandbags && similarHandbags.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Pochi Zinazofanana
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
