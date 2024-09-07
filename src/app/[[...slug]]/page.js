import { notFound } from "next/navigation";

import CMS from "@utils/CMS";

import Boat from "@pages/Boat";
import Posts from "@pages/Posts";
import Homepage from "@pages/Homepage";
import BasicPage from "@pages/BasicPage";
import PostDetails from "@pages/PostDetails";

import BaseLayout from "@layouts/BaseLayout";


const getAllPages = () => {
  const {
    genericElement,
    homeTodo,
    homeAccommodation,
    todos,
    accommodations,
    homeBoat,
    boats,
    basicPages,
    homepage,
    googleMapsData,
  } = CMS.get("all");

  const googleData = JSON.parse(googleMapsData?.data);

  const createPage = (page, type, additionalProps = {}) => ({
    type,
    slug:
      type === "todoDetails" || type === "accommodationDetails"
        ? additionalProps.slug
        : page.Meta?.URL_slug === "/"
        ? "/"
        : page.Meta?.URL_slug === "404"
        ? undefined
        : page.Meta?.URL_slug !== "/"
        ? page.Meta?.URL_slug.toLowerCase()
        : undefined,
    ...page,
    ...additionalProps,
    genericData: genericElement,
  });

  const basicPagesData = basicPages.map((page) =>
    createPage(page, "basic")
  );
  const todoDetailsPage = todos.map((page) =>
    createPage(page, "todoDetails", {
      slug: `todo/${page.Meta.URL_slug.toLowerCase()}`,
      posts: todos,
    })
  );
  const accommodationDetailsPage = accommodations.map((page) =>
    createPage(page, "accommodationDetails", {
      slug: `accommodation/${page.Meta.URL_slug.toLowerCase()}`,
      posts: accommodations,
    })
  );
  const todoPage = [
    createPage(homeTodo, "todo", { posts: todos, googleMapsData: googleData })
  ];

  const accommodationPage = [
    createPage(homeAccommodation, "accommodation", {
      posts: accommodations,
      googleMapsData: googleData
    })
  ];

  const boatPage = [
    createPage(homeBoat, "boat", { posts: boats, googleMapsData: googleData })
  ];

  const homepageData = [
    createPage(homepage, "homepage", {
      todos,
      boats,
      homeTodo,
      accommodations
    })
  ];

  return [
    ...basicPagesData,
    ...todoDetailsPage,
    ...accommodationDetailsPage,
    ...todoPage,
    ...accommodationPage,
    ...boatPage,
    ...homepageData,
  ].filter(Boolean);
};

export async function generateStaticParams() {
  const allPages = getAllPages();

  return allPages.map(({ slug }) => ({
    slug: slug === '/' ? [] : slug?.split('/'),
  }));
}

export default function Page({ params }) {
  const { slug } = params;
  const slugPath = slug ? slug?.join('/') : '/';

  const allPages = getAllPages();
  const page = allPages.find(p => p?.slug === slugPath);

  if (!page && slugPath !== '/') {
    return notFound();
  }

  return (
    <BaseLayout
      meta={page?.Meta}
      slugURL={page?.slug || page?.Meta?.URL_slug}
      canonicalURL={page?.canonical || page?.Meta?.Canonical_link}
      metaImage={page?.Intro_blob || page?.genericData?.OpenGraph_default}
      genericData={page?.genericData}
    >
      {
        page?.type === "basic" ? (
          <BasicPage page={page} />
        ) : (page?.type === "todo" || page?.type === "accommodation") ? (
          <Posts page={page} />
        ) : (page?.type === "todoDetails" || page?.type === "accommodationDetails") ? (
          <PostDetails page={page} />
        ) : page?.type === "boat" ? (
          <Boat page={page} />
        ) : page?.type === "homepage" ? (
          <Homepage page={page} />
        ) : null
      }
    </BaseLayout>
  );
}
