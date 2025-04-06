"use client";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import Form from "./Form";
import BookDescription from "./Description";

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
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/");
      const messageResponse: Message[] = response.data.data;
      setMessages(messageResponse);
      console.log(messageResponse);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      } else {
        console.log("unknown error");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [reload]);

  const reloadOnSubmit = useCallback(() => {
    setReload((prev: boolean) => !prev);
  }, []);

  return (
    <div className="flex flex-col items-center md:w-3/5">
      <BookDescription />
      <hr className="w-full" />
      <h1 className="mt-10">Comments</h1>
      <Form fetchOnSubmit={reloadOnSubmit} />
      <div className="h-screen overflow-scroll flex flex-col items-center">
        {messages.map((message) => {
          return <Card message={message} key={message.id} />;
        })}
      </div>
    </div>
  );
}
