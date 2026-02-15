/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Link from "next/link";
import { useState } from "react";
import { convertNumbersToEnglish, convertNumbersToPersian, toNumber } from "@/assets/scripts/common/common";
import { useAdminMainContext } from "@/utils/contexts/adminContexts/adminMainContexts";
import { Product } from "@/utils/interfaces/admin-interfaces/product.interface";
import { EditProductPriceByAxios, EditProductsPricesListByAxios } from "@/utils/services/admin-services/admin-services";

type ProductPriceState = {
  basePrice?: string;
  changeValue?: string;
  changeType?: 'plus' | 'minus';
  calculateTax?: boolean;
};

export default function AdminProductsPricesListMainContentComponent({ productsList } : { productsList: Product[] }) {

  const { theme, setSimpleToastData } = useAdminMainContext();

  const [products , setProducts] = useState<Product[]>(productsList);

  const [priceData, setPriceData] = useState<Record<string, ProductPriceState>>({});
  const [rowLoading, setRowLoading] = useState<Record<string, boolean>>({});
  const [listLoading, setListLoading] = useState(false);

  const calculatePreview = (
    base: number | string,
    change: number | string,
    type: 'plus' | 'minus',
    tax: boolean
  ) => {

    base = toNumber(base);
    change = toNumber(change);
    let result = type == 'plus' ? base + change : base - change;
    if (tax) result *= 1.1;
    return Math.max(result, 0);

  };

  const handleSetPriceData = ( productId: string, key: keyof ProductPriceState, value: string | boolean ) => {
    setPriceData(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [key]: value
      }
    }));
  };

  const handleEditProductPriceByAxios = async (product: Product) => {

    const id = product._id;
    const state = priceData[id] ?? {};
    const lastPrice = product?.prices?.[0];

    const payload = {
      basePrice: convertNumbersToEnglish(state.basePrice ?? String(lastPrice?.basePrice ?? 0)),
      changeValue: convertNumbersToEnglish(state.changeValue ?? "0"),
      changeType: state.changeType ?? "plus",
      calculateTax: state.calculateTax ?? lastPrice?.calculateTax ?? true
    };

    setRowLoading(prev => ({ ...prev, [id]: true }));

    const result = await EditProductPriceByAxios(id, payload);

    if (result?.status == 200 && result?.price) {

      setProducts(prev =>
          prev.map(p => {
          if (p._id != id) return p;

          const oldLastPrice = p.prices?.[0] ?? {};

          return {
              ...p,
              prices: [
              {
                  ...oldLastPrice,
                  calculatedPrice: result.price
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
    
    setTimeout(() => {
      setRowLoading(prev => ({ ...prev, [id]: false }));
    }, 500);

    setSimpleToastData({
      show: true,
      message: result?.status == 200 ? result?.message : result?.response?.data?.message,
      status: result?.status == 200 ? "success" : "error"
    });
  };

  const handleEditProductsPricesListByAxios = async () => {

    setListLoading(true);

    const ids = Object.keys(priceData);
    if (!ids.length) return;

    const payload = ids.map(id => {
      const product = products.find(p => p._id == id);
      const state = priceData[id];
      const lastPrice = product?.prices?.[0];

      return {
        productId: id,
        basePrice: convertNumbersToEnglish(state.basePrice ?? String(lastPrice?.basePrice ?? 0)),
        changeValue: convertNumbersToEnglish(state.changeValue ?? "0"),
        changeType: state.changeType ?? "plus",
        calculateTax: state.calculateTax ?? lastPrice?.calculateTax ?? true
      };
    });

    const result = await EditProductsPricesListByAxios(payload);

    if (result?.status == 200) {

      result.results.forEach((item: { status: number, id: string, price: any }) => {
        if (item.status == 200) {
          setProducts(prev =>
            prev.map(p =>
              p._id == item.id
                ? {
                    ...p,
                    prices: [
                      {
                        ...p.prices?.[0],
                        calculatedPrice: item.price
                      },
                      ...(p.prices ?? [])
                    ]
                  }
                : p
            )
          );
        }
      });
    }

    setTimeout(() => {
      setListLoading(false);
    }, 500);

    setSimpleToastData({
      show: true,
      message: result?.status == 200 ? result?.message : result?.response?.data?.message,
      status: result?.status == 200 ? "success" : "error"
    });

  };

  return (
    <div className={`p-2 w-full min-h-screen rounded back-theme-${theme}`}>
      <h2 className="text-lg p-3">لیست قیمت محصولات</h2>

      <div className="w-11/12 mx-auto text-left mb-2">
        <button
          disabled={listLoading}
          onClick={handleEditProductsPricesListByAxios}
          className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          {listLoading ? "در حال ثبت ..." : "ثبت همه تغییرات"}
        </button>
      </div>

      <div className="w-11/12 mx-auto p-3 rounded-lg border text-center">
        <div className="overflow-x-auto">

          <table className="w-full min-w-max table-auto">
            <thead>
              <tr className="border-b-2">
                <th className="p-2">ردیف</th>
                <th className="p-2">نام محصول</th>
                <th className="p-2">قیمت پایه</th>
                <th className="p-2">نوع تغییر</th>
                <th className="p-2">مقدار تغییر</th>
                <th className="p-2">مالیات</th>
                <th className="p-2">پیش نمایش قیمت</th>
                <th className="p-2">قیمت فعلی</th>
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
                  base,
                  changeValue,
                  changeType,
                  tax
                );

                // const baseLocked = !!lastPrice?.basePrice;

                return (
                  <tr key={product._id} className="even:bg-[#c9bfae] even:text-[#48514b]">

                    <td className="p-2">{convertNumbersToPersian(index + 1)}</td>
                    <td className="p-2">{product.name}</td>

                    <td className="p-2">
                      <input
                        type="text"
                        // readOnly={baseLocked}
                        value={convertNumbersToPersian(base)}
                        onChange={(e) => handleSetPriceData(product._id, "basePrice", e.target.value)}
                        className="border rounded p-1"
                      />
                    </td>

                    <td className="p-2">
                      <select
                        value={changeType}
                        onChange={(e) => handleSetPriceData(product._id, "changeType", e.target.value)}
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
                        onChange={(e) => handleSetPriceData(product._id, "changeValue", e.target.value)}
                        className="border rounded p-1"
                      />
                    </td>

                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={tax}
                        onChange={(e) => handleSetPriceData(product._id, "calculateTax", e.target.checked)}
                        className="w-5 h-5 cursor-pointer"
                      />
                    </td>

                    <td className="p-2">
                      <p className="border-b">
                        {convertNumbersToPersian(preview)}
                      </p>
                    </td>

                    <td className="p-2 font-bold">
                      {convertNumbersToPersian(lastPrice?.calculatedPrice || 0)}
                    </td>

                    <td className="p-2">
                      <button
                        disabled={rowLoading[product._id]}
                        onClick={() => handleEditProductPriceByAxios(product)}
                        className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer"
                      >
                        {rowLoading[product._id] ? "..." : "ثبت"}
                      </button>
                    </td>

                    <td className="p-2">
                      <Link prefetch={false}
                        href={`/admin/product/price-changes/${product._id}`}
                        className="rounded bg-blue-400 text-white p-1 text-sm"
                      >
                        تاریخچه
                      </Link>
                    </td>

                    <td className="p-2">
                      <Link prefetch={false}
                        href={`/admin/product/edit/${product._id}`}
                        className="rounded bg-blue-400 text-white p-1 text-sm"
                      >
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
