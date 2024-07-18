import EmptyCart from "./EmptyCart";

export default function Cart() {
  return (
    <div className=" bg-white my-4 px-6 pb-10 min-w-80 rounded-md md:my-0">
      <h2 className="justify-self-start text-red text-lg font-bold my-6">
        Your Cart (0)
      </h2>
      <EmptyCart />
    </div>
  );
}
