
'use client'

import { useUserMainContext } from "@/utils/contexts/userContexts/userMainContexts";
import { logInUserByAxios } from "@/utils/services/customer-services/customer-services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function UserLogInForm() {

  const { setUserData , theme , setSimpleToastData } = useUserMainContext();

  const [ loginData , setLoginData] = useState({email:'', password:''});

  const router = useRouter();

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
    const result = await logInUserByAxios(loginData);
    
    setSimpleToastData({
      show: true,
      message: result?.status == 200 ? result?.message : result?.response?.data?.message,
      status: result?.status == 200 ? 'success' : 'error'
    });

    if(result?.status == 200) {
      setUserData(result?.user?.username);
      setTimeout(() => {
        // window.location.href = '/user/home';
        router.push('/user/home');
      }, 1000);
    }
  }

  return (
    <>
      <div className={`h-[calc(100vh)] md:w-1/2 shadow-xl mx-auto p-2 rounded-b-md back-theme-${theme} flex flex-col items-center justify-center`}>
        <h2 className="text-center">ورود کاربر</h2>
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
            <Link href='/user/sign-in' className="text-center border text-white px-4 py-2 rounded-lg cursor-pointer bg-blue-400">ثبت نام</Link>
          </form>
        </div>
      </div>
    </>
  )
}
