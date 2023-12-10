import { Status } from "@prisma/client";
import ProgressCard from "./_components/ui/ProgressCard";

export default function Home() {
  return (
    <section className="mx-auto mt-10 max-7-xl">
      <h1 className="text-2xl font-semibold text-center md:text-3xl">Issue Dashboard</h1>
      <div className="py-10">
        <div className="flex flex-col justify-center gap-4 md:flex-row">
          <ProgressCard status={Status.OPEN} />
          <ProgressCard status={Status.IN_PROGRESS} />
          <ProgressCard status={Status.CLOSED} />
        </div>
      </div>

    </section>
  );
}
