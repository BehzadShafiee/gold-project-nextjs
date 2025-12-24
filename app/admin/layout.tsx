
import AdminPanelHeader from "@/components/AdminPanelComponents/CommonComponents/AdminPanelHeader/AdminPanelHeader";
import AdminPanelSideBar from "@/components/AdminPanelComponents/CommonComponents/AdminPanelSideBar/AdminPanelSideBar";
import SimpleToast from "@/components/AdminPanelComponents/CommonComponents/SimpleToast/SimpleToast";
import { AdminMainContextProvider } from "@/utils/contexts/adminContexts/adminMainContexts";
import { checkAdminAuthBySession } from "@/utils/services/admin-services/admin-services";
import { cookies } from "next/headers";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies();
  const sessionId = cookieStore.get('adminSessionId');
  let adminSession = '';

  if(sessionId){
    adminSession = await checkAdminAuthBySession(sessionId.value);
  }

  return (
    <>
      <AdminMainContextProvider>
        {
          adminSession ? 
            <section className="relative flex flex-row items-start justify-start">
              <AdminPanelSideBar/>
              <main className="w-full lg:w-6/7 h-full p-2 bg-gray-light">
                <div className="shadow-xl w-full h-full">
                  <AdminPanelHeader />
                  {children}
                </div>
              </main>
              <SimpleToast/>
            </section>
          :
            <main className="relative w-full h-full p-2 bg-gray-light">
              <div className="shadow-xl w-full h-full">
                {children}
              </div>
              <SimpleToast/>
            </main>
        }
      </AdminMainContextProvider>
    </>
  );
}
