import { notFound } from "next/navigation";
import BasicPage from "@components/BasicPage";
import CMS from "@utils/CMS";

const basicPages = await CMS.get("basicPages");

export async function generateStaticParams() {
  return basicPages.map(({ Meta: { URL_slug } }) => ({ slug: URL_slug }));
}

export default function AccommodationPage({ params: { slug }}) {
  const basicPage =
    basicPages.find(({ Meta: { URL_slug } }) => URL_slug === slug) ??
    notFound();

  return <BasicPage {...basicPage} />;
}