import { Fragment } from "react";

type SocialLinksProps = {
  className?: string;
  linkClassName?: string;
  iconClassName?: string;
};

const links = [
  {
    label: "WhatsApp",
    href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@pochi_kali_kariakoo",
  },
  // {
  //   label: "Instagram",
  //   href: "https://www.instagram.com/klevahandbags",
  // },
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
            ) : link.label === "Instagram" ? (
              <InstagramIcon className={iconClassName} />
            ) : (
              <WhatsAppIcon className={iconClassName} />
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

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
