'use client'

import { useRouter } from 'next/navigation';
import { convertDateToPersian, convertNumbersToPersian } from "@/assets/scripts/common/common";
import { useAdminMainContext } from "@/utils/contexts/adminContexts/adminMainContexts";
import { UserInterface } from "@/utils/interfaces/admin-interfaces/user.interface";
import { changeUserRegisteration, setNewRegisterationForUser } from "@/utils/services/admin-services/admin-services";
import { useState } from "react";

export default function UsersDetailsPageMainContents({ userDetails } : {userDetails : UserInterface}) {

    const router = useRouter();

    const { theme , setSimpleToastData } = useAdminMainContext();

    const [userRegisterValue , setUserRegisterValue] = useState({
        userId: userDetails?._id,
        email: userDetails?.email,
        userRegister : userDetails?.userRegister || 1,
        userLevel : userDetails?.userLevel || 0
    });
    
    const handleSetUserRegisterValue = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setUserRegisterValue({...userRegisterValue , userRegister : Number(e.target.value)});
    }
    
    const handleSetUserLevel = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setUserRegisterValue({...userRegisterValue , userLevel : Number(e.target.value)});
    }

    const handleChangeUserRegisteration = async (userId : string) => {        
        if(userDetails.userRegister == 0) {
            const result = await setNewRegisterationForUser(userId , userRegisterValue);

            setSimpleToastData({
                show: true,
                message: result?.status == 200 ? result?.message : result?.response?.data?.message,
                status: result?.status == 200 ? 'success' : 'error'
            });
            
            if(result?.status == 200) {
                setTimeout(() => {
                    router.push('/admin/users');
                }, 500);
            }
        } else {
            const result = await changeUserRegisteration(userId , userRegisterValue);

            setSimpleToastData({
                show: true,
                message: result?.status == 200 ? result?.message : result?.response?.data?.message,
                status: result?.status == 200 ? 'success' : 'error'
            });
            
            if(result?.status == 200) {
                setTimeout(() => {
                    router.push('/admin/users');
                }, 500);
            }
        }
    }

  return (
    <>
        <div className={`p-2 w-full min-h-screen rounded back-theme-${theme}`}>
            <h2 className="text-lg p-3">جزئیات مشتری</h2>
            <div className='w-11/12 mt-10 mx-auto p-3 rounded-lg border text-center'>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                    <div className="h-15 w-full md:w-2/5 border rounded p-2 flex items-center justify-between">
                        <p>نام و نام خانوادگی:</p>
                        <p>{userDetails.username}</p>
                    </div>
                    <div className="h-15 w-full md:w-2/5 border rounded p-2 flex items-center justify-between">
                        <p>ایمیل:</p>
                        <p>{userDetails.email}</p>
                    </div>
                    <div className="h-15 w-full md:w-2/5 border rounded p-2 flex items-center justify-between">
                        <p>شماره موبایل:</p>
                        <p>{convertNumbersToPersian(userDetails.mobile)}</p>
                    </div>
                    <div className="h-15 w-full md:w-2/5 border rounded p-2 flex items-center justify-between">
                        <p>کد ملی:</p>
                        <p>{convertNumbersToPersian(userDetails.nationalCode)}</p>
                    </div>
                    <div className="h-15 w-full md:w-2/5 border rounded p-2 flex items-center justify-between">
                        <p>استان / شهر:</p>
                        <p>{userDetails.province} - {userDetails.city}</p>
                    </div>
                    <div className="h-15 w-full md:w-2/5 border rounded p-2 flex items-center justify-between">
                        <p>آدرس:</p>
                        <p>{userDetails.address}</p>
                    </div>
                    <div className="h-15 w-full md:w-2/5 border rounded p-2 flex items-center justify-between">
                        <p>تاریخ عضویت:</p>
                        <p dir="ltr">{convertDateToPersian(userDetails.createdAt)}</p>
                    </div>
                    <div className="h-15 w-full md:w-2/5 border rounded p-2 flex items-center justify-between">
                        <p>وضعیت تایید ادمین:</p>
                        <p>{userDetails.userRegister == 1 ? 'عدم تایید' : userDetails.userRegister == 2 ? 'تایید شده' : 'در انتظار تایید'}</p>
                    </div>
                    <div className="h-15 w-full md:w-2/5 border rounded p-2 flex items-center justify-between">
                        <p>نوع مشتری:</p>
                        <select onChange={(e) => handleSetUserLevel(e)} value={userRegisterValue.userLevel} className={`border border-gray-300 rounded-lg ${theme == 'light' ? 'color-black-light' : ''} `}>
                            <option value={0}>مشتری عادی</option>
                            <option value={1}>مشتری برنزی</option>
                            <option value={2}>مشتری نقره ای</option>
                            <option value={3}>مشتری طلایی</option>
                            <option value={4}>همکار</option>
                        </select>
                    </div>
                    <div className="h-15 w-full md:w-2/5 border rounded p-2 flex items-center justify-between">
                        <p>تاریخ تایید ادمین:</p>
                        <p dir="ltr">{convertDateToPersian(userDetails.createdAt)}</p>
                    </div>
                    <div className="h-15 w-full md:w-2/5 border rounded p-2 flex items-center justify-between">
                        <p>تغییر وضعیت تایید:</p>
                        <select onChange={(e) => handleSetUserRegisterValue(e)} value={userRegisterValue.userRegister} className={`border border-gray-300 rounded-lg ${theme == 'light' ? 'color-black-light' : ''} `}>
                            <option value={2}>تایید</option>
                            <option value={1}>رد تایید</option>
                        </select>
                    </div>
                </div>
                <button onClick={() => handleChangeUserRegisteration(userDetails._id)} className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer transition-all hover:bg-green-700 mt-4">ثبت تغییرات</button>
            </div>
        </div>
    </>
  )
}
