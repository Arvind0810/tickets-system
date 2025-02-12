import Image from "next/image";
import styles from "./page.module.css";
import Head from "next/head";

export const metadata = {
  title: "Ticketing Tools App"
}

export default function Home() {
  return (
    <>
      <h1 className="text-center font-bold text-white my-6 text-4xl">Tickting Service</h1>
    </>
  );
}
