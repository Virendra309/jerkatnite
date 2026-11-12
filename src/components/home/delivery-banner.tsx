import Image from "next/image";
import { OrderButton } from "@/components/order";

/** "Get some jerk delivered to your door!" gradient banner with phone mockups. */
export function DeliveryBanner() {
  return (
    <section className="bg-black py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#f2dd0a] via-[#b8d221] to-[#55bd4b] px-6 pt-8 text-black sm:px-8 lg:pb-0 lg:pr-0">
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_1.05fr]">
            <div className="pb-8">
              <div className="flex gap-2" aria-label="DoorDash, Uber Eats and Toast">
                <span className="grid size-10 place-items-center rounded-lg bg-[#FF3008] text-[6px] font-black tracking-tight text-white">DOORDASH</span>
                <span className="grid size-10 place-items-center rounded-lg bg-black text-center text-[10px] font-semibold leading-[1.05] text-white">
                  <span>
                    Uber
                    <br />
                    <span className="text-[#06C167]">Eats</span>
                  </span>
                </span>
                <span className="grid size-10 place-items-center rounded-lg bg-[#FF4C00]">
                  <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="white" strokeWidth="2.2" strokeLinejoin="round" aria-hidden>
                    <path d="M6 20V11a4 4 0 0 1-1-7h14a4 4 0 0 1-1 7v9z" />
                  </svg>
                </span>
              </div>
              <h2 className="display mt-5 text-4xl leading-[0.95] sm:text-6xl">
                Get Some Jerk
                <br />
                Delivered to Your
                <br />
                Door!
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed">
                Order from the Baltimore HQ through DoorDash or Uber Eats. Fresh Jamaican flavors made to order and delivered straight to you,
                hot and ready whenever you are craving it.
              </p>
              <OrderButton className="mt-6 !rounded-[4px] !bg-none !bg-black px-5 py-3 font-semibold !text-[#c6f135] !shadow-none hover:!bg-[#1a1a1a]">
                Place Your Order Now
              </OrderButton>
            </div>
            {/* mockups cut from the live site; left edge fades into the gradient */}
            <Image
              src="/images/locations/delivery-phones.jpg"
              alt="Jerk at Nite on Grubhub, Uber Eats and Toast apps"
              width={740}
              height={576}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="mx-auto h-auto w-full max-w-[560px] [mask-image:linear-gradient(to_right,transparent,black_12%)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
