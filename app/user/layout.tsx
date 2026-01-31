import SimpleToast from "@/components/UserPanelComponents/CommonComponents/SimpleToast/SimpleToast";
import { UserMainContextProvider } from "@/utils/contexts/userContexts/userMainContexts";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <UserMainContextProvider>

        <SimpleToast/>

        {children}
        
      </UserMainContextProvider>
    </>
  );
}
