import Head from "next/head";
import TeamPicker from "~/components/TeamPicker";

export default function Home() {
  return (
    <>
      <Head>
        <title>Random Team Member Picker</title>
        <meta name="description" content="Randomly choose a team member" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center">
        <div className="container flex flex-col items-center gap-6 py-16">
          <h1 className="text-5xl font-bold">Random Team Member Picker</h1>
          <p className="text-2xl font-light">This is some placeholder text.</p>
          <TeamPicker />
        </div>
      </main>
    </>
  );
}
