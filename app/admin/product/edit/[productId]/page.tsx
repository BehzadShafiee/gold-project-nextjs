import AdminEditProductMainContentsComponent from "@/components/AdminPanelComponents/AdminProductsComponents/AdminEditProductMainContentsComponent/AdminEditProductMainContentsComponent";
import { getProductByProductId } from "@/utils/services/admin-services/admin-services";

export default async function page({ params } : { params : Promise<{productId : string}> }) {

  const { productId } = await params;

  const productData = await getProductByProductId(productId);

  return (
    <>
      {
        productData.error ?
          <div className="min-h-screen">
            <div className="text-center pt-10">.:: خطا در دریافت دیتا ::.</div>
            <div className="text-center pt-10">{productData.error}</div>
          </div>
        : !productData ?
          <div className="min-h-screen text-center pt-10">.:: محتوایی  وجود ندارد ::.</div>
        :
          <AdminEditProductMainContentsComponent productData={productData} />
      }
    </>
  )
}
