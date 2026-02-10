import AdminProductPriceChangesComponent from "@/components/AdminPanelComponents/AdminProductsComponents/AdminProductPriceChangesComponent/AdminProductPriceChangesComponent";
import { getSingleProductPriceChanges } from "@/utils/services/admin-services/admin-services";

export default async function page({ params } : { params : Promise<{productId : string}> }) {

  const { productId } = await params;

  const productData = await getSingleProductPriceChanges(productId);

  return (
    <>
      <AdminProductPriceChangesComponent productData={productData.product}/>
    </>
  )
}
