// 'use client'

// import { convertDateToPersian, convertNumbersToPersian } from "@/assets/scripts/common/common";
// import { useAdminMainContext } from "@/utils/contexts/adminContexts/adminMainContexts";
// import { Product } from "@/utils/interfaces/admin-interfaces/product.interface";
// import { EditProductPriceByAxios } from "@/utils/services/admin-services/admin-services";
// import Link from "next/link";
// import { useState } from "react";

// export default function AdminProductsPricesListMainContentComponent({ productsList } : { productsList : Product[] }) {

//     const {theme , setSimpleToastData} = useAdminMainContext();

//     const [priceData , setPriceData] = useState({
//         basePrice: '0',
//         changeValue: '0',
//         changeType: 'plus',
//         calculateTax: true
//     });
    
//     const currencyList : { [key: string]: string } = {'IRT':'تومان','IRR':'ریال','USD':'دلار'};
//     const unitsList : { [key: string]: string } = {'item':'عدد','gr':'گرم','mithqal':'مثقال','miliGram':'سوت'};
//     const priceUnitsList : { [key: string]: string } = {'perGram':'هر گرم','perMithqal':'هر مثقال','perMiliGram':'هر سوت','perItem':'هر عدد','perTotal':'کل'};
    
//     const handleSetPriceData = (key: string , value: string | number | boolean) => {
//         setPriceData((prev) => ({
//             ...prev,
//             [key]: value,
//         }));
//     }

//     const handleSubmitPriceForSingleProduct = async (pId  : string) => {
        
//         const result = await EditProductPriceByAxios(pId , priceData);
        
//         setSimpleToastData({
//             show: true,
//             message: result?.status == 200 ? result?.message : result?.response?.data?.message,
//             status: result?.status == 200 ? 'success' : 'error'
//         });

//     }

//     return (
//     <>
//         <div className={`p-2 w-full min-h-screen rounded back-theme-${theme}`}>
//             <h2 className="text-lg p-3">لیست قیمت محصولات</h2>
//             <div className='w-11/12 mt-10 mx-auto p-3 rounded-lg border text-center'>
//                 <div className='p-2 mt-4 flex items-center justify-center flex-wrap gap-5 overflow-x-auto'>
//                     <table className="w-full min-w-max table-auto">
//                         <thead>
//                             <tr className="border-b-2">
//                                 <th className="p-2">ردیف</th>
//                                 <th className="p-2">نام محصول</th>
//                                 <th className="p-2">واحد قیمت</th>
//                                 <th className="p-2">قیمت فعلی</th>
//                                 <th className="p-2">واحد</th>
//                                 <th className="p-2">تاریخ آخرین ثبت قیمت</th>
//                                 <th className="p-2">قیمت پایه</th>
//                                 <th className="p-2">کاهش/افزایش</th>
//                                 <th className="p-2">میزان تغییر</th>
//                                 <th className="p-2">محاسبه مالیات</th>
//                                 <th className="p-2">عملیات</th>
//                                 <th className="p-2">تغییرات قیمت</th>
//                                 <th className="p-2">جزئيات محصول</th>
//                             </tr>
//                         </thead>
//                         <tbody>
                            
//                             {
//                                 productsList.map((p : Product , index:number) => {
//                                     // const tolerance : number | null = (productData.prices.length > 1 && index < productData.prices.length - 1) ? p.calculatedPrice - productData.prices[index + 1].calculatedPrice : null;
//                                     const productLastPrice = p?.prices[0] || {};
//                                     const productLastAttribute = p?.details?.attributes[0] || {};
//                                     const productLastPriceUnit = priceUnitsList[productLastPrice?.priceUnit] || unitsList[productLastPrice?.priceUnit] || '- - -';
//                                     const productLastPriceCurrency = currencyList[productLastPrice?.currency] || '- - -';
//                                     const productLastPriceDate = convertDateToPersian(productLastPrice?.createdAt) || '- - -';
//                                     const productLastPriceCalculated = convertNumbersToPersian(productLastPrice?.calculatedPrice || 0);
//                                     const productLastPriceBase = convertNumbersToPersian(productLastPrice?.basePrice || 0);
//                                     const productLastPriceCalculateTax = productLastPrice?.calculateTax || false;
//                                     const productLastOperator = productLastAttribute?.calculateOnPrice ? productLastAttribute?.operator : '- - -';
//                                     const productLastOperatorValue = convertNumbersToPersian(productLastAttribute?.calculateOnPrice ? productLastAttribute?.value : 0);
//                                     return(
//                                         <tr key={p._id} className="even:bg-[#c9bfae] even:text-[#48514b]">
//                                             <td className="p-2">{convertNumbersToPersian(index + 1)}</td>
//                                             <td className="p-2">{p.name}</td>
//                                             <td className="p-2">{productLastPriceUnit}</td>
//                                             <td className="p-2">{productLastPriceCalculated}</td>
//                                             <td className="p-2">{productLastPriceCurrency}</td>
//                                             <td dir="ltr">{productLastPriceDate}</td>
//                                             <td className="p-2">
//                                                 <input
//                                                     min="0"
//                                                     defaultValue={productLastPriceBase}
//                                                     onChange={(e) => handleSetPriceData('basePrice' , e.target.value)}
//                                                     className="border rounded p-1"
//                                                 />
//                                             </td>
//                                             <td className="p-2">
//                                                 <select
//                                                     onChange={(e) => handleSetPriceData('changeType' , e.target.value)}
//                                                     className="border rounded cursor-pointer"
//                                                 >
//                                                     <option value="plus">افزایش</option>
//                                                     <option value="minus">کاهش</option>
//                                                 </select>
//                                             </td>
//                                             <td className="p-2">
//                                                 <input
//                                                     type="number"
//                                                     min="0"
//                                                     defaultValue={productLastOperatorValue}
//                                                     onChange={(e) => handleSetPriceData('changeValue' , e.target.value)}
//                                                     className="border rounded p-1"
//                                                 />
//                                             </td>
//                                             <td className="p-2">
//                                                 <input
//                                                     type="checkbox"
//                                                     defaultChecked={productLastPriceCalculateTax}
//                                                     onChange={(e) => handleSetPriceData('calculateTax' , e.target.checked)}
//                                                     className="w-5 h-5 cursor-pointer"
//                                                 />
//                                             </td>
//                                             <td className="p-2">
//                                                 <button onClick={() => handleSubmitPriceForSingleProduct(p._id)} className="text-sm bg-green-600 text-white p-2 rounded cursor-pointer transition-all hover:bg-green-700">ثبت</button>
//                                             </td>
//                                             <td className="p-2">
//                                                 <Link prefetch={false} href={`/admin/product/price-changes/${p._id}`} className="rounded bg-blue-400 text-white p-1 text-sm">تاریخچه</Link>
//                                             </td>
//                                             <td className="p-2">
//                                                 <Link prefetch={false} href={`/admin/product/edit/${p._id}`} className="rounded bg-blue-400 text-white p-1 text-sm">جزئیات</Link>
//                                             </td>
//                                         </tr>
//                                     )
//                                 })
//                             }

//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     </>
//     )
// }
    

'use client';

import { useState, useCallback } from "react";
import Link from "next/link";
import { convertNumbersToPersian } from "@/assets/scripts/common/common";
import { useAdminMainContext } from "@/utils/contexts/adminContexts/adminMainContexts";
import { Product } from "@/utils/interfaces/admin-interfaces/product.interface";
import { EditProductPriceByAxios } from "@/utils/services/admin-services/admin-services";

type ProductPriceState = {
  basePrice?: string;
  changeValue?: string;
  changeType?: 'plus' | 'minus';
  calculateTax?: boolean;
};

export default function AdminProductsPricesListMainContentComponent({
  productsList
}: {
  productsList: Product[];
}) {

  const { theme, setSimpleToastData } = useAdminMainContext();

  const [products , setProducts] = useState<Product[]>(productsList);

  const [priceData, setPriceData] = useState<Record<string, ProductPriceState>>({});
  const [rowLoading, setRowLoading] = useState<Record<string, boolean>>({});
  const [bulkLoading, setBulkLoading] = useState(false);

  /* ---------------------------------- */
  /* Utilities                          */
  /* ---------------------------------- */

  const toEnglish = (value: string) =>
    value.replace(/[۰-۹]/g, d => String(d.charCodeAt(0) - 1776));

  const toNumber = (value: any) =>
    Number(toEnglish(String(value ?? 0))) || 0;

  const calculatePreview = (
    base: number,
    change: number,
    type: 'plus' | 'minus',
    tax: boolean
  ) => {
    let result = type == 'plus' ? base + change : base - change;
    if (tax) result += result * 0.1;
    return Math.max(result, 0);
  };

  /* ---------------------------------- */
  /* State Handling                     */
  /* ---------------------------------- */

  const updateField = useCallback((
    productId: string,
    field: keyof ProductPriceState,
    value: string | boolean
  ) => {
    setPriceData(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value
      }
    }));
  }, []);

  /* ---------------------------------- */
  /* Submit Single Row                  */
  /* ---------------------------------- */

const submitSingle = async (product: Product) => {

  const id = product._id;
  const state = priceData[id] ?? {};
  const lastPrice = product?.prices?.[0];

  const payload = {
    basePrice: toEnglish(
      state.basePrice ?? String(lastPrice?.basePrice ?? 0)
    ),
    changeValue: toEnglish(
      state.changeValue ?? "0"
    ),
    changeType: state.changeType ?? "plus",
    calculateTax: state.calculateTax ?? lastPrice?.calculateTax ?? true
  };

  setRowLoading(prev => ({ ...prev, [id]: true }));

  const result = await EditProductPriceByAxios(id, payload);

  setTimeout(() => {
    setRowLoading(prev => ({ ...prev, [id]: false }));
  }, 500);

  if (result?.status == 200 && result?.price) {

    setProducts(prev =>
        prev.map(p => {
        if (p._id != id) return p;

        const oldLastPrice = p.prices?.[0] ?? {};

        return {
            ...p,
            prices: [
            {
                ...oldLastPrice,      // keep missing fields
                calculatedPrice: result.price        // overwrite only returned fields
            },
            ...(p.prices ?? [])
            ]
        };
        })
    );

    setPriceData(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
    });

  }

  setSimpleToastData({
    show: true,
    message:
      result?.status == 200
        ? result?.message
        : result?.response?.data?.message,
    status: result?.status == 200 ? "success" : "error"
  });
};


  /* ---------------------------------- */
  /* Bulk Submit                        */
  /* ---------------------------------- */

//   const submitBulk = async () => {

//     const ids = Object.keys(priceData);
//     if (!ids.length) return;

//     setBulkLoading(true);

//     await Promise.all(
//       ids.map(id => {
//         const product = products.find(p => p._id == id);
//         if (!product) return;

//         const state = priceData[id];
//         const lastPrice = product?.prices?.[0];

//         return EditProductPriceByAxios(id, {
//           basePrice: toEnglish(
//             state.basePrice ?? String(lastPrice?.basePrice ?? 0)
//           ),
//           changeValue: toEnglish(
//             state.changeValue ?? "0"
//           ),
//           changeType: state.changeType ?? "plus",
//           calculateTax: state.calculateTax ?? lastPrice?.calculateTax ?? true
//         });
//       })
//     );

//     setTimeout(() => {
//         setBulkLoading(false);
//     }, 500);

//     setPriceData({});

//     setSimpleToastData({
//       show: true,
//       message: "تمامی قیمت ها با موفقیت ثبت شد.",
//       status: "success"
//     });
//   };

const submitBulk = async () => {

  const ids = Object.keys(priceData);
  if (!ids.length) return;

  setBulkLoading(true);

  const results = await Promise.all(
    ids.map(async (id) => {
      const product = products.find(p => p._id == id);
      if (!product) return null;

      const state = priceData[id];
      const lastPrice = product?.prices?.[0];

      const payload = {
        basePrice: toEnglish(state.basePrice ?? String(lastPrice?.basePrice ?? 0)),
        changeValue: toEnglish(state.changeValue ?? "0"),
        changeType: state.changeType ?? "plus",
        calculateTax: state.calculateTax ?? lastPrice?.calculateTax ?? true
      };

      const res = await EditProductPriceByAxios(id, payload);
      return { id, res };
    })
  );

  // Merge backend price into existing product state
  setProducts(prev =>
    prev.map(p => {
      const resultForThis = results.find(r => r?.id == p._id)?.res;
      if (!resultForThis || resultForThis?.status != 200 || !resultForThis.price) return p;

      const oldLastPrice = p.prices?.[0] ?? {};

      return {
        ...p,
        prices: [
          { ...oldLastPrice, ...resultForThis.price },
          ...(p.prices?.slice(1) ?? [])
        ]
      };
    })
  );

  setTimeout(() => {
    setBulkLoading(false);
  }, 500);

  setPriceData({});

  setSimpleToastData({
    show: true,
    message: "تمامی قیمت ها با موفقیت ثبت شد.",
    status: "success"
  });
};


  /* ---------------------------------- */
  /* Render                             */
  /* ---------------------------------- */

  return (
    <div className={`p-2 w-full min-h-screen rounded back-theme-${theme}`}>
      <h2 className="text-lg p-3">لیست قیمت محصولات</h2>

      <div className="w-11/12 mx-auto text-left mb-2">
        <button
          disabled={bulkLoading}
          onClick={submitBulk}
          className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          {bulkLoading ? "در حال ثبت ..." : "ثبت همه تغییرات"}
        </button>
      </div>

      <div className="w-11/12 mx-auto p-3 rounded-lg border text-center">
        <div className="overflow-x-auto">

          <table className="w-full min-w-max table-auto">
            <thead>
              <tr className="border-b-2">
                <th className="p-2">ردیف</th>
                <th className="p-2">نام محصول</th>
                <th className="p-2">قیمت فعلی</th>
                <th className="p-2">قیمت پایه</th>
                <th className="p-2">نوع تغییر</th>
                <th className="p-2">مقدار تغییر</th>
                <th className="p-2">مالیات</th>
                <th className="p-2">پیش نمایش قیمت</th>
                <th className="p-2">عملیات</th>
                <th className="p-2">تاریخچه</th>
                <th className="p-2">جزئیات</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => {

                const lastPrice = product?.prices?.[0];
                const state = priceData[product._id] ?? {};

                const base = state.basePrice ?? lastPrice?.basePrice ?? 0;
                const changeValue = state.changeValue ?? 0;
                const changeType = state.changeType ?? "plus";
                const tax = state.calculateTax ?? lastPrice?.calculateTax ?? true;

                const preview = calculatePreview(
                  toNumber(base),
                  toNumber(changeValue),
                  changeType,
                  tax
                );

                const baseLocked = !!lastPrice?.basePrice;

                return (
                  <tr key={product._id} className="even:bg-[#c9bfae] even:text-[#48514b]">

                    <td className="p-2">{convertNumbersToPersian(index + 1)}</td>
                    <td className="p-2">{product.name}</td>

                    <td className="p-2">
                      {convertNumbersToPersian(lastPrice?.calculatedPrice || 0)}
                    </td>

                    <td className="p-2">
                      <input
                        type="text"
                        // readOnly={baseLocked}
                        value={convertNumbersToPersian(base)}
                        onChange={(e) =>
                          updateField(product._id, "basePrice", e.target.value)
                        }
                        className="border rounded p-1"
                      />
                    </td>

                    <td className="p-2">
                      <select
                        value={changeType}
                        onChange={(e) =>
                          updateField(product._id, "changeType", e.target.value)
                        }
                        className="border rounded"
                      >
                        <option value="plus">افزایش</option>
                        <option value="minus">کاهش</option>
                      </select>
                    </td>

                    <td className="p-2">
                      <input
                        type="text"
                        value={convertNumbersToPersian(changeValue)}
                        onChange={(e) =>
                          updateField(product._id, "changeValue", e.target.value)
                        }
                        className="border rounded p-1"
                      />
                    </td>

                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={tax}
                        onChange={(e) =>
                          updateField(product._id, "calculateTax", e.target.checked)
                        }
                        className="w-5 h-5 cursor-pointer"
                      />
                    </td>

                    <td className="p-2 font-bold text-green-700">
                      {convertNumbersToPersian(preview)}
                    </td>

                    <td className="p-2">
                      <button
                        disabled={rowLoading[product._id]}
                        onClick={() => submitSingle(product)}
                        className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer"
                      >
                        {rowLoading[product._id] ? "..." : "ثبت"}
                      </button>
                    </td>

                    <td className="p-2">
                      <Link prefetch={false}
                        href={`/admin/product/price-changes/${product._id}`}
                        className="rounded bg-blue-400 text-white p-1 text-sm">
                        تاریخچه
                      </Link>
                    </td>

                    <td className="p-2">
                      <Link prefetch={false}
                        href={`/admin/product/edit/${product._id}`}
                        className="rounded bg-blue-400 text-white p-1 text-sm">
                        جزئیات
                      </Link>
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
