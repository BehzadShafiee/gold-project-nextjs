'use client'

import Menu from '@/assets/icons/Menu';
import Notifications from '@/assets/icons/Notifications';
import Link from 'next/link';
import { useState } from 'react';
import AdminPanelTitleComponent from '../AdminPanelTitleComponent/AdminPanelTitleComponent';
import { useAdminMainContext } from '@/utils/contexts/adminContexts/adminMainContexts';

export default function AdminPanelHeader() {

  const {theme , setTheme} = useAdminMainContext();

  const [openAccessibilityWrap , setOpenAccessibilityWrap] = useState(false);
  const [openNotificationsWrap , setOpenNotificationsWrap] = useState(false);

  const handleSetOpenAccessibilityWrap = () => {
    setOpenAccessibilityWrap(!openAccessibilityWrap);
    setOpenNotificationsWrap(false);
  }

 const handleSetOpenNotificationsWrap = () => {
   setOpenNotificationsWrap(!openNotificationsWrap);
   setOpenAccessibilityWrap(false);
 }

  return (
    <div className={`sticky top-0 z-100 w-full shadow-lg rounded-t back-theme-${theme}`}>

      <div className="relative p-3 flex items-center justify-start">
        <button onClick={() => handleSetOpenNotificationsWrap() } className='relative cursor-pointer hover:scale-105 transition-all'>
          <span className='absolute top-0 right-0 bg-red-600 rounded-full p-1' />
          <Notifications width={35} height={35} color='#d0a12b'/>
        </button>

        {
          openNotificationsWrap &&
            <div className={`w-100 absolute top-12 right-2 p-2 rounded-lg z-100 back-theme-${theme} ${theme == 'light' ? 'shadow-2xl' : 'shadow shadow-white'} `}>
              <Link prefetch={false} href='#' className='py-2 block'>لورم ایپسوم</Link>
              <hr/>
              <Link prefetch={false} href='#' className='py-2 block'>لورم ایپسوم</Link>
              <hr/>
              <Link prefetch={false} href='#' className='py-2 block'>لورم ایپسوم</Link>
            </div>
        }

        <button onClick={() => handleSetOpenAccessibilityWrap()} className='cursor-pointer hover:scale-105 transition-all mr-5'>
          <Menu width={35} height={35} color='#d0a12b'/>
        </button>

        {
          openAccessibilityWrap &&
            <div className={`w-100 absolute top-12 right-14 p-2 rounded-lg z-100 back-theme-${theme} ${theme == 'light' ? 'shadow-2xl' : 'shadow shadow-white'} `}>
              <div className='py-2 flex items-center justify-between'>
                <div>تغییر تم</div>
                <div className='flex items-center gap-2'>
                    <small>روشن</small>
                    <button
                        onClick={() => theme == 'light' ? setTheme('dark') : setTheme('light')}
                        className='relative cursor-pointer rounded back-gray-light py-3 px-5'
                        >
                        <span className={`p-3 w-0 h-0 rounded back-gold transition-all absolute -translate-y-1/2 ${theme == 'light' ? 'right-0' : 'left-0' }`} />
                    </button>
                    <small>تاریک</small>
                </div>
              </div>
              <hr/>
              <Link prefetch={false} href='#' className='py-2 block'>لورم ایپسوم</Link>
              <hr/>
              <Link prefetch={false} href='#' className='py-2 block'>لورم ایپسوم</Link>
              <hr/>
              <Link prefetch={false} href='#' className='py-2 block'>لورم ایپسوم</Link>
              <hr/>
              <Link prefetch={false} href='#' className='py-2 block'>لورم ایپسوم</Link>
            </div>
        }

        <AdminPanelTitleComponent/>

      </div>
      
      <div className="w-full border-b-2"/>
    </div>
  )
}
