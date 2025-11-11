'use client'

import { useAdminMainContext } from "@/utils/contexts/adminContexts/adminMainContexts";

import AdminDashboardChartComponent from "@/components/AdminPanelComponents/AdminDashboardComponents/AdminDashboardChartComponent/AdminDashboardChartComponent";
import Link from "next/link";
import OrderIcon from "@/assets/icons/OrderIcon";
import Dollar from "@/assets/icons/Dollar";
import Gold from "@/assets/icons/Gold";

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

        <div className='w-11/12 mt-10 mx-auto p-3 rounded-lg border text-center'>
          <p>کل معاملات امروز</p>
          <div className="border-t p-2 mt-4">
            <AdminDashboardChartComponent/>
          </div>
        </div>

        <div className='w-11/12 mt-10 mx-auto p-3 rounded-lg border text-center'>
          <p>لیست آخرین معاملات</p>
          <div className={`p-2 mt-4 overflow-auto ${theme == 'light' ? 'border-t' : 'border rounded'}`}>
            <table className="w-full min-w-max table-auto">
              <thead>
                <tr className="border-b-2">
                  <th className="p-2">ردیف</th>
                  <th className="p-2">نوع معامله</th>
                  <th className="p-2">حجم معامله</th>
                  <th className="p-2">مبلغ کل</th>
                  <th className="p-2">قیمت هر واحد</th>
                  <th className="p-2">تاریخ</th>
                  <th className="p-2">جزئیات</th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-[#c9bfae] even:text-[#48514b]">
                  <td className="p-2">۱</td>
                  <td className="p-2">خرید</td>
                  <td className="p-2">۱۰ گرم</td>
                  <td className="p-2">۱۰۰۰ تومان</td>
                  <td className="p-2">۱۰۰ تومان</td>
                  <td className="p-2">۱۴۰۴/۱۲/۱۲</td>
                  <td className="p-2">
                    <Link prefetch={false} href='#' className="border-b hover:text-[#e2d9ca]">مشاهده</Link>
                  </td>
                </tr>
                <tr className="even:bg-[#c9bfae] even:text-[#48514b]">
                  <td className="p-2">۱</td>
                  <td className="p-2">خرید</td>
                  <td className="p-2">۱۰ گرم</td>
                  <td className="p-2">۱۰۰۰ تومان</td>
                  <td className="p-2">۱۰۰ تومان</td>
                  <td className="p-2">۱۴۰۴/۱۲/۱۲</td>
                  <td className="p-2">
                    <Link prefetch={false} href='#' className="border-b hover:text-[#e2d9ca]">مشاهده</Link>
                  </td>
                </tr>
                <tr className="even:bg-[#c9bfae] even:text-[#48514b]">
                  <td className="p-2">۱</td>
                  <td className="p-2">خرید</td>
                  <td className="p-2">۱۰ گرم</td>
                  <td className="p-2">۱۰۰۰ تومان</td>
                  <td className="p-2">۱۰۰ تومان</td>
                  <td className="p-2">۱۴۰۴/۱۲/۱۲</td>
                  <td className="p-2">
                    <Link prefetch={false} href='#' className="border-b hover:text-[#e2d9ca]">مشاهده</Link>
                  </td>
                </tr>
                <tr className="even:bg-[#c9bfae] even:text-[#48514b]">
                  <td className="p-2">۱</td>
                  <td className="p-2">خرید</td>
                  <td className="p-2">۱۰ گرم</td>
                  <td className="p-2">۱۰۰۰ تومان</td>
                  <td className="p-2">۱۰۰ تومان</td>
                  <td className="p-2">۱۴۰۴/۱۲/۱۲</td>
                  <td className="p-2">
                    <Link prefetch={false} href='#' className="p-0 border-b hover:text-[#e2d9ca]">مشاهده</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  )
}
