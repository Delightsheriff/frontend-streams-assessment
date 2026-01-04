import { Bricolage_Grotesque } from "next/font/google";
import Link from "next/link";
const BricolageGrotesque = Bricolage_Grotesque({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-brico",
});

export default function Home() {
  return (
    <div
      className={`${BricolageGrotesque.className} flex min-h-screen items-center justify-center bg-white dark:bg-black`}
    >
      <main className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="bg-linear-to-r from-[#625AFA] to-[#272464] bg-clip-text text-4xl font-semibold text-transparent md:text-5xl lg:text-6xl">
            Stream
          </h1>
        </div>

        <Link
          href="/dashboard/streams"
          className="group relative flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-[#625AFA]"
        >
          View Stream
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </main>
    </div>
  );
}
