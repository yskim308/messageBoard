"use client";
import { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      {messages.map((message) => {
        return (
          <div key={message.id}>
            <div>{message.author}</div>
            <div>{message.date}</div>
            <div>{message.message}</div>
          </div>
        );
      })}
    </div>
  );
}
