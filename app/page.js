"use-client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full flex justify-center items-center gap-5">
          <h1 className="text-5xl font-semibold">POC Demo</h1>
        </div>
        <div className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <h1 className="mb-2">* Get started Logging in to your account.</h1>
          <h1>
            * Fetch userid and authToken after logging in to the dashboard.
          </h1>
        </div>

        <div className="w-full flex gap-4 justify-center items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-white transition-colors flex items-center justify-center hover:bg-white hover:text-black hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/login"
          >
            Login
          </Link>
        </div>
      </main>
    </div>
  );
}
