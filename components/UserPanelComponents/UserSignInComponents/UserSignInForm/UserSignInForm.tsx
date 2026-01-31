
'use client'

import { useUserMainContext } from "@/utils/contexts/userContexts/userMainContexts";
import { SignInUserByAxios } from "@/utils/services/customer-services/customer-services";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function UserSignInForm() {

  const { setUserData , theme  , setSimpleToastData } = useUserMainContext();

  const [ signinData , setSigninData] = useState({
    username: '',
    nationalCode: '',
    email: '',
    mobile: '',
    city: '',
    province: '',
    password: '',
  });

  const handleSetSigninData = (e: React.ChangeEvent<HTMLInputElement> , type: string) => {
    switch (type) {
      case 'username':
        setSigninData({...signinData , username: e.target.value});
        break;
      case 'nationalCode':
        setSigninData({...signinData , nationalCode: e.target.value})
        break;
      case 'email':
        setSigninData({...signinData , email: e.target.value})
        break;
      case 'mobile':
        setSigninData({...signinData , mobile: e.target.value})
        break;
      case 'city':
        setSigninData({...signinData , city: e.target.value})
        break;
      case 'province':
        setSigninData({...signinData , province: e.target.value})
        break;
      case 'password':
        setSigninData({...signinData , password: e.target.value})
        break;
    
      default:
        break;
    }
  }

  const handleSubmitSignin = async (e : FormEvent) => {
    e.preventDefault();
    const result = await SignInUserByAxios(signinData);

    setSimpleToastData({
      show: true,
      message: result?.status == 200 ? result?.message : result?.response?.data?.message,
      status: result?.status == 200 ? 'success' : 'error'
    });

    if(result?.status == 200) {
      setUserData(result?.user?.username);
      setTimeout(() => {
        window.location.href = '/user/home';
      }, 1000);
    }
  }

  return (
    <>
      <div className={`h-[calc(100vh)] md:w-1/2 shadow-xl mx-auto p-2 rounded-b-md back-theme-${theme} flex flex-col items-center justify-center`}>
        <h2 className="text-center">ثبت نام کاربر</h2>
        <div className="flex items-center justify-center py-5">
          <form onSubmit={(e) => handleSubmitSignin(e)} className="max-w-2xs mx-auto flex flex-col gap-5">
            <div className='text-start'>
              <label className="pr-2">نام و نام خانوادگی</label>
              <br/>
              <input
                onChange={(e) => handleSetSigninData(e , 'username')}
                type="text"
                placeholder="..."
                className={`min-w-60 h-10 border-2 ${theme == 'light' ? 'border-[#d0a12b] color-black-light' : 'border-white' } rounded-lg px-2`}
              />
            </div>
            <div className='text-start'>
              <label className="pr-2">کد ملی</label>
              <br/>
              <input
                onChange={(e) => handleSetSigninData(e , 'nationalCode')}
                type="text"
                placeholder="..."
                className={`min-w-60 h-10 border-2 ${theme == 'light' ? 'border-[#d0a12b] color-black-light' : 'border-white' } rounded-lg px-2`}
              />
            </div>
            <div className='text-start'>
              <label className="pr-2">موبایل</label>
              <br/>
              <input
                onChange={(e) => handleSetSigninData(e , 'mobile')}
                type="text"
                placeholder="..."
                className={`min-w-60 h-10 border-2 ${theme == 'light' ? 'border-[#d0a12b] color-black-light' : 'border-white' } rounded-lg px-2`}
              />
            </div>
            <div className='text-start'>
              <label className="pr-2">ایمیل</label>
              <br/>
              <input
                onChange={(e) => handleSetSigninData(e , 'email')}
                type="text"
                placeholder="..."
                className={`min-w-60 h-10 border-2 ${theme == 'light' ? 'border-[#d0a12b] color-black-light' : 'border-white' } rounded-lg px-2`}
              />
            </div>
            <div className='text-start'>
              <label className="pr-2">استان</label>
              <br/>
              <input
                onChange={(e) => handleSetSigninData(e , 'province')}
                type="text"
                placeholder="..."
                className={`min-w-60 h-10 border-2 ${theme == 'light' ? 'border-[#d0a12b] color-black-light' : 'border-white' } rounded-lg px-2`}
              />
            </div>
            <div className='text-start'>
              <label className="pr-2">شهر</label>
              <br/>
              <input
                onChange={(e) => handleSetSigninData(e , 'city')}
                type="text"
                placeholder="..."
                className={`min-w-60 h-10 border-2 ${theme == 'light' ? 'border-[#d0a12b] color-black-light' : 'border-white' } rounded-lg px-2`}
              />
            </div>
            <div className='text-start'>
              <label htmlFor="product-name" className="pr-2">رمز عبور</label>
              <br/>
              <input
                onChange={(e) => handleSetSigninData(e , 'password')}
                type="text"
                placeholder='...'
                className={`min-w-60 h-10 border-2 ${theme == 'light' ? 'border-[#d0a12b] color-black-light' : 'border-white' } rounded-lg px-2`}
              />
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-all hover:bg-green-700">ثبت نام</button>
            <Link href='/user/log-in' className="text-center border text-white px-4 py-2 rounded-lg cursor-pointer bg-blue-400">ورود</Link>
          </form>
        </div>
      </div>
    </>
  )
}
