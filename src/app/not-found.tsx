import CMS from "@utils/CMS";
import BaseLayout from "@layouts/BaseLayout";
import BasicPage from "@pages/BasicPage";
 
const NotFound = async () => {

  const { basicPages, genericElement } = await CMS.get("all");

  const [page] = basicPages?.filter(
    ({ Seo: { URL_slug } }: { Seo: { URL_slug: string } }) => URL_slug === "404"
  );

  return (
    <BaseLayout genericElement={genericElement} >
      <BasicPage page={page} />
    </BaseLayout>
  )
}

export default NotFound;