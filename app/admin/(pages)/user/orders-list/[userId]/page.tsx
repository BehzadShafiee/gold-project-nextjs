import SingleUserOrdersListComponent from "@/components/AdminPanelComponents/SingleUserOrdersListComponent/SingleUserOrdersListComponent";
import { getUserOrdersListByUserId } from "@/utils/services/admin-services/admin-services";

export default async function page({ params } : { params: Promise<{userId : string}> }) {

    const { userId } = await params;

    const userOrdersList = await getUserOrdersListByUserId(userId);

  return (
    <>
        {
            userOrdersList ?
                <SingleUserOrdersListComponent ordersList={userOrdersList.ordersWithRegister} userData={userOrdersList.user}/>
            :
                <div className="min-h-screen text-center pt-10">.:: محتوایی  وجود ندارد ::.</div>
        }
    </>
  )
}
