import { notFound } from "next/navigation";

import CMS from "@utils/CMS";

import Boat from "@pages/Boat";
import Posts from "@pages/Posts";
import Homepage from "@pages/Homepage";
import BasicPage from "@pages/BasicPage";
import PostDetails from "@pages/PostDetails";

import BaseLayout from "@layouts/BaseLayout";

const getAllPages = async () => {
  const {
    genericElement,
    homeTodo,
    homeAccommodation,
    homeBoat,
    boats,
    basicPages,
    homepage,
    googleMapsData,
  } = await CMS.get("all"),
    { todos, accommodations } = await CMS.get("all", { next: { revalidate: 1 }});

  const googleData = JSON.parse(googleMapsData?.data) || {};

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
    createPage(homeTodo, "todos", { posts: todos, googleMapsData: googleData })
  ];

  const accommodationPage = [
    createPage(homeAccommodation, "accommodations", {
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
  const allPages = await getAllPages();

  return allPages.map(({ slug }) => ({
    slug: slug === '/' ? [] : slug?.split('/'),
  }));
}

export async function generateMetadata({ params }, parent) {
  const allPages = await getAllPages();
  const slugPath = params.slug ? params?.slug?.join('/') : '/';

  const page = allPages.find(p => p?.slug === slugPath);

  const {
    Intro_blob = null,
    updatedAt = null,
    Meta: {
      HTML_Title = '',
      Meta_description = '',
      noindex = null,
      nofollow = null,
    } = {},
  } = page || {};

  const blob = Intro_blob?.data?.attributes;
  
  const siteUrl = process.env.SITE_URL + (slugPath === "/" ? "/" : (`/${slugPath}/`));

  return {
    title: HTML_Title,
    description: Meta_description,
    alternates: {
      canonical: siteUrl,
      languages: {
        'en-US': '/en-US',
      },
    },
    author: 'Nusa ceningan',
    openGraph: {
      title: HTML_Title,
      description: Meta_description,
      url: siteUrl,
      siteName: 'Nusa ceningan',
      ...( blob && {
        images: [
          {
            url: blob.url,
            width: 800,
            height: 600,
          },
          {
            url: blob.url,
            width: 1800,
            height: 1600,
            alt: blob.alternativeText,
          },
        ],
      }),
      locale: 'en_US',
      type: 'website',
      publishedTime: updatedAt,
    },
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        noimageindex: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}


export default async function Page({ params }) {
  const { slug } = params;
  const slugPath = slug ? slug.join('/') : '/';

  const allPages = await getAllPages();
  const page = allPages.find(p => p?.slug === slugPath);

  if (!page || !page?.Meta) {
    return notFound(); // Page or Meta is missing
  }

  return (
    <BaseLayout genericData={page.genericData} >
      {page.type === "basic" ? (
        <BasicPage page={page} />
      ) : page.type === "todos" || page.type === "accommodations" ? (
        <Posts page={page} />
      ) : page.type === "todoDetails" || page.type === "accommodationDetails" ? (
        <PostDetails page={page} />
      ) : page.type === "boat" ? (
        <Boat page={page} />
      ) : page.type === "homepage" ? (
        <Homepage page={page} />
      ) : null}
    </BaseLayout>
  );
}
