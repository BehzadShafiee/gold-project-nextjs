'use client'

import { convertDateToPersian, convertNumbersToPersian } from "@/assets/scripts/common/common";
import { useAdminMainContext } from "@/utils/contexts/adminContexts/adminMainContexts";
import { Order } from "@/utils/interfaces/admin-interfaces/order.Interface";
import { changeOrderRegisterationByOrderId, setNewRegisterationForOrderByOrderId } from "@/utils/services/admin-services/admin-services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminOrderDetailsPageMainContents({ orderDetails } : { orderDetails : Order }) {

    const { theme , setSimpleToastData } = useAdminMainContext();

    const router = useRouter();

    const [orderRegisteration , setOrderRegisteration] = useState({
        orderId: orderDetails._id,
        order_type: orderDetails.order_type,
        orderRegister: orderDetails?.isRegister || 1,
        orderProduct: orderDetails.orderProduct,
        submit_product: orderDetails.submit_product || 1
    });

    const units : string[] = ['گرم','سوت','مثقال'];
    const orderTypes : string[] = ['فروش','خرید'];

    const handleSetOrderRegisterValue = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setOrderRegisteration({...orderRegisteration , orderRegister : Number(e.target.value)})
    }

    const handleSetOrderSubmitProductValue = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setOrderRegisteration({...orderRegisteration , submit_product : Number(e.target.value)})
    }

    const handleChangeOrderRegisteration = async (orderId : string) => {

        if(orderDetails.isRegister == 0){
            const result = await setNewRegisterationForOrderByOrderId(orderId , orderRegisteration);
            setSimpleToastData({
                show: true,
                message: result?.status == 200 ? result?.message : result?.response?.data?.message,
                status: result?.status == 200 ? 'success' : 'error'
            });

            if(result?.status == 200) {
                setTimeout(() => {
                    router.push('/admin/orders');
                }, 500);
            }

        } else {
            const result = await changeOrderRegisterationByOrderId(orderId , orderRegisteration);
            setSimpleToastData({
                show: true,
                message: result?.status == 200 ? result?.message : result?.response?.data?.message,
                status: result?.status == 200 ? 'success' : 'error'
            });
            
            if(result?.status == 200) {
                setTimeout(() => {
                    router.push('/admin/orders');
                }, 500);
            }
        }
    }

  return (
    <>
        <div className={`p-2 w-full min-h-screen rounded back-theme-${theme}`}>
            <h2 className="text-lg p-3">جزئیات فاکتور {orderTypes[orderDetails.order_type]}</h2>
            <div className='w-11/12 mt-10 mx-auto p-3 rounded-lg border text-center'>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                    <div className="h-15 w-full md:w-2/5 border rounded p-2 flex items-center justify-between">
                        <p>نام مشتری:</p>
                        <Link prefetch={false} href={`/admin/user/${orderDetails.user_id}`} >{orderDetails.user?.username}</Link>
                    </div>
                    <div className="h-15 w-full md:w-2/5 border rounded p-2 flex items-center justify-between">
                        <p>شماره تماس:</p>
                        <p>{convertNumbersToPersian(orderDetails.user?.mobile)}</p>
                    </div>
                    <div className="h-15 w-full md:w-2/5 border rounded p-2 flex items-center justify-between">
                        <p>تاریخ ایجاد:</p>
                        <p dir="ltr">{convertDateToPersian(orderDetails.createdAt)}</p>
                    </div>
                    <div className="h-15 w-full md:w-2/5 border rounded p-2 flex items-center justify-between">
                        <p>محصول انتخاب شده:</p>
                        <p>{orderDetails.orderProduct}</p>
                    </div>
                    <div className="h-15 w-full md:w-2/5 border rounded p-2 flex items-center justify-between">
                        <p>وزن مورد نظر:</p>
                        <p>{convertNumbersToPersian(orderDetails.weight_value)}</p>
                    </div>
                    <div className="h-15 w-full md:w-2/5 border rounded p-2 flex items-center justify-between">
                        <p>واحد:</p>
                        <p>{units[orderDetails.weight_unit]}</p>
                    </div>
                    <div className="h-15 w-full md:w-2/5 border rounded p-2 flex items-center justify-between">
                        <p>مبلغ کل:</p>
                        <p>{convertNumbersToPersian(orderDetails.price_value)}</p>
                    </div>
                    <div className="h-15 w-full md:w-2/5 border rounded p-2 flex items-center justify-between">
                        <p>تغییر وضعیت تایید:</p>
                        <select onChange={(e) => handleSetOrderRegisterValue(e)} value={orderRegisteration.orderRegister} className={`border border-gray-300 rounded-lg ${theme == 'light' ? 'color-black-light' : ''}`}>
                            <option value={2}>تایید</option>
                            <option value={1}>رد تایید</option>
                        </select>
                    </div>

                    {/* {
                        orderDetails.order_type == 0 ?
                            <div className="h-15 w-full md:w-2/5 border rounded p-2 flex items-center justify-between">
                                <p>ثبت محصول در انبار:</p>
                                <select onChange={(e) => handleSetOrderSubmitProductValue(e)} value={orderRegisteration.submit_product} className={`border border-gray-300 rounded-lg ${theme == 'light' ? 'color-black-light' : ''} `}>
                                    <option value={1}>تایید</option>
                                    <option value={0}>رد تایید</option>
                                </select>
                            </div>
                        :''                        
                    } */}
                </div>
                <button onClick={() => handleChangeOrderRegisteration(orderDetails._id)} className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer transition-all hover:bg-green-700 mt-4">ثبت تغییرات</button>
            </div>
        </div>
    </>
  )
}
