import Image from "next/image";
import { OrderButton } from "@/components/order";

const apps = [
  { src: "/images/locations/icon-doordash.png", alt: "DoorDash" },
  { src: "/images/locations/icon-ubereats.png", alt: "Uber Eats" },
  { src: "/images/locations/icon-toast.png", alt: "Toast" },
];

/** "Get some jerk delivered to your door!" gradient banner with phone mockups (sized like the live site). */
export function DeliveryBanner() {
  return (
    <section className="bg-black px-4 py-12 sm:px-8 lg:px-14">
      <div className="relative mx-auto max-w-[1520px] overflow-hidden rounded-3xl bg-gradient-to-r from-[#f5dc05] via-[#9cc127] to-[#3daa4a] text-black lg:min-h-[clamp(480px,37vw,600px)]">
        <div className="relative z-10 px-6 pb-8 pt-10 sm:px-10 lg:max-w-[52%] lg:py-12 lg:pl-10">
          <div className="flex gap-4">
            {apps.map((a) => (
              <Image key={a.alt} src={a.src} alt={a.alt} width={52} height={52} className="size-12 rounded-xl lg:size-[52px]" />
            ))}
          </div>
          <h2 className="display mt-6 text-5xl leading-[1.05] sm:text-6xl lg:text-[clamp(3.5rem,5.3vw,86px)] lg:leading-[1.1]">
            Get Some Jerk
            <br />
            Delivered to Your
            <br />
            Door!
          </h2>
          <p className="mt-3 max-w-[720px] text-lg leading-relaxed lg:text-[clamp(17px,1.45vw,23px)] lg:leading-[1.6]">
            Order from the Baltimore HQ through DoorDash or Uber Eats. Fresh Jamaican flavors made to order and delivered straight to you, hot
            and ready whenever you are craving it.
          </p>
          <OrderButton className="mt-7 !rounded-md !bg-none !bg-black px-6 py-4 text-lg font-semibold !text-[#c6f135] !shadow-none hover:!bg-[#1a1a1a] lg:text-[22px]">
            Place Your Order Now
          </OrderButton>
        </div>

        {/* phone mockups from the live site, anchored bottom-right; left and top edges fade into the gradient */}
        <Image
          src="/images/locations/delivery-phones.jpg"
          alt="Jerk at Nite on Grubhub, Uber Eats and Toast apps"
          width={760}
          height={582}
          sizes="(min-width: 1024px) 49vw, 100vw"
          className="mx-auto block h-auto w-full max-w-[640px] [-webkit-mask-composite:source-in] [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_12%),linear-gradient(to_bottom,transparent,black_14%)] lg:absolute lg:bottom-0 lg:right-0 lg:mx-0 lg:w-[49%] lg:max-w-none"
        />
      </div>
    </section>
  );
}
