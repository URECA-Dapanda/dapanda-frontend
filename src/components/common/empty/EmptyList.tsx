import Image from "next/image";

export default function EmptyList() {
  return (
    <div className="w-full lg:w-[600px] my-auto">
      <Image src={"/EmptyPanda.png"} width={375} height={0} alt="List is Empty" />
    </div>
  );
}
