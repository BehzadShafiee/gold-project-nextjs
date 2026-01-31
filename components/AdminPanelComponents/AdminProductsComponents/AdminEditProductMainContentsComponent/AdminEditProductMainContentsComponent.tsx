'use client'

import { useEffect, useState, FormEvent } from 'react';
import { Product, ProductAttribute, ProductPrice } from '@/utils/interfaces/admin-interfaces/product.interface';
import { EditProductByAxios } from '@/utils/services/admin-services/admin-services';
import { useAdminMainContext } from '@/utils/contexts/adminContexts/adminMainContexts';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminEditProductMainContentsComponent({ productData } : {productData : Product}) {

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(productData);
  const [attributes, setAttributes] = useState<ProductAttribute[]>([]);
  const [prices, setPrices] = useState<ProductPrice[]>([]);
  const { theme , setSimpleToastData } = useAdminMainContext();

  const operatorOptions = ['none', '+', '-', '*', '/'];

  useEffect(() => {
    if (!productData) return;

    setTimeout(() => {
      setProduct(productData);
      setAttributes(productData.details?.attributes || []);
      setPrices(productData.prices || []);
      setLoading(false);
    }, 0);
  }, [productData]);

  const updateProductField = (field: keyof Product, value: string | number | boolean) => {
    setProduct(prev => prev ? { ...prev, [field]: value } : prev);
    console.log(product);
    
  }

  const addAttribute = () => {
    setAttributes(prev => [
      ...prev,
      { key: '', value: 0, unit: '', calculateOnPrice: false, operator: 'none' }
    ]);
  }

  const removeAttribute = (idx: number) => {
    setAttributes(prev => prev.filter((_, i) => i !== idx));
  }

  const updateAttribute = (idx: number, field: keyof ProductAttribute, value: string | number | boolean) => {
    setAttributes(prev => {
      const copy = [...prev]
      copy[idx] = { ...copy[idx], [field]: value }
      return copy
    });
  }

  const addPrice = () => {
    setPrices(prev => [
      ...prev,
      { _id: '', product: product?._id || '', basePrice: 0, priceUnit: 'perGram', currency: 'IRR', calculatedPrice: 0, createdAt: '' }
    ]);
  }

  const removePrice = (idx: number) => {
    setPrices(prev => prev.filter((_, i) => i !== idx));
  }

  const updatePrice = (idx: number, field: keyof ProductPrice, value: string | number | boolean) => {
    setPrices(prev => {
      const copy = [...prev]
      copy[idx] = { ...copy[idx], [field]: value }
      return copy
    });
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!product) return;

    const payload = {
      product: {
        name: product.name,
        code: product.code,
        category: product.category,
        standard: product.standard,
        weightOrNumber: product.weightOrNumber,
        unit: product.unit
      },
      attributes: attributes,
      prices: prices
    }

    try {
      const res = await EditProductByAxios(product._id , payload);
      setSimpleToastData({
        show: true,
        message: 'محصول با موفقیت ویرایش شد',
        status: 'success'
      });
      setTimeout(() => {
        router.push('/admin/products');
      }, 500);
    } catch (err: unknown) {
      console.error('Error updating product:', err);
      setSimpleToastData({
        show: true,
        message: 'خطا در ویرایش محصول',
        status: 'error'
      });
    }
  }

  if (loading) return <div className="p-6 text-center">در حال بارگذاری...</div>
  if (!product) return <div className="p-6 text-center">محصولی یافت نشد.</div>

  return (
    <div className={`p-2 w-full min-h-screen rounded back-theme-${theme}`}>
        <h2 className="text-lg p-3">ویرایش محصول: {productData.name}</h2>
        <div className='w-11/12 mt-10 mx-auto p-3 rounded-lg border text-center'>
          
          {
            productData.from_customer ? 
              <div className='w-1/2 mx-auto mb-5 rounded border p-3'>
                <p>ثبت شده از فاکتور مشتری</p>
                <Link prefetch={false} href={`/admin/order/${productData.related_order}`} className='text-blue-500 text-sm'>فاکتور مربوطه</Link>
              </div>
            :''
          }

          <div className='p-2 mt-4'>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <div className='text-start'>
                  <label className="pr-2">نام محصول</label>
                  <br/>
                  <input
                    className={`min-w-40 h-10 border border-gray-300 rounded-lg px-2 ${theme == 'light' ? 'color-black-light' : ''} `}
                    value={product.name}
                    onChange={e => updateProductField('name', e.target.value)}
                  />
                </div>

                <div className='text-start'>
                  <label className="pr-2">عیار</label>
                  <br/>
                  <select
                    value={product.standard}
                    onChange={e => updateProductField('standard', Number(e.target.value))}
                    className={`min-w-40 h-10 border border-gray-300 rounded-lg px-2 ${theme == 'light' ? 'color-black-light' : ''} `}
                  >
                    <option value={18}>۱۸</option>
                    <option value={24}>۲۴</option>
                  </select>
                </div>

                <div className='text-start'>
                  <label className="pr-2">مقدار محصول</label>
                  <br/>
                  <input
                    className={`min-w-40 h-10 border border-gray-300 rounded-lg px-2 ${theme == 'light' ? 'color-black-light' : ''} `}
                    value={product.weightOrNumber || ''}
                    onChange={e => updateProductField('weightOrNumber', e.target.value)}
                  />
                </div>

                <div className='text-start'>
                  <label className="pr-2">واحد محصول</label>
                  <br/>
                  <select
                    value={product.unit || 'gr'}
                    onChange={e => updateProductField('unit', e.target.value)}
                    className={`min-w-40 h-10 border border-gray-300 rounded-lg px-2 ${theme == 'light' ? 'color-black-light' : ''} `}
                  >
                    <option value="gr">گرم</option>
                    <option value="mithqal">مثقال</option>
                    <option value="miliGram">سوت</option>
                    <option value="item">عدد</option>
                  </select>
                </div>

                <div className='text-start'>
                  <label className="pr-2">کد</label>
                  <br/>
                  <input
                    className={`min-w-40 h-10 border border-gray-300 rounded-lg px-2 ${theme == 'light' ? 'color-black-light' : ''} `}
                    value={product.code || ''}
                    onChange={e => updateProductField('code', e.target.value)}
                  />
                </div>


                <div className='text-start'>
                  <label className="pr-2">دسته</label>
                  <br/>
                  <input
                    className={`min-w-40 h-10 border border-gray-300 rounded-lg px-2 ${theme == 'light' ? 'color-black-light' : ''} `}
                    value={product.category || ''}
                    onChange={e => updateProductField('category', e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="mb-2 font-medium">قیمت محصول</h3>
                {prices.map((p, idx) => (
                  <div key={idx} className="flex flex-wrap gap-2 items-center justify-evenly border p-2 rounded my-3">
                    <div>
                      <label className="pr-2">قیمت پایه</label>
                      <br/>
                       <select
                        value={p.priceUnit || 'perGram'}
                        onChange={e => updatePrice(idx, 'priceUnit', e.target.value)}
                        className={`min-w-40 h-10 border border-gray-300 rounded-r-lg px-2 ${theme == 'light' ? 'color-black-light' : ''} `}
                      >
                        <option value="perGram">هر گرم</option>
                        <option value="perMithqal">هر مثقال</option>
                        <option value="perMiliGram">هر سوت</option>
                        <option value="perItem">هر عدد</option>
                        <option value="perTotal">قیمت کل</option>
                      </select>
                      <input
                        type="number"
                        min={0}
                        className={`min-w-40 h-10 border border-gray-300 px-2 ${theme == 'light' ? 'color-black-light' : ''} `}
                        value={p.basePrice}
                        onChange={e => updatePrice(idx, 'basePrice', Number(e.target.value))}
                      />
                      <select
                        value={p.currency}
                        onChange={e => updatePrice(idx, 'currency', e.target.value)}
                        className={`min-w-40 h-10 border border-gray-300 rounded-l-lg px-2 ${theme == 'light' ? 'color-black-light' : ''} `}
                      >
                        <option value="IRR">ریال</option>
                        <option value="IRT">تومان</option>
                        <option value="USD">دلار</option>
                      </select>
                    </div>
                    <span className={`text-sm ${theme == 'light' ? 'color-black-light' : ''} `}>قیمت نهایی محاسبه شده: {p.calculatedPrice}</span>

                    {/* <button
                      type="button"
                      onClick={() => removePrice(idx)}
                      className="bg-red-400 text-white px-3 py-1 rounded transition-all cursor-pointer hover:bg-red-500"
                    >
                      حذف
                    </button> */}
                  </div>
                ))}

                {/* <div className="text-start">
                  <button
                    type="button"
                    onClick={addPrice}
                    className="mt-3 border px-4 py-2 rounded cursor-pointer transition-all hover:bg-[#d0a12b] hover:text-[#f8faf9]"
                  >
                    + افزودن قیمت جدید
                  </button>
                </div> */}
              </div>

              <div className="mt-6">
                <h3 className="mb-2 font-medium">ویژگی‌ها</h3>
                {attributes.map((attr, idx) => (
                  <div key={idx} className="flex flex-wrap gap-2 items-center justify-evenly border p-2 rounded my-3">
                    <input
                      placeholder="نام ویژگی"
                      className={`min-w-40 h-10 border border-gray-300 rounded-lg px-2 ${theme == 'light' ? 'color-black-light' : ''} `}
                      value={attr.key}
                      onChange={e => updateAttribute(idx, 'key', e.target.value)}
                    />
                    <input
                      placeholder="مقدار"
                      className={`min-w-40 h-10 border border-gray-300 rounded-lg px-2 ${theme == 'light' ? 'color-black-light' : ''} `}
                      value={attr.value}
                      onChange={e => updateAttribute(idx, 'value', Number(e.target.value))}
                    />
                    <input
                      placeholder="واحد"
                      className={`min-w-40 h-10 border border-gray-300 rounded-lg px-2 ${theme == 'light' ? 'color-black-light' : ''} `}
                      value={attr.unit || ''}
                      onChange={e => updateAttribute(idx, 'unit', e.target.value)}
                    />
                    <div className='flex items-center'>
                      <label htmlFor={`calculate-in-price-${idx}`} className="px-2 select-none cursor-pointer">محاسبه در قیمت</label>
                      <input
                        id={`calculate-in-price-${idx}`}
                        className="w-5 h-5 cursor-pointer"
                        type="checkbox"
                        checked={attr.calculateOnPrice}
                        onChange={e =>
                          updateAttribute(idx, 'calculateOnPrice', e.target.checked)
                        }
                      />
                    </div>
                    <div className='text-start'>
                      <label className="px-2">نوع محاسبه گر</label>
                      <select
                        value={attr.operator}
                        onChange={e =>
                          updateAttribute(idx, 'operator', e.target.value)
                        }
                        className={`min-w-40 h-10 border border-gray-300 rounded-lg px-2 ${theme == 'light' ? 'color-black-light' : ''} `}
                      >
                        {operatorOptions.map(op => (
                          <option key={op} value={op}>
                            {op === 'none' ? 'هیچ کدام' : op}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeAttribute(idx)}
                      className="bg-red-400 text-white px-3 py-1 rounded transition-all cursor-pointer hover:bg-red-500"
                    >
                      حذف
                    </button>
                  </div>
                ))}

                <div className="text-start">
                  <button
                    type="button"
                    onClick={addAttribute}
                    className="mt-3 border px-4 py-2 rounded cursor-pointer transition-all hover:bg-[#d0a12b] hover:text-[#f8faf9]"
                  >
                    + افزودن ویژگی جدید
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer transition-all hover:bg-green-700"
                >
                  ذخیره تغییرات
                </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  )
}
