'use client'

import { useState } from "react"
import HomeSellForm from "../HomeSellForm/HomeSellForm";
import HomeBuyForm from "../HomeBuyForm/HomeBuyForm";
import { Product } from "@/utils/interfaces/admin-interfaces/product.interface";
import { useUserMainContext } from "@/utils/contexts/userContexts/userMainContexts";

export default function HomeBuySellSwitchSection({ userId , productsList } : { userId : string | undefined , productsList : Product[]}) {

  const { theme } = useUserMainContext();

    const [activeTab , setActiveTab] = useState('buy');

    const handleSetActiveTab = (val:string) => {
      setActiveTab(val);
    }
 
  return (
    <>
      <div className={`rounded-lg p-5 ${theme == 'dark' ? `back-theme-${theme}` : 'back-white' }`}>
        <div className={`md:w-xs flex items-center justify-center p-2 rounded-4xl border mx-auto`}>
          <button onClick={() => handleSetActiveTab('buy')} className={`cursor-pointer w-1/2 px-3 py-2 rounded-3xl transition-all ${activeTab == 'buy' ? `${theme == 'dark' ? `back-gray-light` : 'back-gray-light' } font-bold` : ''}`}>خرید</button>
          <button onClick={() => handleSetActiveTab('sell')} className={`cursor-pointer w-1/2 px-3 py-2 rounded-3xl transition-all ${activeTab == 'sell' ? `${theme == 'dark' ? `back-gray-light` : 'back-gray-light' } font-bold` : ''}`}>فروش</button>
        </div>
        <div className={`w-full back-theme-${theme} p-5 my-5 rounded-lg`}>
          {
            activeTab == 'sell' ?
              <HomeSellForm userId={userId}/>
            : activeTab == 'buy' ?
              <HomeBuyForm userId={userId} productsList={productsList}/>
            : ''
          }
        </div>
      </div>
    </>
  )
}
