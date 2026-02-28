import LiveUpperRow from "@/components/Live/LiveUpperRow";
import { getLatestHandbags } from "@/lib/actions";

export default async function LivePage() {
  const handbags = await getLatestHandbags();

  return (
    <main className="min-h-screen bg-neutral-950 flex items-center justify-center p-6">
      <LiveUpperRow initialHandbags={handbags} />
    </main>
  );
}