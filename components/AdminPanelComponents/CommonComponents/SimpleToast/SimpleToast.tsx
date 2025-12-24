/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Close from "@/assets/icons/Close";
import { useAdminMainContext } from "@/utils/contexts/adminContexts/adminMainContexts";
import { useEffect } from "react";

export default function SimpleToast() {

  const { simpleToastData , setSimpleToastData } = useAdminMainContext();

  const hideToast = () => {
    setSimpleToastData({show: false , message: '' , status: ''});
  }

  useEffect(() => {
    if (simpleToastData.show) {
      const timer = setTimeout(() => {
        hideToast();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [simpleToastData.show]);

  return (
    
    simpleToastData.show ?
      <div id="toast" className={`fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center ${simpleToastData.status == 'success' ? 'bg-green-400' : simpleToastData.status == 'error' ? 'bg-red-400' : 'bg-blue-500'} text-[#1e2939] p-4 w-100 rounded shadow-lg opacity-80`}>
        <button onClick={() => hideToast()} className="ml-4 text-white font-bold cursor-pointer"><Close width={15} height={15} color="#1e2939" /></button>
        <span>{simpleToastData.message}</span>
      </div>
    :''
    
  )
}
