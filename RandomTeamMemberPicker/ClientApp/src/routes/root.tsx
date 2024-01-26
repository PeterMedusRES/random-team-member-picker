import { TeamPage } from "~/components/TeamPage";
import { ThemeDropdown } from "~/components/ThemeDropdown";

export default function Root() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="flex h-16 items-center px-4">
        <div className="m-auto" />
        <ThemeDropdown />
      </header>
      <main className="flex w-full grow flex-col items-center justify-center p-6">
        <TeamPage />
      </main>
    </div>
  );
}
