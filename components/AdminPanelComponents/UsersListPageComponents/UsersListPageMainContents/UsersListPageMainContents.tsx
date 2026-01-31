'use client'

import Link from "next/link";
import { convertDateToPersian, convertNumbersToPersian } from "@/assets/scripts/common/common";
import { useAdminMainContext } from "@/utils/contexts/adminContexts/adminMainContexts";
import { UserInterface } from "@/utils/interfaces/admin-interfaces/user.interface";

export default function UsersListPageMainContents({ usersList } : { usersList : UserInterface[] }) {

    const { theme } = useAdminMainContext();

    const userLevelNames = ['مشتری عادی', 'مشتری برنزی', 'مشتری نقره ای', 'مشتری طلایی', 'همکار'];

  return (
    <>
        <div className={`p-2 w-full min-h-screen rounded back-theme-${theme}`}>
            <h2 className="text-lg p-3">مشتریان ثبت شده</h2>
            <div className='w-11/12 mt-10 mx-auto p-3 rounded-lg border text-center'>
            <p>لیست مشتریان</p>
                <div className={`p-2 mt-4 overflow-auto ${theme == 'light' ? 'border-t' : 'border rounded'}`}>
                    <table className="w-full min-w-max table-auto">
                        <thead>
                            <tr className="border-b-2">
                                <th className="p-2">ردیف</th>
                                <th className="p-2">نام کاربر</th>
                                <th className="p-2">ایمیل</th>
                                <th className="p-2">مبلغ شماره موبایل</th>
                                <th className="p-2">استان / شهر</th>
                                <th className="p-2">تاریخ عضویت</th>
                                <th className="p-2">نوع مشتری</th>
                                <th className="p-2">وضعیت تایید</th>
                                <th className="p-2">لیست سفارشات</th>
                                <th className="p-2">جزئیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {
                                usersList.map((user : UserInterface , index:number) => {
                                    return(
                                        <tr key={user._id} className="even:bg-[#c9bfae] even:text-[#48514b]">
                                            <td className="p-2">{convertNumbersToPersian(index + 1)}</td>
                                            <td className="p-2">{user.username}</td>
                                            <td className="p-2">{user.email}</td>
                                            <td className="p-2">{user.mobile}</td>
                                            <td className="p-2">{user.province} - {user.city}</td>
                                            <td dir="ltr" className="p-2">{convertDateToPersian(user.createdAt)}</td>
                                            <td className="p-2">{userLevelNames[user.userLevel]}</td>
                                            <td className="p-2">
                                                {
                                                    user.userRegister == 2 ? 
                                                        <span className="text-green-600">تایید شده</span>
                                                    : user.userRegister == 1 ?
                                                        <span className="text-red-700">عدم تایید</span>
                                                    :
                                                        <span>در انتظار تایید</span>
                                                }
                                            </td>
                                            <td>
                                                <Link prefetch={false} href={`/admin/user/orders-list/${user._id}`} className="border-b hover:text-[#e2d9ca]">مشاهده</Link>
                                            </td>
                                            <td>
                                                <Link prefetch={false} href={`/admin/user/${user._id}`} className="border-b hover:text-[#e2d9ca]">مشاهده</Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
  )
}
