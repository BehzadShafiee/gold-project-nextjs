
import AdminProductsMainContentsComponent from "@/components/AdminPanelComponents/AdminProductsComponents/AdminProductsMainContentsComponents/AdminProductsMainContentsComponent";
import { getAllProductsByFetch } from "@/utils/services/admin-services/admin-services";

export default async function products() {

  const productsList = await getAllProductsByFetch();

  return (
    <>
      {
        productsList ?
          <AdminProductsMainContentsComponent productsList={productsList} />
        :
          <div className="min-h-screen text-center pt-10">.:: محتوایی  وجود ندارد ::.</div>
      }
    </>
  )
}
