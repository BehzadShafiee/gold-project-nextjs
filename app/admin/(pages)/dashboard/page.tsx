'use client'

import { useAdminMainContext } from "@/utils/contexts/adminContexts/adminMainContexts";

import AdminDashboardChartComponent from "@/components/AdminPanelComponents/AdminDashboardComponents/AdminDashboardChartComponent/AdminDashboardChartComponent";
import OrderIcon from "@/assets/icons/OrderIcon";
import Dollar from "@/assets/icons/Dollar";
import Gold from "@/assets/icons/Gold";
import AdminDashboardLastOrdersComponent from "@/components/AdminPanelComponents/AdminDashboardComponents/AdminDashboardLastOrdersComponent/AdminDashboardLastOrdersComponent";

export default function AdminDashboard() {

  const {theme} = useAdminMainContext();

  return (
    <>
      <div className={`p-2 w-full min-h-screen rounded back-theme-${theme}`}>
        <h2 className="text-lg p-3">گزارشات روزانه</h2>
        <div className="flex flex-wrap items-center justify-center gap-3 w-11/12 py-2 mx-auto">
          <div className={`${theme == 'light' ? 'shadow 2xl:shadow-xl' : 'shadow shadow-white'} rounded-lg p-5 w-full max-w-[290px]`}>
            <div className="flex gap-3 items-center justify-center">
              <Gold width={30} height={30} color="#d0a12b"/>
              <p>موجودی خزانه</p>
            </div>
            <div className="w-full border-b-2 my-2"/>
            <div className="flex gap-3 items-center justify-center">
              <div className="text-xl">۱۰۰۰</div>
              <span>گرم</span>
            </div>
          </div>
          <div className={`${theme == 'light' ? 'shadow 2xl:shadow-xl' : 'shadow shadow-white'} rounded-lg p-5 w-full max-w-[290px]`}>
            <div className="flex gap-3 items-center justify-center">
              <OrderIcon width={30} height={30} color="#d0a12b"/>
              <p>سفارشات امروز</p>
            </div>
            <div className="w-full border-b-2 my-2"/>
            <div className="flex gap-3 items-center justify-center">
              <div className="w-1/2 text-center border-l-2">خرید: ۱۰۰۰</div>
              <div className="w-1/2 text-center">فروش: ۱۰۰۰</div>
            </div>
          </div>
          <div className={`${theme == 'light' ? 'shadow 2xl:shadow-xl' : 'shadow shadow-white'} rounded-lg p-5 w-full max-w-[290px]`}>
            <div className="flex gap-3 items-center justify-center">
              <Dollar width={30} height={30} color="#d0a12b"/>
              <p>مبلغ کل خرید امروز</p>
            </div>
            <div className="w-full border-b-2 my-2"/>
            <div className="flex gap-3 items-center justify-center">
              <div className="text-xl">۱۰۰۰</div>
              <span>تومان</span>
            </div>
          </div>
          <div className={`${theme == 'light' ? 'shadow 2xl:shadow-xl' : 'shadow shadow-white'} rounded-lg p-5 w-full max-w-[290px]`}>
            <div className="flex gap-3 items-center justify-center">
              <Dollar width={30} height={30} color="#d0a12b"/>
              <p>مبلغ کل فروش امروز</p>
             </div>
            <div className="w-full border-b-2 my-2"/>
            <div className="flex gap-3 items-center justify-center">
              <div className="text-xl">۱۰۰۰</div>
              <span>تومان</span>
            </div>
          </div>
        </div>

        <AdminDashboardLastOrdersComponent/>

        <div className='w-11/12 mt-10 mx-auto p-3 rounded-lg border text-center'>
          <p>کل معاملات امروز</p>
          <div className="border-t p-2 mt-4">
            <AdminDashboardChartComponent/>
          </div>
        </div>

      </div>
    </>
  )
}
