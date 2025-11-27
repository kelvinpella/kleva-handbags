import { Fragment } from "react";

type SocialLinksProps = {
  className?: string;
  linkClassName?: string;
  iconClassName?: string;
};

const links = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@klevahandbags",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/klevahandbags",
  },
];

export default function SocialLinks({
  className = "",
  linkClassName = "",
  iconClassName = "h-4 w-4",
}: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {links.map((link) => (
        <Fragment key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center gap-1 transition-colors ${linkClassName}`}
            aria-label={`Visit Kleva Handbags on ${link.label}`}
          >
            {link.label === "TikTok" ? (
              <TikTokIcon className={iconClassName} />
            ) : (
              <InstagramIcon className={iconClassName} />
            )}
            <span>{link.label}</span>
          </a>
        </Fragment>
      ))}
    </div>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <path d="M21 7.3c-1.5 0-3-.5-4.3-1.3v8c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6v3.3c-1.5 0-2.7 1.2-2.7 2.7S9.2 16.7 10.7 16.7 13.3 15.5 13.3 14V2h3c.2 1.6 1.4 2.9 3 3.2v2.1h1.7V7.3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <path d="M7 3h10c2.2 0 4 1.8 4 4v10c0 2.2-1.8 4-4 4H7c-2.2 0-4-1.8-4-4V7c0-2.2 1.8-4 4-4zm0 2c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2H7zm5 3.5A4.5 4.5 0 1 1 7.5 13 4.5 4.5 0 0 1 12 8.5zm0 2A2.5 2.5 0 1 0 14.5 13 2.5 2.5 0 0 0 12 10.5zm5.2-3.8a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
    </svg>
  );
}

