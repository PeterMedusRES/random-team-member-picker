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
      <main className="flex w-full flex-col items-center gap-8 px-6 py-8">
        <div className="flex max-w-screen-md flex-col gap-3">
          <h1 className="text-5xl font-bold">Random Team Member Picker</h1>
          <p className="text-2xl font-light">
            The probability of a team member being picked is{" "}
            <em>inversely proportional</em> to the number of times they have
            been picked in the past.
          </p>
        </div>
        <TeamPicker />
      </main>
    </>
  );
}
