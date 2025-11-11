
import { getAllOrdersByFetch } from '@/utils/services/admin-services/admin-services.js';
import AdminOrdersMainContentsComponent from '@/components/AdminPanelComponents/AdminOrdersComponents/AdminOrdersMainContentsComponent/AdminOrdersMainContentsComponent';

export default async function Orders() {

  const ordersList = await getAllOrdersByFetch();

  return (
    <>
      {
        ordersList ?
          <AdminOrdersMainContentsComponent ordersList={ordersList} />
        :
          <div className="min-h-screen text-center pt-10">.:: محتوایی  وجود ندارد ::.</div>
      }
    </>
  )
}
