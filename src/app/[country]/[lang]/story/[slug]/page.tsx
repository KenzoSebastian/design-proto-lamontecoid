import Story from "@/views/Story";
import { stories } from "@/data/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export default function Page() {
  return <Story />;
}
