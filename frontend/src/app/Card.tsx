import type { Message } from "./page";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

interface CardProps {
  message: Message;
}

function dateToString(date: string): string {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return dateObj.toLocaleDateString("en-US", options);
}

async function handleVote(isUp: boolean, id: number) {
  try {
    await axios.post("http://localhost:4000/vote", { isUp, id });
  } catch (e: unknown) {
    console.log("post request for upvote failed:");
    console.log(e);
  }
}

export default function Card({ message }: CardProps) {
  const [votes, setVotes] = useState<number>(0);
  useEffect(() => {
    setVotes(message.votes);
  }, [message]);

  return (
    <div className="flex flex-col w-full hover:bg-gray-100 px-3 py-6 rounded-xl">
      <div className="flex">
        <div className="font-bold font-mono">@{message.author}</div>
        <div className="font-thin ml-2 text-sm flex items-center">
          {dateToString(message.date)}
        </div>
      </div>
      <div>{message.message}</div>
      <div className="flex mt-2">
        <button
          onClick={() => {
            setVotes((prev) => prev + 1);
            handleVote(true, message.id);
          }}
        >
          <Image src="upvote.svg" alt="up" width={20} height={20} />
        </button>
        <div className="text-sm mx-1">{votes}</div>
        <button
          onClick={() => {
            setVotes((prev) => prev - 1);
            handleVote(false, message.id);
          }}
        >
          <Image src="downvote.svg" alt="down" width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
