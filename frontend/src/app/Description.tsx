import Image from "next/image";
export default function BookDescription() {
  return (
    <div>
      <Image
        src="murakamiBookCover.jpg"
        alt="book cover"
        width={30}
        height={30}
      />
    </div>
  );
}
