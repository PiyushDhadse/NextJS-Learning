// "use client";
import Image from "next/image";

export default function Home() {
  console.log("ID:", process.env.NEXT_PUBLIC_ID);
  console.log("PASSWORD:", process.env.NEXT_PUBLIC_PASSWORD);
  return (
    <div className="container">
      this is the home page The id and password is {process.env.NEXT_PUBLIC_ID}{" "}
      and {process.env.NEXT_PUBLIC_PASSWORD}
    </div>
  );
}
