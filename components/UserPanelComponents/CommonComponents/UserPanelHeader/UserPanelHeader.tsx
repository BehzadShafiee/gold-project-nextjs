'use client'

import Menu from '@/assets/icons/Menu';
import Notifications from '@/assets/icons/Notifications';
import Person from '@/assets/icons/Person';
import { useUserMainContext } from '@/utils/contexts/userContexts/userMainContexts';
import Link from 'next/link';
import { useState } from 'react';

export default function UserPanelHeader() {

  const { userData , theme , setTheme } = useUserMainContext();

  const [openMenuWrap , setOpenMenuWrap] = useState(false);
  const [openUserWrap , setOpenUserWrap] = useState(false);
  const [openNotificationsWrap , setOpenNotificationsWrap] = useState(false);

  const handleSetOpenMenuWrap = () => {
    setOpenMenuWrap(!openMenuWrap);
    setOpenUserWrap(false);
    setOpenNotificationsWrap(false);
  }

  const handleSetOpenUserWrap = () => {
    setOpenUserWrap(!openUserWrap);
    setOpenNotificationsWrap(false);
    setOpenMenuWrap(false);
  }

 const handleSetOpenNotificationsWrap = () => {
   setOpenNotificationsWrap(!openNotificationsWrap);
   setOpenUserWrap(false);
   setOpenMenuWrap(false);
 }

  return (
    <div className={`sticky top-0 z-100 shadow-xl md:w-1/2 back-theme-${theme} mx-auto rounded-t-lg px-3 py-5 flex justify-between items-center`}>

      <div className="relative">
        <button onClick={() => handleSetOpenMenuWrap()} className='cursor-pointer hover:scale-105 transition-all'>
          <Menu width={35} height={35} color='#d0a12b'/>
        </button>
        {
          openMenuWrap &&
            <div className={`w-100 absolute top-10 right-0 p-2 rounded-lg ${theme == 'light' ? 'shadow-2xl' : 'shadow shadow-white'} back-theme-${theme} z-100`}>
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
            </div>
        }
      </div>
      
      <div className="flex items-center gap-4 relative">
        <h4 className='align-middle'>{userData}</h4>
        <button onClick={() => handleSetOpenUserWrap() } className='cursor-pointer hover:scale-105 transition-all'>
          <Person width={35} height={35} color='#d0a12b'/>
        </button>
        <button onClick={() => handleSetOpenNotificationsWrap() } className='cursor-pointer relative hover:scale-105 transition-all'>
          <span className='absolute top-0 right-0 bg-red-600 rounded-full p-1' />
          <Notifications width={35} height={35} color='#d0a12b'/>
        </button>
        
        {
          openUserWrap &&
            <div className={`w-30 absolute top-10 left-1/4 p-2 rounded-lg ${theme == 'light' ? 'shadow-2xl' : 'shadow shadow-white'} back-theme-${theme} z-100`}>
              <Link prefetch={false} href='#' className='py-2 block'>تنظیمات</Link>
              <hr/>
              <Link prefetch={false} href='/user/log-out' className='py-2 block'>خروج</Link>
            </div>
        }

        {
          openNotificationsWrap &&
            <div className={`w-100 absolute top-10 left-0 p-2 rounded-lg ${theme == 'light' ? 'shadow-2xl' : 'shadow shadow-white'} back-theme-${theme} z-100`}>
              <Link prefetch={false} href='#' className='py-2 block'>لورم ایپسوم</Link>
              <hr/>
              <Link prefetch={false} href='#' className='py-2 block'>لورم ایپسوم</Link>
              <hr/>
              <Link prefetch={false} href='#' className='py-2 block'>لورم ایپسوم</Link>
            </div>
        }
      </div>
    </div>
    )
}
