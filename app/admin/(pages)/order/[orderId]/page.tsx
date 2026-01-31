
import AdminOrderDetailsPageMainContents from "@/components/AdminPanelComponents/AdminOrderDetailsPageComponents/AdminOrderDetailsPageMainContents/AdminOrderDetailsPageMainContents";
import { getOrdersByOrderId } from "@/utils/services/admin-services/admin-services"

export default async function order({ params } : { params : Promise<{orderId : string}> }) {

    const { orderId } = await params;

    const orderData = await getOrdersByOrderId(orderId);

    return (
        <>
            {
                orderData.error ?
                    <div className="min-h-screen">
                        <div className="text-center pt-10">.:: خطا در دریافت دیتا ::.</div>
                        <div className="text-center pt-10">{orderData.error}</div>
                    </div>
                : !orderData ?
                    <div className="min-h-screen text-center pt-10">.:: محتوایی وجود ندارد ::.</div>
                :
                    <AdminOrderDetailsPageMainContents orderDetails={orderData} />
            }
        </>
    )
}
