
import BaseLayout from "@layouts/BaseLayout";
import CMS from "@utils/CMS";
import Boat from "@pages/Boat";
import Posts from "@pages/Posts";
import BasicPage from "@pages/BasicPage";
import PostDetails from "@pages/PostDetails";

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
    googleMapsData,
  } = CMS.get("all");

  const createPage = (page, type, additionalProps = {}) => ({
    type,
    slug:
      type === "todoDetails" || type === "accommodationDetails"
        ? additionalProps.slug
        : page.Meta?.URL_slug !== "/"
        ? page.Meta?.URL_slug.toLowerCase()
        : undefined,
    ...page,
    ...additionalProps,
    genericData: genericElement,
  });

  // Creating arrays for different types of pages
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
    createPage(homeTodo, "todo", { posts: todos })
  ];
  const accommodationPage = [
    createPage(homeAccommodation, "accommodation", { posts: accommodations })
  ];
  const boatPage = [
    createPage(homeBoat, "boat", { posts: boats })
  ];

  return [
    ...basicPagesData,
    ...todoDetailsPage,
    ...accommodationDetailsPage,
    ...todoPage,
    ...accommodationPage,
    ...boatPage,
  ].filter(Boolean);
};

export async function generateStaticParams() {
  const allPages = getAllPages();
  const slugs = allPages.map(({ slug }) => slug.split('/'));
  return slugs.map(slug => ({ slug }));
}

export default async function Page({ params }) {
  const { slug } = params;
  const slugPath = slug ? slug.join('/') : '';

  const allPages = getAllPages();
  const page = allPages.find(p => p.slug === slugPath);

  if (!page) {
    return {
      notFound: true,
    };
  }

  return (
    <BaseLayout
      meta={page.Meta}
      slugURL={page.slug || page.Meta.URL_slug}
      canonicalURL={page.canonical || page.Meta.Canonical_link}
      metaImage={page.Intro_blob || page.genericData.OpenGraph_default}
      genericData={page.genericData}
    >
      {
        page.type === "basic" ? (
          <BasicPage page={page} />
        ) : page.type === "todo" || page.type === "accommodation" ? (
          <Posts page={page} />
        ) : page.type === "todoDetails" || page.type === "accommodationDetails" ? (
          <PostDetails page={page} />
        ) : page.type === "boat" ? (
          <Boat page={page} />
        ) : null
      }
    </BaseLayout>
  );
}
