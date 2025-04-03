"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [message, setMessage] = useState<string>("default");
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/");
      setMessage(response.data);
      console.log(`the message from the server: ${message}`);
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    fetchData();
  });
  return (
    <div>
      <p className="text-3xl">{message}</p>
    </div>
  );
}
