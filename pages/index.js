import Head from "next/head";
import HomePage from "../components/Home";
export default function Home() {
  return (
    <div className="min-h-[70vh]">
      <Head>
        <title>SNIPV - Bankboks for kildekode, maskinkode eller tekst.</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="">
        <HomePage />
      </div>
    </div>
  );
}
