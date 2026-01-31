'use client'

import ArrowDown from "@/assets/icons/ArrowDown";
import ArrowUp from "@/assets/icons/ArrowUp";
import Chart from "@/assets/icons/Chart";
import Gold from "@/assets/icons/Gold";
import OrderIcon from "@/assets/icons/OrderIcon";
import Person from "@/assets/icons/Person";
import ProductIcon from "@/assets/icons/ProductIcon";
import { useAdminMainContext } from "@/utils/contexts/adminContexts/adminMainContexts";
import Link from "next/link";
import { useState } from "react";

export default function AdminPanelSideBarMenuList() {

    const {setOpenSideBar} = useAdminMainContext();

    const [openMenuItem , setOpenMenuItem] = useState(false);

  return (
    <>
        <div className="flex flex-col gap-4 w-full p-2">
            <Link onClick={() => setOpenSideBar(false)} prefetch={false} href='/admin/dashboard' className="flex items-center justify-start gap-2 p-1 rounded transition-all hover:bg-[#d0a12b] hover:text-[#f8faf9] fill-[#d0a12b] hover:fill-[#f8faf9]">
                <Chart width={25} height={25} color=""/>
                <span>داشبورد</span>
            </Link>
            <Link onClick={() => setOpenSideBar(false)} prefetch={false} href='/admin/users' className="flex items-center justify-start gap-2 p-1 rounded transition-all hover:bg-[#d0a12b] hover:text-[#f8faf9] fill-[#d0a12b] hover:fill-[#f8faf9]">
                <Person width={25} height={25} color=""/>
                <span>لیست مشتریان</span>
            </Link>
            <Link onClick={() => setOpenSideBar(false)} prefetch={false} href='/admin/treasury' className="flex items-center justify-start gap-2 p-1 rounded transition-all hover:bg-[#d0a12b] hover:text-[#f8faf9] fill-[#d0a12b] hover:fill-[#f8faf9]">
                <Gold width={25} height={25} color=""/>
                <span>خزانه</span>
            </Link>
            <Link onClick={() => setOpenSideBar(false)} prefetch={false} href='/admin/orders' className="flex items-center justify-start gap-2 p-1 rounded transition-all hover:bg-[#d0a12b] hover:text-[#f8faf9] fill-[#d0a12b] hover:fill-[#f8faf9]">
                <OrderIcon width={25} height={25} color=""/>
                <span>لیست سفارشات</span>
            </Link>
            <div onClick={() => setOpenMenuItem(!openMenuItem)} className="select-none cursor-pointer flex items-center justify-between p-1 rounded transition-all hover:bg-[#d0a12b] hover:text-[#f8faf9] fill-[#d0a12b] hover:fill-[#f8faf9]">
                <div className="flex">
                    <ProductIcon width={25} height={25} color=""/>
                    <span>محصولات</span>
                </div>
                {
                    openMenuItem ?
                        <ArrowUp width={15} height={20} color=""/>
                    :
                        <ArrowDown width={15} height={20} color=""/>
                }
            </div>
            <div className={`${openMenuItem ? 'h-auto shadow-md py-3' : 'h-0'} px-3 overflow-hidden rounded transition-all flex flex-col `}>
                <Link onClick={() => setOpenSideBar(false)} prefetch={false} href='/admin/products' className='text-sm p-2 flex items-center justify-start gap-2 rounded transition-all hover:bg-[#d0a12b] hover:text-[#f8faf9] fill-[#d0a12b] hover:fill-[#f8faf9]'>
                    <span className="w-2 h-2 rounded-full back-gray-light"/>
                    <span>لیست محصولات</span>
                </Link>
                <Link onClick={() => setOpenSideBar(false)} prefetch={false} href='/admin/product/create' className='text-sm p-2 flex items-center justify-start gap-2 rounded transition-all hover:bg-[#d0a12b] hover:text-[#f8faf9] fill-[#d0a12b] hover:fill-[#f8faf9]'>
                    <span className="w-2 h-2 rounded-full back-gray-light"/>
                    <span>ایجاد محصول جدید</span>
                </Link>
            </div>
        </div>
    </>
  )
}
