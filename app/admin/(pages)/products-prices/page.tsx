import AdminProductsPricesListMainContentComponent from "@/components/AdminPanelComponents/AdminProductsComponents/AdminProductsPricesListMainContentComponent/AdminProductsPricesListMainContentComponent";
import { getAllProductsWithLastPriceByFetch } from "@/utils/services/admin-services/admin-services";

export default async function page() {

  const productsList = await getAllProductsWithLastPriceByFetch();

  return (
    <>
        {
            productsList ?
                <AdminProductsPricesListMainContentComponent productsList={productsList} />
            :
                <div className="min-h-screen text-center pt-10">.:: محتوایی  وجود ندارد ::.</div>
        }
    </>
  )
}
