import { notFound } from "next/navigation";
import PostDetails from "@components/PostDetails";
import CMS from "@utils/CMS";

const todos = await CMS.get("todos");

export async function generateStaticParams() {
  return todos.map(({ Meta: { URL_slug } }) => ({ slug: URL_slug }));
}

export default function AccommodationPage({ params: { slug }}) {
  const todo =
    todos.find(({ Meta: { URL_slug } }) => URL_slug === slug) ??
    notFound();

  return <PostDetails {...todo} />;
}