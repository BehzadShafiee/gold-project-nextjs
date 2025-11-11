'use client'

import Link from "next/link";
import Person from "@/assets/icons/Person";
import SettingIcon from "@/assets/icons/SettingIcon";
import Exit from "@/assets/icons/Exit";
import { useAdminMainContext } from "@/utils/contexts/adminContexts/adminMainContexts";

export default function AdminPanelSideBarAccountSection() {

  const {openSideBar , setOpenSideBar} = useAdminMainContext();

  return (
    <>
        <div className="p-2 w-full border rounded">
            <div className="flex flex-col items-center justify-center">
                <Person width={45} height={45} color="#d0a12b" />
                <p>ادمین تست</p>
                <div className="w-full border-b-2 my-2"/>
                <div className="flex items-center justify-center w-full">
                    <Link onClick={() => setOpenSideBar(false)} prefetch={false} href='/admin/settings' className="flex items-center justify-center gap-2 w-1/2 border-l-2">
                        <SettingIcon width={20} height={20} color="#d0a12b" />
                        <span>تنظیمات</span>
                    </Link>
                    <Link onClick={() => setOpenSideBar(false)} prefetch={false} href='/admin/log-out' className="flex items-center justify-center gap-2 w-1/2">
                        <Exit width={20} height={20} color="#d0a12b" />
                        <span>خروج</span>
                    </Link>
                </div>
            </div>
        </div>
    </>
  )
}
