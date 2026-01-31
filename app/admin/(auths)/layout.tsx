
import SimpleToast from "@/components/AdminPanelComponents/CommonComponents/SimpleToast/SimpleToast";

export default async function AdminAuthsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
        <main className="relative w-full h-full p-2 bg-gray-light">
            <div className="shadow-xl w-full h-full">
            {children}
            </div>
            <SimpleToast/>
        </main>
    </>
  );
}
