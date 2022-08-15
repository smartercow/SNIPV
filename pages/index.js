import Head from "next/head";
import { Button } from "@nextui-org/react";
import Feed from "../components/Home/Feed";
import HomePage from "../components/Home";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Kode Bankboks</title>
        <meta name="description" content="Created by Peter G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <HomePage />
      </main>
    </div>
  );
}
