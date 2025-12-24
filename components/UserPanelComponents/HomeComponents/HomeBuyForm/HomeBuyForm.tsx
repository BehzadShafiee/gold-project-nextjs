'use client'

import { convertNumbersToEnglish, convertNumbersToPersian } from '@/assets/scripts/common/common';
import HomeStyles from '@/assets/styles/pages/home.module.css';
import { useUserMainContext } from '@/utils/contexts/userContexts/userMainContexts';
import { Product } from '@/utils/interfaces/admin-interfaces/product.interface';
import { submitBuyOrderByAxios } from '@/utils/services/customer-services/customer-services';
import { FormEvent , useEffect, useState } from 'react';

export default function HomeBuyForm({ userId , productsList } : { userId : string | undefined , productsList : Product[]}) {

    const { theme , setSimpleToastData } = useUserMainContext();

    const [selectedProduct , setSelectedProduct] = useState<Product | null>(null);

    const [buyForm , setBuyForm] = useState({
        order_type: 1, // 1 is for buy
        user_id: userId,
        selected_product: '',
        weight_value:'',
        weight_unit: '',
        price_value:'',
        currency: selectedProduct?.currency || 'rial'
    });

    const currencyList : { [key: string]: string } = {'IRT':'تومان','IRR':'ریال','USD':'دلار'};
    const unitsList : { [key: string]: string } = {'item':'عدد','gr':'گرم','mithqal':'مثقال','miliGram':'سوت'};
    const priceUnitsList : { [key: string]: string } = {'perGram':'هر گرم','perMithqal':'هر مثقال','perMiliGram':'هر سوت','perItem':'هر عدد','perTotal':'کل'};

    const handleSetSelectedProduct = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProduct(productsList.filter(p => p._id == e.target.value)[0]);
        handleSetBuyForm(e.target.value , 'selected_product');
        // handleSetBuyForm(selectedProduct?.unit || 'gr' , 'weight_unit');
    }

    const handleSetBuyForm = (value:number | string , type: string) => {
        
        value = value.toString();
        const regex = /^[0-9]+(\.[0-9]+)?$/;
        const isNum = regex.test(value);

        // if(isNum || value == ''){
            value = value.toString();
            switch (type) {
                case 'selected_product':
                    setBuyForm({...buyForm ,  selected_product: value});
                    break;
                case 'weight_value':
                    setBuyForm({...buyForm ,  weight_value: value});
                    break;
                case 'weight_unit':
                    setBuyForm({...buyForm , weight_unit: value});
                    break;
                case 'price_value':
                    setBuyForm({...buyForm , price_value: value});
                    break;
                default:
                    break;
            }
        // }

    }
    
    const handleSetBuyOrder = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = await submitBuyOrderByAxios(buyForm);

        setSimpleToastData({
            show: true,
            message: result?.status == 200 ? result?.message : result?.response?.data?.message,
            status: result?.status == 200 ? 'success' : 'error'
        });

    };

    useEffect(() => {
        if (selectedProduct) {
            handleSetBuyForm(selectedProduct.unit || 'gr', 'weight_unit');
        }
    }, [selectedProduct]);

  return (
    <>
        <form onSubmit={(e) => handleSetBuyOrder(e)} className='w-full h-[70vh] flex flex-col justify-between'>
            <div className={`w-full rounded-lg back-theme-${theme} p-2`}>
                <div className={`${HomeStyles.home_buy_form_price_section} w-full relative`}>
                    <div className={`flex items-center justify-between back-theme-${theme}`}>
                        <div className={`z-2 back-theme-${theme} pl-2`}>قیمت خرید</div>
                        <div className={`z-2 back-theme-${theme} pr-2`}>۱۰,۵۶۸,۹۹۰ <small>تومان </small></div>
                    </div>
                </div>
                <br/>
                <div className={`${HomeStyles.home_buy_form_price_section} w-full relative`}>
                    <div className={`flex items-center justify-between back-theme-${theme}`}>
                        <div className={`z-2 back-theme-${theme} pl-2`}>موجودی کیف پول</div>
                        <div className={`z-2 back-theme-${theme} pr-2`}>۵,۰۰۰,۰۰۰<small>تومان </small></div>
                    </div>
                </div>
            </div>
            <br/>
            <div className={`text-start ${theme == 'light' ? 'color-black-light' : '' } font-16 ps-1`}>محصول مورد نظر</div>
            <div className={`flex border-2 ${theme == 'light' ? 'border-[#d0a12b]' : 'border-white' } rounded-lg overflow-hidden my-2`}>
                <select
                    onChange={(e) => handleSetSelectedProduct(e)}
                    className={`w-2/4 xl:w-1/3 border-l-2 ${theme == 'light' ? 'border-[#d0a12b] color-black-light' : 'border-white' } font-bold p-2 focus:border-l-2`}
                >
                    <option value="">انتخاب محصول</option>
                    {
                        productsList.map((product : Product) => {
                            return(
                                <option key={product._id} value={product._id}>{product.name}</option>
                            )
                        })
                    }
                </select>
                <input
                    onChange={(e) => handleSetBuyForm(convertNumbersToEnglish(e.target.value) , e.target.name)}
                    value={convertNumbersToPersian(buyForm.weight_value)}
                    type="text"
                    name='weight_value'
                    className={`w-1/4 xl:w-1/3 border-l-2 ${theme == 'light' ? 'border-[#d0a12b] color-black-light' : 'border-white' } font-bold p-2 focus:border-l-2`} placeholder='مقدار ...'
                />
                <select
                    onChange={(e) => handleSetBuyForm(e.target.value , e.target.name)}
                    value={buyForm.weight_unit}
                    name="weight_unit"
                    className={`back-theme-${theme} w-1/4 ${theme == 'light' ? 'color-black-light' : '' } p-2 text-center`}
                    hidden
                >
                    <option value=""></option>
                    <option value={`${selectedProduct?.unit}`}>{selectedProduct?.unit && unitsList[selectedProduct?.unit]}</option>
                </select>
                <div className={`back-theme-${theme} w-1/4 xl:w-1/3 ${theme == 'light' ? 'color-black-light' : '' } p-2 text-center`}>واحد: {selectedProduct?.unit && unitsList[selectedProduct?.unit]}</div>
            </div>
            <div className={`${HomeStyles.home_buy_form_price_section} rounded-lg back-theme-${theme} mx-auto text-center p-3 relative w-full`}>
                <div className={`flex items-center justify-between back-theme-${theme}`}>
                    <div className={`z-2 back-theme-${theme} pl-2`}>کل موجودی {selectedProduct?.name}</div>
                    <div className={`z-2 back-theme-${theme} pr-2 font-bold font-18`}>{convertNumbersToPersian(selectedProduct?.weightOrNumber)}<small> {selectedProduct?.unit && unitsList[selectedProduct?.unit]}</small></div>
                </div>
            </div>
            <div className={`${HomeStyles.home_buy_form_price_section} rounded-lg back-theme-${theme} mx-auto text-center p-3 relative w-full`}>
                <div className={`flex items-center justify-between back-${theme}`}>
                    <div className={`z-2 back-theme-${theme} pl-2`}>قیمت {selectedProduct?.prices && priceUnitsList[selectedProduct?.prices[0]?.priceUnit]}</div>
                    <div className={`z-2 back-theme-${theme} pr-2 font-bold font-18`}>{convertNumbersToPersian(selectedProduct?.prices[0]?.calculatedPrice)}<small> {selectedProduct?.prices && currencyList[selectedProduct?.prices[0]?.currency]}</small></div>
                </div>
            </div>
            <br/>
            <div className={`text-start ${theme == 'light' ? 'color-black-light' : ''} font-16 ps-1`}>مبلغ مورد نظر</div>
            <div className={`flex border-2 ${theme == 'dark' ? 'border-white' : 'border-[#d0a12b]'} rounded-lg overflow-hidden my-2`}>
                <input
                    onChange={(e) => handleSetBuyForm(convertNumbersToEnglish(e.target.value) , e.target.name)}
                    value={convertNumbersToPersian(buyForm.price_value)}
                    type="text"
                    name='price_value'
                    className={`w-3/5 border-l-2 ${theme == 'light' ? 'border-[#d0a12b] color-black-light' : 'border-white'} font-bold p-2 focus:border-l-2`}
                    placeholder='مبلغ مورد نظر ...'
                />
                <button type='button' className={`w-2/5 ${theme == 'light' ? 'back-gray-light color-black-light' : ''} cursor-pointer`}>کل موجودی کیف پول</button>
            </div>
            <br/>
            <div className={`w-full rounded-lg back-theme-${theme} p-2`}>
                <div className={`${HomeStyles.home_buy_form_price_section} w-full relative`}>
                    <div className={`flex items-center justify-between back-theme-${theme}`}>
                        <div className={`z-2 back-theme-${theme} pl-2`}>کارمزد خرید</div>
                        <div className={`z-2 back-theme-${theme} pr-2`}>۱,۰۰۰ <small>تومان </small></div>
                    </div>
                </div>
                <br/>
                <div className={`${HomeStyles.home_buy_form_price_section} w-full relative`}>
                    <div className={`flex items-center justify-between back-theme-${theme}`}>
                        <div className={`z-2 back-theme-${theme} pl-2`}>هزینه بیمه</div>
                        <div className={`z-2 back-theme-${theme} pr-2`}>۵,۰۰۰<small>تومان </small></div>
                    </div>
                </div>
                <br/>
                <div className={`${HomeStyles.home_buy_form_price_section} w-full relative`}>
                    <div className={`flex items-center justify-between back-theme-${theme}`}>
                        <div className={`z-2 back-theme-${theme} pl-2 ${theme == 'light' ? 'color-black-light' : ''} `}>مبلغ نهایی</div>
                        <div className={`z-2 back-theme-${theme} pr-2 font-bold font-18 ${theme == 'light' ? 'color-black-light' : ''}`}>۵۰,۰۰۰,۰۰۰<small className={`${theme == 'light' ? 'color-black-light' : ''} font-14`}> تومان</small></div>
                    </div>
                </div>
            </div>
            <br/>
            <div className="flex gap-2">
                <button className={`w-1/2 rounded-lg py-2 cursor-pointer border back-theme-${theme} hover:shadow-lg transition-all`}>پرداخت از کیف پول</button>
                <button className='w-1/2 rounded-lg py-2 cursor-pointer back-gold color-white hover:shadow-lg transition-all'>پرداخت نقدی</button>
            </div>
        </form>
    </>
  )
}
