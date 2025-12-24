'use client'

import { convertNumbersToEnglish, convertNumbersToPersian } from '@/assets/scripts/common/common';
import { submitSellOrderByAxios } from '@/utils/services/customer-services/customer-services';
import HomeStyles from '@/assets/styles/pages/home.module.css';
import { FormEvent, useState } from 'react';
import { useUserMainContext } from '@/utils/contexts/userContexts/userMainContexts';
import { Wallet } from '@/utils/interfaces/customer-interfaces/wallet.interface';

export default function HomeSellForm({ userId , walletProductsList } : { userId : string | undefined , walletProductsList : Wallet}) {

    const { theme , setSimpleToastData } = useUserMainContext();

    const [buyForm , setBuyForm] = useState({
        order_type: 0, // 0 is for sell
        user_id: userId,
        product_name:'',
        weight_value:'',
        weight_unit:'',
        price_value:''
    });
    
    const handleSetBuyForm = (value:number | string , type: string) => {
        
        value = value.toString();
        const regex = /^[0-9]+(\.[0-9]+)?$/;
        const isNum = regex.test(value);

        // if(isNum || value == ''){
            value = value.toString();
            switch (type) {
                case 'product_name':
                    setBuyForm({...buyForm ,  product_name: value});
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

    const hadleSetSellOrder = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await submitSellOrderByAxios(buyForm);
        
        setSimpleToastData({
            show: true,
            message: result?.status == 200 ? result?.message : result?.response?.data?.message,
            status: result?.status == 200 ? 'success' : 'error'
        });
    }

  return (
    <>
        <form onSubmit={(e) => hadleSetSellOrder(e)} className='w-full h-[70vh] flex flex-col justify-between'>
            <div className={`w-full rounded-lg back-theme-${theme} p-2`}>
                <div className={`${HomeStyles.home_buy_form_price_section} w-full relative`}>
                    <div className={`flex items-center justify-between back-theme-${theme}`}>
                        <div className={`z-2 back-theme-${theme} pl-2`}>قیمت فروش</div>
                        <div className={`z-2 back-theme-${theme} pr-2`}>۱۰,۵۶۸,۹۹۰ <small>تومان </small></div>
                    </div>
                </div>
                <br/>
                <div className={`${HomeStyles.home_buy_form_price_section} w-full relative`}>
                    <div className={`flex items-center justify-between back-theme-${theme}`}>
                        <div className={`z-2 back-theme-${theme} pl-2`}>موجودی طلای شما</div>
                        <div className={`z-2 back-theme-${theme} pr-2`}>۵۰<small>گرم </small></div>
                    </div>
                </div>
            </div>
            <br/>
            <div className={`text-start ${theme == 'light' ? 'color-black-light' : ''} font-16 ps-1`}>مقدار طلای مورد نظر</div>
            <div className={`flex border-2 ${theme == 'dark' ? 'border-white' : ''} rounded-lg overflow-hidden my-2`}>
                {/* <input
                    onChange={(e) => handleSetBuyForm(e.target.value , e.target.name)}
                    value={buyForm.product_name}
                    type="text"
                    name='product_name'
                    className={`w-4/5 border-l-2 ${theme == 'light' ? 'color-black-light border-[#d0a12b]' : 'border-white'} font-bold p-2 focus:border-l-2`}
                    placeholder='محصول مورد نظر ...'
                /> */}
                <select
                    onChange={(e) => handleSetBuyForm(e.target.value , e.target.name)}
                    value={buyForm.product_name}
                    name='product_name'
                    className={`w-4/5 border-l-2 ${theme == 'light' ? 'color-black-light border-[#d0a12b]' : 'border-white'} font-bold p-2 focus:border-l-2`}
                >
                    <option value="">محصول مورد نظر</option>
                    {
                        walletProductsList?.products.map((p) => {
                            return(
                                <option key={p._id} value={p.productId}>{p.productName}</option>
                            )
                        })
                    }
                </select>
                <input
                    onChange={(e) => handleSetBuyForm(convertNumbersToEnglish(e.target.value) , e.target.name)}
                    value={convertNumbersToPersian(buyForm.weight_value)}
                    type="text"
                    name='weight_value'
                    className={`w-4/5 border-l-2 ${theme == 'light' ? 'color-black-light border-[#d0a12b]' : 'border-white'} font-bold p-2 focus:border-l-2`}
                    placeholder='مقدار مورد نظر ...'
                />
                <select
                    onChange={(e) => handleSetBuyForm(e.target.value , e.target.name)}
                    value={buyForm.weight_unit}
                    name="weight_unit"
                    className={`back-theme-${theme} w-1/5 ${theme == 'light' ? 'color-black-light' : ''} p-2 text-center`}
                >
                    <option value="">واحد</option>
                    <option value="gr">گرم</option>
                    <option value="miliGram">سوت</option>
                    <option value="mithqal">مثقال</option>
                    <option value="item">عدد</option>
                </select>
            </div>
            <br/>
            <div className={`text-start ${theme == 'light' ? 'color-black-light' : ''} font-16 ps-1`}>مبلغ مورد نظر</div>
            <div className={`flex border-2 ${theme == 'dark' ? 'border-white' : ''} rounded-lg overflow-hidden my-2`}>
                <input
                    onChange={(e) => handleSetBuyForm(convertNumbersToEnglish(e.target.value) , e.target.name)}
                    value={convertNumbersToPersian(buyForm.price_value)}
                    type="text"
                    name='price_value'
                    className={`w-4/5 border-l-2 border-white ${theme == 'light' ? 'color-black-light' : ''} font-bold p-2 focus:border-l-2`}
                    placeholder='مبلغ مورد نظر ...'
                />
                <button className={`w-1/5 ${theme == 'light' ? 'back-gray-light color-black-light' : ''} cursor-pointer`}>کل موجودی</button>
            </div>
            <br/>
            <div className={`w-full rounded-lg back-theme-${theme} p-2`}>
                <div className={`${HomeStyles.home_buy_form_price_section} w-full relative`}>
                    <div className={`flex items-center justify-between back-theme-${theme}`}>
                        <div className={`z-2 back-theme-${theme} pl-2`}>کارمزد فروش</div>
                        <div className={`z-2 back-theme-${theme} pr-2`}>۱,۰۰۰ <small>تومان </small></div>
                    </div>
                </div>
                <br/>
                <div className={`${HomeStyles.home_buy_form_price_section} w-full relative`}>
                    <div className={`flex items-center justify-between back-theme-${theme}`}>
                        <div className={`z-2 back-theme-${theme} pl-2 ${theme == 'light' ? 'color-black-light' : ''}`}>مبلغ نهایی</div>
                        <div className={`z-2 back-theme-${theme} pr-2 font-bold font-18 ${theme == 'light' ? 'color-black-light' : ''}`}>۵۰,۰۰۰,۰۰۰<small className={`${theme == 'light' ? 'color-black-light' : ''} font-14`}> تومان</small></div>
                    </div>
                </div>
            </div>
            <br/>
            <div className="flex gap-2">
                <button className={`w-1/2 rounded-lg py-2 cursor-pointer back-theme-${theme} ${theme == 'dark' ? 'border' : 'border'} hover:shadow-lg transition-all`}>واریز به کیف پول</button>
                <button className='w-1/2 rounded-lg py-2 cursor-pointer back-gold color-white hover:shadow-lg transition-all'>واریز به حساب</button>
            </div>
        </form>
    </>
  )
}
