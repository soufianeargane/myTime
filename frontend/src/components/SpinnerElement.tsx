import { Spinner } from "@nextui-org/react";

export default function SpinnerElement() {
  return (
    <div className="flex justify-center items-center h-screen w-full fixed top-0 left-0 z-50 bg-gray-500 bg-opacity-25 overflow-hidden">
      <Spinner />
    </div>
  );
}
