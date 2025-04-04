import type { Message } from "./page";

interface CardProps {
  message: Message;
}

export default function Card({ message }: CardProps) {
  return (
    <div className="flex flex-col w-full my-2">
      <div className="flex font-bold">
        <div>@{message.author}</div>
        <div className="font-thin ml-2">{message.date}</div>
      </div>
      <div>{message.message}</div>
      <div>{message.id}</div>
    </div>
  );
}
