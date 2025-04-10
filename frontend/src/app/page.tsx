"use client";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import Form from "./Form";
import BookDescription from "./Description";
import Image from "next/image";

export interface Message {
  id: number;
  author: string;
  date: string;
  message: string;
  votes: number;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"date" | "vote">("date");
  const [loading, setLoading] = useState<boolean>(true);

  const backendBaseUrl: string =
    process.env.NEXT_PUBLIC_EXPRESS_API ?? "http://localhost:4000";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/?orderBy=${sortBy}`,
        );
        const messageResponse: Message[] = response.data.data;
        setLoading(false);
        setMessages(messageResponse);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.log(e.message);
        } else {
          console.log("unknown error");
        }
      }
    };
    fetchData();
  }, [reload, sortBy, backendBaseUrl]);

  const reloadOnSubmit = useCallback(() => {
    setReload((prev: boolean) => !prev);
  }, []);

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as "date" | "vote");
  };

  return (
    <div className="flex flex-col items-center md:w-3/5">
      <BookDescription />
      <hr className="w-full" />
      <h1 className="mt-10">Comments</h1>
      <Form fetchOnSubmit={reloadOnSubmit} />
      <div>
        <label htmlFor="sortBy" className="mr-2">
          order by:
        </label>
        <select
          name="sortBy"
          id="sortBy"
          value={sortBy}
          onChange={handleSortByChange}
          className="font-bold"
        >
          <option value="date">date</option>
          <option value="vote">vote</option>
        </select>
      </div>
      <div className={`${loading ? "" : "hidden"} flex flex-col items-center`}>
        <Image
          src="/loading.gif"
          alt="loading"
          width={20}
          height={20}
          className="w-12 my-5 flex justify-center"
        />
        <div className="flex justify-center p-5">
          <p className="text-sm font-thin">
            Comments are loading. It may take up to 50 seconds. The backend is
            hosted on a free instance that spins down after inactivity
          </p>
        </div>
      </div>
      <div
        className={`h-screen overflow-scroll flex flex-col items-center ${loading ? "hidden" : ""}}`}
      >
        {messages.map((message) => {
          return <Card message={message} key={message.id} />;
        })}
      </div>
    </div>
  );
}
