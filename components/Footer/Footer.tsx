import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  return (
    <footer className="bg-neutral-100 border-t border-neutral-200 mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-neutral-600 space-y-3">
          <p className="text-sm">© {new Date().getFullYear()} Kleva Handbags. All rights reserved.</p>
          <p className="text-xs">Buy new and second-hand handbags at affordable prices</p>
          <div className="flex justify-center gap-4 text-xs">
            <Link
              href="/terms"
              className="text-neutral-600 hover:text-neutral-900 underline transition-colors"
            >
              Terms of Service
            </Link>
            <span className="text-neutral-400">•</span>
            <Link
              href="/privacy"
              className="text-neutral-600 hover:text-neutral-900 underline transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
          <SocialLinks
            className="justify-center text-sm text-neutral-600"
            linkClassName="text-neutral-600 hover:text-neutral-800"
            iconClassName="h-4 w-4 fill-current"
          />
        </div>
      </div>
    </footer>
  );
}

