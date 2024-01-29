"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [data, setData] = useState("");

  async function handleSubmit() {
    try {
      const res = await fetch("/api/screenshot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-center">Hello World</h1>
        <Input
          type="text"
          placeholder="Type something"
          onChange={(e) => setData(e.target.value)}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
}
