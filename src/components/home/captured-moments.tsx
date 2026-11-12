import Image from "next/image";
import { OrderButton } from "@/components/order";
import { images } from "@/data/site";

/** Photo tile whose caption appears over a blurred layer on hover (always visible on touch screens). */
function Tile({ src, alt, caption, className = "", contain = false }: { src: string; alt: string; caption: React.ReactNode; className?: string; contain?: boolean }) {
  return (
    <div className={`group relative isolate min-h-64 overflow-hidden rounded-xl ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className={`-z-10 transition-transform duration-700 ease-out group-hover:scale-105 ${contain ? "object-contain object-bottom" : "object-cover"}`}
      />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5 transition-opacity duration-500 lg:items-center lg:justify-center lg:bg-black/45 lg:p-8 lg:text-center lg:opacity-0 lg:backdrop-blur-sm lg:group-hover:opacity-100">
        <p className="display max-w-sm text-2xl leading-tight lg:translate-y-3 lg:text-3xl lg:transition-transform lg:duration-500 lg:group-hover:translate-y-0">{caption}</p>
      </div>
    </div>
  );
}

export function CapturedMoments() {
  return (
    <section className="bg-gradient-to-b from-[#1c5a24] via-[#0e2e13] to-black py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="display text-5xl sm:text-7xl">
            <span className="text-gradient block">Captured Moments</span>
            <span className="block">of Flavor &amp; Culture</span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-white/85">
            Dive into the sights of authentic Caribbean &amp; Jamaican cuisine, vibrant energy, and the memories created every night.
          </p>
        </div>

        {/* bento grid */}
        <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_1.35fr_0.85fr] lg:grid-rows-[300px_300px]">
          <Tile
            src={images.wings}
            alt="Jerk chicken wings"
            caption={
              <>
                Explore <span className="text-gradient">signature food dishes</span> direct from Jamaica
              </>
            }
          />
          <Tile
            src={images.restaurant}
            alt="Inside a Jerk at Nite restaurant"
            caption={
              <>
                Special chefs have <span className="text-gradient">12+ years</span> of professional <span className="text-gradient">experience</span>
              </>
            }
          />
          <Tile
            src={images.instagramPhone}
            alt="Jerk at Nite Instagram profile on a phone"
            contain
            className="bg-gradient-to-br from-[#4b6b3a] to-[#1a2a14]"
            caption={
              <>
                Our strong <span className="text-gradient">social media presence</span>
              </>
            }
          />

          <div className="grid gap-4 lg:col-span-3 lg:grid-cols-2">
            {/* QR card */}
            <div className="flex flex-col items-center gap-6 rounded-xl border border-white/10 bg-gradient-to-br from-[#163d1b] to-black p-6 sm:flex-row sm:p-8">
              <Image src={images.qr} alt="QR code to the Jerk at Nite menu" width={165} height={166} className="size-36 shrink-0 rounded-md bg-white p-1.5 sm:size-40" />
              <div>
                <h3 className="display text-3xl leading-tight sm:text-4xl">
                  <span className="text-gradient">Scan QR code</span> and order your favorite food now!
                </h3>
                <p className="mt-3 text-white/80">Enjoy a Diverse Menu Featuring Flavorful Jamaican and Caribbean Dishes</p>
                <OrderButton className="mt-5 rounded-[4px] px-5 py-2.5 font-semibold shadow-none">Order Now</OrderButton>
              </div>
            </div>
            <Tile
              src={images.catering3}
              alt="Plated Jamaican dish"
              caption={
                <>
                  Behind the scenes at <span className="text-gradient">Jerkatnite</span>
                </>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
