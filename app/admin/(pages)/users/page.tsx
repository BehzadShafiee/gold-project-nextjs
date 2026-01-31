import UsersListPageMainContents from "@/components/AdminPanelComponents/UsersListPageComponents/UsersListPageMainContents/UsersListPageMainContents";
import { getAllUsersByFetch } from "@/utils/services/admin-services/admin-services";

export default async function users() {

    const usersList = await getAllUsersByFetch();    

    return (
        <>
            {
                usersList ? 
                    <UsersListPageMainContents usersList={usersList} />
                :
                    <div className="min-h-screen text-center pt-10">.:: محتوایی  وجود ندارد ::.</div>
            }
        </>
    )
}
