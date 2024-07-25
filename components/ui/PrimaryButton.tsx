import { ReactNode } from "react";

type PrimaryButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

export default function PrimaryButton({
  children,
  onClick,
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 w-full text-rose-50 rounded-full p-3 my-6 shadow-md hover:bg-red-700 transition-colors duration-100"
    >
      {children}
    </button>
  );
}
