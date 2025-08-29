import { notFound } from "next/navigation";
import HomeClient from "../components/HomeClient";

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ searchParams }: PageProps) {
  const q = searchParams?.userId;
  const userId = Array.isArray(q) ? q[0] : q;
  if (!userId || typeof userId !== "string") {
    notFound();
  }
  return <HomeClient userId={userId} />;
}
