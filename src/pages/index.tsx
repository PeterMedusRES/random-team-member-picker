import Head from "next/head";
import TeamPie from "~/components/TeamPie";
import { api } from "~/utils/api";

export default function Home() {
  const { data: team } = api.teams.getById.useQuery("uno-data");

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
          <div className="aspect-square w-1/4">
            {team ? <TeamPie team={team} /> : <span>Loading...</span>}
          </div>
        </div>
      </main>
    </>
  );
}
