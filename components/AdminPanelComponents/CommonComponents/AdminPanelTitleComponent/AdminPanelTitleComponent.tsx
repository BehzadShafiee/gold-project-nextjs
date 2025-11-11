'use client'

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPanelTitleComponent() {

  const pathName = usePathname();

  const [pageTitle , setPageTitle] = useState('');

  const pageTitlesList = [
    {
      name: 'dashboard',
      title: 'داشبورد'
    },
    {
      name: 'orders',
      title: 'لیست سفارشات'
    },
    {
      name: 'order',
      title: 'جزئیات سفارش'
    },
    {
      name: 'products',
      title: 'لیست محصولات'
    },
    {
      name: 'product/create',
      title: 'ایجاد محصول جدید'
    },
    {
      name: 'product/edit',
      title: 'ویرایش محصول'
    },
    {
      name: 'treasury',
      title: 'خزانه'
    },
    {
      name: 'settings',
      title: 'تنظیمات کاربری'
    },
    {
      name: 'user',
      title: 'اطلاعات مشتری'
    },
    {
      name: 'users',
      title: 'لیست مشتریان'
    },
  ];

  useEffect(() => {
    if (!pathName) return;

    const pathNameItems = pathName.split('/').filter(item => item);

    const mainPath = pathNameItems[1];
    const subPath = pathNameItems.slice(1, 3).join('/'); 

    pageTitlesList.map((t) => {
      if(t.name == mainPath || t.name == subPath){
        setPageTitle(t.title);
      }
    });
    
  }, [pathName]);

  return (
    <>
      <h1 className='mx-auto text-2xl'>{pageTitle}</h1>
    </>
  )
}
