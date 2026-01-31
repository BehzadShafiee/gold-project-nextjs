'use client'

import { useAdminMainContext } from "@/utils/contexts/adminContexts/adminMainContexts";
import AdminPanelSideBarAccountSection from "./AdminPanelSideBarAccountSection/AdminPanelSideBarAccountSection";
import AdminPanelSideBarMenuList from "./AdminPanelSideBarMenuList/AdminPanelSideBarMenuList";
import ArrowLeft from "@/assets/icons/ArrowLeft";
import ArrowRight from "@/assets/icons/ArrowRight";

export default function AdminPanelSideBar() {

  const {theme , openSideBar , setOpenSideBar} = useAdminMainContext();

  const handleSetOpenSideBar = () => {
    setOpenSideBar(!openSideBar);
  }

  return (
    <>
      <aside className={`z-100 lg:z-1 w-full min-w-[300px] lg:w-1/7 h-screen fixed lg:sticky top-0 ${openSideBar ? 'right-0' : '-right-full'} transition-all p-2 bg-gray-light`}>
        <div className={`rounded shadow-xl back-theme-${theme} w-full h-full`}>
          <div className="flex flex-col items-center justify-center p-2">
            <AdminPanelSideBarAccountSection/>
            <div className="w-full border-b-2 my-2"/>
            <AdminPanelSideBarMenuList/>
          </div>
        </div>
        <div onClick={handleSetOpenSideBar} className={`lg:hidden absolute ${openSideBar ? 'right-0' : '-left-15'} bottom-10 back-gray-light rounded-l-full px-5 py-2 text-3xl text-center cursor-pointer`}>
          {
            openSideBar ? <ArrowRight width={20} height={25} color=""/> : <ArrowLeft width={20} height={25} color=""/>          }
        </div>
      </aside>
    </>
  )
}
