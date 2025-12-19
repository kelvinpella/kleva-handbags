import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-600 mt-2">Welcome to your admin dashboard</p>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-neutral-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/products/add"
            className="flex items-center space-x-4 p-4 border border-neutral-200 rounded-lg hover:border-neutral-900 hover:bg-neutral-50 transition-colors"
          >
            <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-neutral-900">Add New Product</p>
              <p className="text-sm text-neutral-600">Create a new handbag listing</p>
            </div>
          </Link>

          <Link
            href="/admin/products"
            className="flex items-center space-x-4 p-4 border border-neutral-200 rounded-lg hover:border-neutral-900 hover:bg-neutral-50 transition-colors"
          >
            <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-neutral-900">Manage Products</p>
              <p className="text-sm text-neutral-600">View and edit existing products</p>
            </div>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="flex items-center space-x-4 p-4 border border-neutral-200 rounded-lg hover:border-neutral-900 hover:bg-neutral-50 transition-colors"
          >
            <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-neutral-900">View Store</p>
              <p className="text-sm text-neutral-600">See how your store looks</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}