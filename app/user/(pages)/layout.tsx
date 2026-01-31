
import UserPanelHeader from "@/components/UserPanelComponents/CommonComponents/UserPanelHeader/UserPanelHeader";

export default async function UserPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <UserPanelHeader/>
      {children}
    </>
  );
}
