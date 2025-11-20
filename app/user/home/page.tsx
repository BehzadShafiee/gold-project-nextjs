
import type { Metadata } from "next";
import { cookies } from "next/headers";
import HomeBuySellSwitchSection from "@/components/UserPanelComponents/HomeComponents/HomeBuySellSwitchSection/HomeBuySellSwitchSection";
import { getAllProductsByFetch } from "@/utils/services/admin-services/admin-services";
import { getAllWalletProductsByFetch } from "@/utils/services/customer-services/customer-services";

export const metadata: Metadata = {
  title: "خرید و فروش طلای آب شده",
  description: "خرید و فروش طلای آب شده",
};

export default async function Home() {

  const cookieStore = await cookies();
  const userId = cookieStore.get('userId');

  const productsList = await getAllProductsByFetch();

  const walletProductsList = await getAllWalletProductsByFetch(userId?.value);

  return (
    <>
      <main className="md:w-1/2 shadow-xl mx-auto p-2 rounded-b-md back-gray-light">
        <HomeBuySellSwitchSection productsList={productsList} userId={userId?.value} walletProductsList={walletProductsList}/>
      </main>
    </>
  );
}
