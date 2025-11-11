
import UsersDetailsPageMainContents from "@/components/AdminPanelComponents/UsersDetailsPageComponents/UsersDetailsPageMainContents/UsersDetailsPageMainContents";
import { getUsersByUserId } from "@/utils/services/admin-services/admin-services"

export default async function user({ params } : { params : Promise<{userId : string}> }) {

    const { userId } = await params;

    const userData = await getUsersByUserId(userId);

    return (
        <>
            {
                userData.error ?
                    <div className="min-h-screen">
                        <div className="text-center pt-10">.:: خطا در دریافت دیتا ::.</div>
                        <div className="text-center pt-10">{userData.error}</div>
                    </div>
                : !userData ?
                    <div className="min-h-screen text-center pt-10">.:: محتوایی وجود ندارد ::.</div>
                :
                    <UsersDetailsPageMainContents userDetails={userData} />
            }
        </>
    )
}
