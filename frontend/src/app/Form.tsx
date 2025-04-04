import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

interface FormDetails {
  author: string;
  message: string;
}

export default function Form() {
  const [formDetails, setFormDetails] = useState<FormDetails>({
    author: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      axios.put("http:locahost:4000/", formDetails);
      console.log("form submitted succesfully");
    } catch (error) {
      console.error("uh oh, this are fucked", error);
    } finally {
      setFormDetails({ author: "", message: "" });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex-col">
          <div>
            <label htmlFor="username">@: </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="username"
              autoComplete="off"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFormDetails({ ...formDetails, author: e.target.value });
              }}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="message content"
              name="content"
              id="content"
              autoComplete="off"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFormDetails({ ...formDetails, message: e.target.value });
              }}
              required
            />
          </div>
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
