
import { AdminMainContextProvider } from "@/utils/contexts/adminContexts/adminMainContexts";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <AdminMainContextProvider>
        {children}
      </AdminMainContextProvider>
    </>
  );
}
