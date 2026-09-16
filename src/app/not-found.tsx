import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <p className="label-caps text-muted">404</p>
      <p className="font-editorial font-light text-4xl md:text-5xl mt-6">
        Looks like this piece has moved on.
      </p>
      <Link href="/" className="label-caps link-underline inline-block mt-8">
        EXPLORE NEW COLLECTION
      </Link>
    </main>
  );
}
