import { Status } from "@prisma/client";
import ProgressCard from "./_components/ui/ProgressCard";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <section className="mx-auto mt-10 max-7-xl">
      <h1 className="text-2xl font-semibold text-center md:text-3xl">
        Issue Dashboard
      </h1>
      {session ? (
        <div className="py-10">
          <div className="flex flex-col justify-center gap-4 md:flex-row">
            <ProgressCard status={Status.OPEN} />
            <ProgressCard status={Status.IN_PROGRESS} />
            <ProgressCard status={Status.CLOSED} />
          </div>
        </div>
      ) : (
        <div className="mt-10">
          <span className="text-xl font-semibold text-center">
            You need to be logged in to view this page.
          </span>
        </div>
      )}
    </section>
  );
}
