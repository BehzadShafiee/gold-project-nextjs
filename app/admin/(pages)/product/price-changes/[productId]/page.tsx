import AdminProductPriceChangesComponent from "@/components/AdminPanelComponents/AdminProductsComponents/AdminProductPriceChangesComponent/AdminProductPriceChangesComponent";
import { Product } from "@/utils/interfaces/admin-interfaces/product.interface";
import { getSingleProductPriceChanges } from "@/utils/services/admin-services/admin-services";

export default async function page({ params } : { params : Promise<{productId : string}> }) {

  const { productId } = await params;

  const product : Product = await getSingleProductPriceChanges(productId);  

  return (
    <>
      <AdminProductPriceChangesComponent productData={product}/>
    </>
  )
}
