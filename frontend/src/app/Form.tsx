import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

interface FormDetails {
  author: string;
  message: string;
}

interface FormProps {
  fetchOnSubmit: () => void;
}

export default function Form({ fetchOnSubmit }: FormProps) {
  const [formDetails, setFormDetails] = useState<FormDetails>({
    author: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const backendBaseUrl: string =
      process.env.NEXT_PUBLIC_EXPRESS_API ?? "http://localhost:4000";
    try {
      await axios.put(`${backendBaseUrl}/submit`, formDetails);
      console.log("form submitted succesfully");
    } catch (error) {
      console.error("uh oh, this are fucked", error);
    } finally {
      setFormDetails({ author: "", message: "" });
      fetchOnSubmit();
    }
  };

  return (
    <div className="shadow-xl px-3 pb-3 rounded-3xl w-full  mb-10">
      <form onSubmit={handleSubmit}>
        <div className="flex-col">
          <div className="mt-2 rounded-3xl p-1 flex">
            <label htmlFor="username" className="ml-1 self-center">
              @:{" "}
            </label>
            <input
              id="username"
              name="username"
              className="p-1 flex-grow font-bold"
              type="text"
              placeholder="username"
              autoComplete="off"
              value={formDetails.author}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFormDetails({ ...formDetails, author: e.target.value });
              }}
              required
            />
          </div>
          <hr />
          <div className="my-2 p-1 rounded-md flex-col">
            <textarea
              className="w-full py-2 px-1 resize-y overflow-y-auto" // Added resize-y and overflow-y-auto
              placeholder="message content"
              name="content"
              id="content"
              autoComplete="off"
              value={formDetails.message}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                // Changed HTMLInputElement to HTMLTextAreaElement
                setFormDetails({ ...formDetails, message: e.target.value });
              }}
              required
              rows={1} // Start with one row
              onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />
            <div className="flex justify-end">
              <button type="submit" className="mx-3">
                submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
