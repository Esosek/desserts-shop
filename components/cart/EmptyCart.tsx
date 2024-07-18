import Image from "next/image";

import cakeImage from "@/public/assets/images/illustration-empty-cart.svg";

export default function EmptyCart() {
  return (
    <div className="grid gap-4 justify-items-center">
      <Image src={cakeImage} alt="Image of cake" />
      <p className="text-rose-400 font-semibold text-sm">
        Your added items will appear here
      </p>
    </div>
  );
}
