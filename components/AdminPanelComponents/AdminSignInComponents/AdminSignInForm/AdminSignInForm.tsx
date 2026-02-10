
'use client'

import { useAdminMainContext } from "@/utils/contexts/adminContexts/adminMainContexts";
import { SignInAdminByAxios } from "@/utils/services/admin-services/admin-services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AdminSignInForm() {

  const { setAdminData , theme , setSimpleToastData } = useAdminMainContext();

  const router = useRouter();

  const [ signinData , setSigninData] = useState({
    adminName: '',
    nationalCode: '',
    email: '',
    mobile: '',
    city: '',
    province: '',
    password: '',
  });

  const handleSetSigninData = (e: React.ChangeEvent<HTMLInputElement> , type: string) => {
    switch (type) {
      case 'adminName':
        setSigninData({...signinData , adminName: e.target.value});
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
    const result = await SignInAdminByAxios(signinData);

    setSimpleToastData({
      show: true,
      message: result?.status == 200 ? result?.message : result?.response?.data?.message,
      status: result?.status == 200 ? 'success' : 'error'
    });

    if(result?.status == 200) {
      setAdminData(result?.admin?.adminName);
      setTimeout(() => {
        // window.location.href = '/admin/dashboard';
        router.push('/admin/dashboard');
      }, 1000);
    }

  }

  return (
    <>
      <div className={`h-[calc(100vh)] shadow-xl mx-auto p-2 rounded-b-md back-theme-${theme} flex flex-col items-center justify-center`}>
        <h2 className="text-center">ثبت نام ادمین</h2>
        <div className="flex items-center justify-center py-5">
          <form onSubmit={(e) => handleSubmitSignin(e)} className="max-w-2xs mx-auto flex flex-col gap-5">
            <div className='text-start'>
              <label className="pr-2">نام و نام خانوادگی</label>
              <br/>
              <input
                onChange={(e) => handleSetSigninData(e , 'adminName')}
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
            <Link href='/admin/log-in' className="text-center border text-white px-4 py-2 rounded-lg cursor-pointer bg-blue-400">ورود</Link>
          </form>
        </div>
      </div>
    </>
  )
}
