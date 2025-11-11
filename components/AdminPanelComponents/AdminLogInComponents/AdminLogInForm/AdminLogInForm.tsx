
'use client'

import { useAdminMainContext } from "@/utils/contexts/adminContexts/adminMainContexts";
import { logInAdminByAxios } from "@/utils/services/admin-services/admin-services";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function AdminLogInForm() {

  const { theme } = useAdminMainContext();

  const [ loginData , setLoginData] = useState({email:'', password:''});

  const handleSetLoginData = (e: React.ChangeEvent<HTMLInputElement> , type: string) => {
    switch (type) {
      case 'email':
        setLoginData({...loginData , email: e.target.value});
        break;
      case 'password':
        setLoginData({...loginData , password: e.target.value})
        break;
    
      default:
        break;
    }
  }

  const handleSubmitLogin = async (e : FormEvent) => {
    e.preventDefault();
    const result = await logInAdminByAxios(loginData);
    // if(result?.status == 200) {
    //   window.location.href = '/admin/dashboard';
    // }
  }

  return (
    <>
      <div className={`h-[calc(100vh)] shadow-xl mx-auto p-2 rounded-b-md back-theme-${theme} flex flex-col items-center justify-center`}>
        <h2 className="text-center">ورود ادمین</h2>
        <div className="flex items-center justify-center py-5">
          <form onSubmit={(e) => handleSubmitLogin(e)} className="max-w-2xs mx-auto flex flex-col gap-5">
            <div className='text-start'>
              <label htmlFor="product-name" className="pr-2">ایمیل</label>
              <br/>
              <input
                onChange={(e) => handleSetLoginData(e , 'email')}
                type="text"
                placeholder="..."
                className={`min-w-60 h-10 border-2 ${theme == 'light' ? 'border-[#d0a12b] color-black-light' : 'border-white' } rounded-lg px-2`}
              />
            </div>
            <div className='text-start'>
              <label htmlFor="product-name" className="pr-2">رمز عبور</label>
              <br/>
              <input
                onChange={(e) => handleSetLoginData(e , 'password')}
                type="text"
                placeholder='...'
                className={`min-w-60 h-10 border-2 ${theme == 'light' ? 'border-[#d0a12b] color-black-light' : 'border-white' } rounded-lg px-2`}
              />
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-all hover:bg-green-700">ورود</button>
            <Link href='/admin/sign-in' className="text-center border text-white px-4 py-2 rounded-lg cursor-pointer bg-blue-400">ثبت نام</Link>
          </form>
        </div>
      </div>
    </>
  )
}
