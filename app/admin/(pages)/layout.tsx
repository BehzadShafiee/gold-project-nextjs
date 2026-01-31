
import AdminPanelHeader from "@/components/AdminPanelComponents/CommonComponents/AdminPanelHeader/AdminPanelHeader";
import AdminPanelSideBar from "@/components/AdminPanelComponents/CommonComponents/AdminPanelSideBar/AdminPanelSideBar";
import SimpleToast from "@/components/AdminPanelComponents/CommonComponents/SimpleToast/SimpleToast";

export default async function AdminPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <section className="relative flex flex-row items-start justify-start">
        <AdminPanelSideBar/>
        <main className="w-full lg:w-6/7 h-full p-2 bg-gray-light">
          <div className="shadow-xl w-full h-full">
            <AdminPanelHeader/>
            {children}
          </div>
        </main>
        <SimpleToast/>
      </section>
    </>
  );
}
