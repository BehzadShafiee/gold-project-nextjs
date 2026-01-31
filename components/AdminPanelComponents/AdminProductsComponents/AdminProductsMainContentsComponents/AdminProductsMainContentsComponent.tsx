'use client'

import Link from "next/link";
import { useAdminMainContext } from "@/utils/contexts/adminContexts/adminMainContexts"
import PaginationComponent from "../../CommonComponents/PaginationComponent/PaginationComponent";

import ProductIcon from "@/assets/icons/ProductIcon";
import { Product } from "@/utils/interfaces/admin-interfaces/product.interface";
import { convertDateToPersian, convertNumbersToPersian } from "@/assets/scripts/common/common";

export default function AdminProductsMainContentsComponent({ productsList } : { productsList : Product[] }) {

  const { theme } = useAdminMainContext();

  const currencyList : { [key: string]: string } = {'IRT':'تومان','IRR':'ریال','USD':'دلار'};
  const unitsList : { [key: string]: string } = {'item':'عدد','gr':'گرم','mithqal':'مثقال','miliGram':'سوت'};

  return (
    <>
        <div className={`p-2 w-full min-h-screen rounded back-theme-${theme}`}>
            <h2 className="text-lg p-3">لیست محصولات</h2>
            <div className='w-11/12 mt-10 mx-auto p-3 rounded-lg border text-center'>
                <div className='p-2 mt-4 flex items-center justify-center flex-wrap gap-5'>
                    
                    {
                        productsList.map((product: Product) => {

                            return(
                                <div key={product._id} className="border shadow rounded-lg p-5 flex flex-col items-center justify-center gap-3 transition-all hover:shadow-lg hover:-translate-y-0.5">
                                    <ProductIcon width={70} height={70} color="#d0a12b"/>
                                    <p className="text-xl">{product.name}</p>
                                    <div className="flex items-center justify-between gap-5">
                                        <p>وضعیت موجودی:</p>
                                        {
                                            product?.weightOrNumber ?
                                                <p>{convertNumbersToPersian(product?.weightOrNumber)} <small>{unitsList[product?.unit]}</small></p>
                                            :
                                                <p>- - -</p>
                                        }
                                    </div>
                                    <div className="flex items-center justify-between gap-5">
                                        <p>آخرین قیمت:</p>
                                        {
                                            product?.prices[0]?.calculatedPrice ?
                                                <p>{convertNumbersToPersian(product?.prices[0]?.calculatedPrice)} <small>{currencyList[product?.prices[0]?.currency]}</small></p>
                                            :
                                                <p>- - -</p>
                                        }
                                    </div>
                                    <div className="flex items-center justify-between gap-5">
                                        <p>تاریخ بروزرسانی:</p>
                                        <p>{convertDateToPersian(product.createdAt)}</p>
                                    </div>
                                    <div className="flex items-center justify-between gap-5">
                                        <p>نوسان قیمت:</p>
                                        {
                                            product?.priceTolerance ?
                                                <p dir="ltr" className={`${product.priceTolerance < 0 ? 'text-red-400' : 'text-green-400'}`}>{convertNumbersToPersian(product.priceTolerance)}</p>
                                            :
                                                <p>- - -</p>
                                        }
                                    </div>
                                    <div className="flex gap-4">
                                        <Link prefetch={false} href={`/admin/product/edit/${product._id}`} className="rounded bg-blue-400 color-white p-1 text-sm">مشاهده جزئیات</Link>
                                        <Link prefetch={false} href={`/admin/product/price-changes/${product._id}`} className="rounded border color-white p-1 text-sm">مشاهده تغییرات قیمت</Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                    
                </div>

                {/* <PaginationComponent/> */}
            </div>
        </div>
    </>
  )
}
