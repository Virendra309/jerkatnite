import type { Metadata, Viewport } from "next";
import { Anton, Manrope } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { OrderProvider } from "@/components/order";
import { days, images, locations, site } from "@/data/site";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
// Stand-in for the "Thunder" display font used on the current site.
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Award-Winning Caribbean & Jamaican Food | Jerk at Nite", template: "%s | Jerk at Nite" },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, images: [{ url: images.catering, alt: "Jerk at Nite catering" }] },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#07130a" };

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  url: site.url,
  telephone: site.phone,
  servesCuisine: ["Jamaican", "Caribbean"],
  logo: images.logo,
  department: locations
    .filter((l) => l.address && l.hours)
    .map((l) => ({
      "@type": "Restaurant",
      name: `${site.name} ${l.city}`,
      address: l.address,
      openingHours: l.hours!.flatMap((h, i) => (h ? [`${days[i].slice(0, 2)} ${h}`] : [])),
    })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${anton.variable} antialiased`}>
      <body className="flex min-h-screen flex-col font-sans">
        <a href="#main" className="sr-only z-50 rounded bg-gold px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <OrderProvider>
          <Header />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
        </OrderProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }} />
      </body>
    </html>
  );
}
