export default function Footer() {
  return (
    <footer className="bg-neutral-100 border-t border-neutral-200 mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-neutral-600">
          <p className="text-sm">© {new Date().getFullYear()} Kleva Handbags. All rights reserved.</p>
          <p className="text-xs mt-2">Buy new and second-hand handbags at affordable prices</p>
        </div>
      </div>
    </footer>
  );
}

