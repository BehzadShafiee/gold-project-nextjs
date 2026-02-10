
'use client'

import { useState , FormEvent } from 'react';
import { useAdminMainContext } from '@/utils/contexts/adminContexts/adminMainContexts';
import { submitNewProductByAxios } from '@/utils/services/admin-services/admin-services';
import { convertNumbersToEnglish } from '@/assets/scripts/common/common';

// Define types
interface Attribute {
  key: string
  value: string | number
  unit?: string
  calculateOnPrice: boolean
  operator: 'none' | '+' | '-' | '*' | '/'
}

interface ProductPayload {
  product: {
    name: string
    code?: string
    weightOrNumber: string
    unit: string
    category?: string
    standard: number
  }
  attributes: Attribute[]
  price: {
    basePrice: number
    priceUnit: string
    currency: string
  }
}

export default function AdminCreateProductMainContentsComponent() {

  const { theme , setSimpleToastData } = useAdminMainContext();

  const [productName, setProductName] = useState('');
  const [standard, setStandard] = useState('18');
  const [category, setCategory] = useState('');
  const [code, setCode] = useState('');
  const [weightOrNumber, setWeightOrNumber] = useState('');
  const [unit, setUnit] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [priceUnit, setPriceUnit] = useState('perGram');
  const [currency, setCurrency] = useState('IRR');

  const [attributes, setAttributes] = useState<Attribute[]>([])

  const operatorOptions: Attribute['operator'][] = ['none', '+', '-', '*', '/']

  const addAttribute = () => {
    setAttributes(prev => [
      ...prev,
      { key: '', value: '', unit: '', calculateOnPrice: false, operator: 'none' }
    ]);
  }

  const removeAttribute = (idx: number) => {
    setAttributes(prev => prev.filter((_, i) => i != idx))
  }

  const updateAttribute = (idx: number, field: keyof Attribute, value: string | number | boolean) => {
    setAttributes(prev => {
      const updated = [...prev]
      updated[idx] = { ...updated[idx], [field]: value }
      return updated
    });
  }

    const calculateTax = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        const priceNum = Number(convertNumbersToEnglish(basePrice));
        if (checked) {
            const priceWithTax = Math.round(priceNum + priceNum * 0.1);
            setBasePrice(priceWithTax.toString());
        } else {
            const priceWithoutTax = Math.round(priceNum / 1.1);
            setBasePrice(priceWithoutTax.toString());
        }
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!productName.trim()) return alert('نام محصول را وارد کنید');
    if (Number(convertNumbersToEnglish(basePrice)) < 0) setBasePrice('');
    if (basePrice == '') return alert('قیمت پایه را وارد کنید');

    const payload: ProductPayload = {
      product: {
        name: productName.trim(),
        code: code || undefined,
        category: category || undefined,
        standard: Number(standard),
        weightOrNumber: weightOrNumber,
        unit: unit
      },
      attributes: attributes.map(attr => ({
        key: attr.key,
        value:
          attr.value == ''
            ? ''
            : isNaN(Number(attr.value))
            ? attr.value
            : Number(attr.value),
        unit: attr.unit || undefined,
        calculateOnPrice: !!attr.calculateOnPrice,
        operator: attr.operator || 'none'
      })),
      price: {
        basePrice: Number(basePrice),
        priceUnit,
        currency,
      }
    }

    try {
      const res = await submitNewProductByAxios(payload);

      setSimpleToastData({
        show: true,
        message: 'محصول با موفقیت ثبت شد',
        status: 'success'
      });

      setProductName('');
      setWeightOrNumber('');
      setUnit('');
      setStandard('18');
      setCategory('');
      setCode('');
      setBasePrice('');
      setPriceUnit('gr');
      setCurrency('IRR');
      setAttributes([]);
    } catch (err: unknown) {
        console.error('Error creating product:', err);
        setSimpleToastData({
            show: true,
            message: 'خطا در ایجاد محصول!',
            status: 'error'
        });
    }
  }

  return (
    <div className={`p-2 w-full min-h-screen rounded back-theme-${theme}`}>
        <h2 className="text-lg p-3">ثبت محصول جدید</h2>
        <div className='w-11/12 mt-10 mx-auto p-3 rounded-lg border text-center'>
            <div className='p-2 mt-4'>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-wrap gap-4">
                        <div className='text-start'>
                            <label htmlFor="product-name" className="pr-2">نام محصول</label>
                            <br/>
                            <input
                                className={`min-w-40 h-10 border border-gray-300 rounded-lg px-2 ${theme == 'light' ? 'color-black-light' : ''} `}
                                value={productName}
                                onChange={e => setProductName(e.target.value)}
                            />
                        </div>

                        <div className='text-start'>
                            <label className="pr-2">عیار</label>
                            <br/>
                            <select
                                value={standard}
                                onChange={e => setStandard(e.target.value)}
                                className={`min-w-40 h-10 border border-gray-300 rounded-lg px-2 ${theme == 'light' ? 'color-black-light' : ''} `}
                            >
                            <option value="18">۱۸</option>
                            <option value="24">۲۴</option>
                            </select>
                        </div>

                        <div className='text-start'>
                            <label className="pr-2">مقدار محصول</label>
                            <br/>
                            <input
                                className={`min-w-40 h-10 border border-gray-300 rounded-lg px-2 ${theme == 'light' ? 'color-black-light' : ''} `}
                                value={weightOrNumber}
                                onChange={e => setWeightOrNumber(e.target.value)}
                            />
                        </div>

                        <div className='text-start'>
                            <label className="pr-2">واحد محصول</label>
                            <br/>
                            <select
                                value={unit}
                                onChange={e => setUnit(e.target.value)}
                                className={`min-w-40 h-10 border border-gray-300 rounded-lg px-2 ${theme == 'light' ? 'color-black-light' : ''} `}
                            >
                                <option value="gr">گرم</option>
                                <option value="mithqal">مثقال</option>
                                <option value="miliGram">سوت</option>
                                <option value="item">عدد</option>
                            </select>
                        </div>

                        <div className='text-start'>
                            <label className="pr-2">کد (اختیاری)</label>
                            <br/>
                            <input
                                className={`min-w-40 h-10 border border-gray-300 rounded-lg px-2 ${theme == 'light' ? 'color-black-light' : ''} `}
                                value={code}
                                onChange={e => setCode(e.target.value)}
                            />
                        </div>

                        <div className='text-start'>
                            <label className="pr-2">دسته</label>
                            <br/>
                            <input
                                className={`min-w-40 h-10 border border-gray-300 rounded-lg px-2 ${theme == 'light' ? 'color-black-light' : ''} `}
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                            />
                        </div>
                        <div className='text-start'>
                            <label className="pr-2">قیمت پایه</label>
                            <br/>
                            <select
                                value={priceUnit}
                                onChange={e => setPriceUnit(e.target.value)}
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
                                value={basePrice}
                                onChange={e => setBasePrice(e.target.value)}
                            />
                            <select
                                value={currency}
                                onChange={e => setCurrency(e.target.value)}
                                className={`min-w-40 h-10 border border-gray-300 rounded-l-lg px-2 ${theme == 'light' ? 'color-black-light' : ''} `}
                            >
                                <option value="IRR">ریال</option>
                                <option value="IRT">تومان</option>
                                <option value="USD">دلار</option>
                            </select>
                        </div>
                        <div className='flex flex-col items-center justify-between'>
                            <label className="px-2">محاسبه مالیات</label>
                            <input
                                type="checkbox"
                                className="w-5 h-5 cursor-pointer"
                                onChange={(e) => {calculateTax(e)}}
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="mb-2 font-medium border-b pb-2">ویژگی‌ها (اختیاری)</h3>

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
                                    onChange={e => updateAttribute(idx, 'value', e.target.value)}
                                />
                                <input
                                    placeholder="واحد (اختیاری)"
                                    className={`min-w-40 h-10 border border-gray-300 rounded-lg px-2 ${theme == 'light' ? 'color-black-light' : ''} `}
                                    value={attr.unit || ''}
                                    onChange={e => updateAttribute(idx, 'unit', e.target.value)}
                                />

                                <div className='flex items-center'>
                                    <label htmlFor={`calculate-in-price-${idx}`} className="px-2 select-none cursor-pointer">محاسبه در قیمت</label>
                                    {/* <br/> */}
                                    <input
                                        id={`calculate-in-price-${idx}`}
                                        type="checkbox"
                                        checked={attr.calculateOnPrice}
                                        onChange={e => updateAttribute(idx, 'calculateOnPrice', e.target.checked)}
                                        className="w-5 h-5 cursor-pointer"
                                    />
                                </div>

                                <div className='text-start'>
                                    <label className="px-2">نوع محاسبه گر</label>
                                    {/* <br/> */}
                                    <select
                                        value={attr.operator}
                                        onChange={e => updateAttribute(idx, 'operator', e.target.value as Attribute['operator'])}
                                        className={`min-w-40 h-10 border border-gray-300 rounded-lg px-2 ${theme == 'light' ? 'color-black-light' : ''} `}
                                        >
                                        {operatorOptions.map(op => (
                                            <option key={op} value={op}>
                                                {op == 'none' ? 'هیچ کدام' : op}
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

                        <div className='text-start'>
                            <button
                                type="button"
                                onClick={addAttribute}
                                className="mt-3 border px-4 py-2 rounded cursor-pointer transition-all hover:bg-[#d0a12b] hover:text-[#f8faf9]"
                                >
                                + افزودن ویژگی جدید
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer transition-all hover:bg-green-700"
                    >
                        ذخیره محصول
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}
