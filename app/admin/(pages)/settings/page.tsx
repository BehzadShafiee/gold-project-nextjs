'use client'

import { useAdminMainContext } from "@/utils/contexts/adminContexts/adminMainContexts"

export default function AdminSettings() {

  const {theme} = useAdminMainContext();

  return (
    <>
      <div className={`p-2 w-full min-h-screen rounded back-theme-${theme}`}>
        <h2 className="text-lg p-3">تنظیمات پنل کاربری</h2>
        <div className='w-11/12 mt-10 mx-auto p-3 rounded-lg border text-center'>
          
        </div>
      </div>
    </>
  )
}
