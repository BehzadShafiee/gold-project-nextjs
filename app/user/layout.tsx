import SimpleToast from "@/components/UserPanelComponents/CommonComponents/SimpleToast/SimpleToast";
import UserPanelHeader from "@/components/UserPanelComponents/CommonComponents/UserPanelHeader/UserPanelHeader";
import { UserMainContextProvider } from "@/utils/contexts/userContexts/userMainContexts";
import { checkUserAuthBySession } from "@/utils/services/customer-services/customer-services";
import { cookies } from "next/headers";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies();
  const sessionId = cookieStore.get('userSessionId');
  let userSession = '';

  if(sessionId){
    userSession = await checkUserAuthBySession(sessionId.value);
  }

  return (
    <>
      <UserMainContextProvider>
        
        {
          userSession ? 
            <UserPanelHeader/>
          : ''
        }

        <SimpleToast/>

        {children}
      </UserMainContextProvider>
    </>
  );
}
