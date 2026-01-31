'use client'

import { convertDateToPersian, convertNumbersToPersian } from "@/assets/scripts/common/common";
import { useAdminMainContext } from "@/utils/contexts/adminContexts/adminMainContexts";
import { Order } from "@/utils/interfaces/admin-interfaces/order.Interface";
import { UserInterface } from "@/utils/interfaces/admin-interfaces/user.interface";
import Link from "next/link";

export default function SingleUserOrdersListComponent({ ordersList , userData } : { ordersList : Order[] , userData : UserInterface }) {

    const {theme} = useAdminMainContext();

    const unitsList : { [key: string]: string } = {'item':'عدد','gr':'گرم','mithqal':'مثقال','miliGram':'سوت'};
    const orderTypes : string[] = ['فروش','خرید'];

  return (
    <>
        <div className={`p-2 w-full min-h-screen rounded back-theme-${theme}`}>
            <h2 className="text-lg p-3">لیست معامله های {userData.username}</h2>
            <div className='w-11/12 mt-10 mx-auto p-3 rounded-lg border text-center'>
                <p>لیست آخرین معاملات</p>
                <div className={`p-2 mt-4 overflow-auto ${theme == 'light' ? 'border-t' : 'border rounded'}`}>
                    <table className="w-full min-w-max table-auto">
                        <thead>
                            <tr className="border-b-2">
                                <th className="p-2">ردیف</th>
                                <th className="p-2">نوع معامله</th>
                                <th className="p-2">محصول</th>
                                <th className="p-2">حجم معامله</th>
                                <th className="p-2">مبلغ کل</th>
                                <th className="p-2">قیمت هر واحد</th>
                                <th className="p-2">تاریخ</th>
                                <th className="p-2">وضعیت تایید</th>
                                <th className="p-2">جزئیات</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                ordersList?.map((order:Order , index:number) => {

                                    return(
                                        <tr key={order._id} className="even:bg-[#c9bfae] even:text-[#48514b]">
                                            <td className="p-2">{convertNumbersToPersian(index + 1)}</td>
                                            <td className="p-2">{orderTypes[order.order_type]}</td>
                                            <td className="p-2">{order.orderProduct || '---'}</td>
                                            <td className="p-2">{convertNumbersToPersian(order.weight_value)}</td>
                                            <td className="p-2">{unitsList[order.weight_unit]}</td>
                                            <td className="p-2">{convertNumbersToPersian(order.price_value)}</td>
                                            <td className="p-2">{convertDateToPersian(order.createdAt)}</td>
                                            <td className="p-2">
                                                {
                                                    order.isRegister == 2 ? 
                                                        <span className="text-green-600">تایید شده</span>
                                                    : order.isRegister == 1 ?
                                                        <span className="text-red-700">عدم تایید</span>
                                                    :
                                                        <span>در انتظار تایید</span>
                                                }
                                            </td>
                                            <td className="p-2">
                                                <Link prefetch={false} href={`/admin/order/${order._id}`} className="border-b hover:text-[#e2d9ca]">مشاهده</Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    
                    {/* <PaginationComponent/> */}

                </div>
            </div>
        </div>
    </>
  )
}
