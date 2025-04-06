import Image from "next/image";
export default function BookDescription() {
  const text: string = `
    When the familiar strains of the Beatles' "Norwegian Wood" drift through
    the air, Toru Watanabe is instantly transported back to his formative
    student days in Tokyo. It was a time imbued with both vibrant idealism
    and the deep ache of loss, a period indelibly marked by the absence of
    his closest friend. Haunted by the lingering memory of his first love,
    the fragile and enigmatic Naoko, Toru finds himself unexpectedly drawn
    to her equally captivating yet strikingly different friend, Midori. As
    he navigates the tumultuous landscape of grief, burgeoning desire, and
    the fundamental human need for belonging, Toru's journey becomes a
    poignant and unforgettable exploration of the enduring impact of the
    past on the present
    `;
  return (
    <div className="mt-10">
      <div className="flex justify-center">
        <Image
          src="/book.jpg"
          alt="book cover"
          width={100}
          height={100}
          className="w-48"
        />
      </div>
      <div className="flex flex-col items-center my-3">
        <div className="font-bold text-3xl">Norwegian Wood</div>
        <div className="font-medium">Haruki Muarkami</div>
      </div>
      <div className="font-thin my-3 px-5 text-sm md:text-lg">{text}</div>
    </div>
  );
}
