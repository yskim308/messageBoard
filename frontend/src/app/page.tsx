"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

export interface Message {
  id: number;
  author: string;
  date: string;
  message: string;
  votes: number;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/");
      const messageResponse: Message[] = response.data.data;
      setMessages(messageResponse);
      console.log(messageResponse);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col items-center w-3/5">
      <div className="text-3xl">hello?</div>
      {messages.map((message) => {
        return <Card message={message} key={message.id} />;
      })}
    </div>
  );
}
