'use client'

import { convertDateToPersian, convertNumbersToPersian } from "@/assets/scripts/common/common";
import { useAdminMainContext } from "@/utils/contexts/adminContexts/adminMainContexts";
import { Product } from "@/utils/interfaces/admin-interfaces/product.interface";
import Link from "next/link";
import { useState } from "react";

export default function AdminProductsPricesListMainContentComponent({ productsList } : { productsList : Product[] }) {

    const {theme} = useAdminMainContext();

    const [priceData , setPriceData] = useState({
        basePrice: '',
        changeValue: '',
        changeType: '',
        calculateTax: false
    });
    
    const currencyList : { [key: string]: string } = {'IRT':'تومان','IRR':'ریال','USD':'دلار'};
    const unitsList : { [key: string]: string } = {'item':'عدد','gr':'گرم','mithqal':'مثقال','miliGram':'سوت'};
    const priceUnitsList : { [key: string]: string } = {'perGram':'هر گرم','perMithqal':'هر مثقال','perMiliGram':'هر سوت','perItem':'هر عدد','perTotal':'کل'};
    
    const handleSetPriceData = (key: string , value: string | number | boolean) => {
        setPriceData((prev) => ({
            ...prev,
            [key]: value,
        }));
    }

    const handleSubmitPriceForSingleProduct = (pId  : string) => {
        console.log(pId);
        console.log(priceData);
    }

    return (
    <>
        <div className={`p-2 w-full min-h-screen rounded back-theme-${theme}`}>
            <h2 className="text-lg p-3">لیست قیمت محصولات</h2>
            <div className='w-11/12 mt-10 mx-auto p-3 rounded-lg border text-center'>
                <div className='p-2 mt-4 flex items-center justify-center flex-wrap gap-5 overflow-x-auto'>
                    <table className="w-full min-w-max table-auto">
                        <thead>
                            <tr className="border-b-2">
                                <th className="p-2">ردیف</th>
                                <th className="p-2">نام محصول</th>
                                <th className="p-2">واحد قیمت</th>
                                <th className="p-2">قیمت فعلی</th>
                                <th className="p-2">واحد</th>
                                <th className="p-2">تاریخ آخرین ثبت قیمت</th>
                                <th className="p-2">قیمت پایه</th>
                                <th className="p-2">کاهش/افزایش</th>
                                <th className="p-2">میزان تغییر</th>
                                <th className="p-2">محاسبه مالیات</th>
                                <th className="p-2">عملیات</th>
                                <th className="p-2">تغییرات قیمت</th>
                                <th className="p-2">جزئيات محصول</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {
                                productsList.map((p : Product , index:number) => {
                                    // const tolerance : number | null = (productData.prices.length > 1 && index < productData.prices.length - 1) ? p.calculatedPrice - productData.prices[index + 1].calculatedPrice : null;
                                    const productLastPrice = p?.prices[0] || {};
                                    const productLastAttribute = p?.details?.attributes[0] || {};
                                    const productLastPriceUnit = priceUnitsList[productLastPrice?.priceUnit] || unitsList[productLastPrice?.priceUnit] || '- - -';
                                    const productLastPriceCurrency = currencyList[productLastPrice?.currency] || '- - -';
                                    const productLastPriceDate = convertDateToPersian(productLastPrice?.createdAt) || '- - -';
                                    const productLastPriceCalculated = convertNumbersToPersian(productLastPrice?.calculatedPrice || 0);
                                    const productLastPriceBase = convertNumbersToPersian(productLastPrice?.basePrice || 0);
                                    const productLastPriceCalculateTax = productLastPrice?.calculateTax || false;
                                    const productLastOperator = productLastAttribute?.calculateOnPrice ? productLastAttribute?.operator : '- - -';
                                    const productLastOperatorValue = convertNumbersToPersian(productLastAttribute?.calculateOnPrice ? productLastAttribute?.value : 0);
                                    return(
                                        <tr key={p._id} className="even:bg-[#c9bfae] even:text-[#48514b]">
                                            <td className="p-2">{convertNumbersToPersian(index + 1)}</td>
                                            <td className="p-2">{p.name}</td>
                                            <td className="p-2">{productLastPriceUnit}</td>
                                            <td className="p-2">{productLastPriceCalculated}</td>
                                            <td className="p-2">{productLastPriceCurrency}</td>
                                            <td dir="ltr">{productLastPriceDate}</td>
                                            <td className="p-2">
                                                <input
                                                    min="0"
                                                    defaultValue={productLastPriceBase}
                                                    onChange={(e) => handleSetPriceData('basePrice' , e.target.value)}
                                                    className="border rounded p-1"
                                                />
                                            </td>
                                            <td className="p-2">
                                                <select
                                                    onChange={(e) => handleSetPriceData('changeType' , e.target.value)}
                                                    className="border rounded cursor-pointer"
                                                >
                                                    <option value="+">افزایش</option>
                                                    <option value="-">کاهش</option>
                                                </select>
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    defaultValue={productLastOperatorValue}
                                                    onChange={(e) => handleSetPriceData('changeValue' , e.target.value)}
                                                    className="border rounded p-1"
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={productLastPriceCalculateTax}
                                                    onChange={(e) => handleSetPriceData('calculateTax' , e.target.checked)}
                                                    className="w-5 h-5 cursor-pointer"
                                                />
                                            </td>
                                            <td className="p-2">
                                                <button onClick={() => handleSubmitPriceForSingleProduct(p._id)} className="text-sm bg-green-600 text-white p-2 rounded cursor-pointer transition-all hover:bg-green-700">ثبت</button>
                                            </td>
                                            <td className="p-2">
                                                <Link prefetch={false} href={`/admin/product/price-changes/${p._id}`} className="rounded bg-blue-400 text-white p-1 text-sm">تاریخچه</Link>
                                            </td>
                                            <td className="p-2">
                                                <Link prefetch={false} href={`/admin/product/edit/${p._id}`} className="rounded bg-blue-400 text-white p-1 text-sm">جزئیات</Link>
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
    