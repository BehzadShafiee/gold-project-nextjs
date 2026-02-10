'use client'

import { convertDateToPersian, convertNumbersToPersian } from "@/assets/scripts/common/common";
import { useAdminMainContext } from "@/utils/contexts/adminContexts/adminMainContexts";
import { Product, ProductPrice } from "@/utils/interfaces/admin-interfaces/product.interface";

export default function AdminProductPriceChangesComponent({ productData } : { productData : Product }) {

    const {theme} = useAdminMainContext();

    const currencyList : { [key: string]: string } = {'IRT':'تومان','IRR':'ریال','USD':'دلار'};
    const unitsList : { [key: string]: string } = {'item':'عدد','gr':'گرم','mithqal':'مثقال','miliGram':'سوت'};
    const priceUnitsList : { [key: string]: string } = {'perGram':'هر گرم','perMithqal':'هر مثقال','perMiliGram':'هر سوت','perItem':'هر عدد','perTotal':'کل'};

  return (
    <>
    <div className={`p-2 w-full min-h-screen rounded back-theme-${theme}`}>
        <h2 className="text-lg p-3">تاریخچه ثبت قیمت {productData.name}</h2>
        <div className='w-11/12 mt-10 mx-auto p-3 rounded-lg border text-center'>
          <div className='p-2 mt-4 flex items-center justify-center flex-wrap gap-5'>
            <table className="w-full min-w-max table-auto">
                <thead>
                    <tr className="border-b-2">
                        <th className="p-2">ردیف</th>
                        <th className="p-2">قیمت نهایی</th>
                        <th className="p-2">واحد</th>
                        <th className="p-2">واحد قیمت</th>
                        <th className="p-2">میزان نوسان</th>
                        <th className="p-2">تاریخ ثبت قیمت</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                        productData?.prices.map((p : ProductPrice , index:number) => {
                            const tolerance : number | null = (productData.prices.length > 1 && index < productData.prices.length - 1) ? p.calculatedPrice - productData.prices[index + 1].calculatedPrice : null;
                            return(
                                <tr key={p._id} className="even:bg-[#c9bfae] even:text-[#48514b]">
                                    <td className="p-2">{convertNumbersToPersian(index + 1)}</td>
                                    <td className="p-2">{convertNumbersToPersian(p.calculatedPrice)}</td>
                                    <td className="p-2">{currencyList[p.currency]}</td>
                                    <td className="p-2">{priceUnitsList[p.priceUnit] || unitsList[p.priceUnit]}</td>
                                    <td className="p-2">
                                        {
                                            
                                            tolerance && tolerance > 0 ? 
                                                <span className="text-green-600">{convertNumbersToPersian(Number(tolerance))} افزایش</span>
                                            : tolerance && tolerance < 0 ?
                                                <span className="text-red-400">{convertNumbersToPersian(tolerance * -1)} کاهش</span>
                                            :
                                                <span>- - -</span>
                                        }
                                    </td>
                                    <td dir="ltr">{convertDateToPersian(p.createdAt)}</td>
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
