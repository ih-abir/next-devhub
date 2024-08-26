import { notFound } from "next/navigation";
import PostDetails from "@components/PostDetails";
import CMS from "@utils/CMS";

const accommodations = await CMS.get("accommodations");

export async function generateStaticParams() {
  return accommodations.map(({ Meta: { URL_slug } }) => ({ slug: URL_slug }));
}

export default function AccommodationPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const accommodation =
    accommodations.find(({ Meta: { URL_slug } }) => URL_slug === slug) ??
    notFound();

  return <PostDetails {...accommodation} />;
}
