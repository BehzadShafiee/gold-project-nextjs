import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="m-auto h-screen w-screen flex items-center justify-center gap-5">
        <Link prefetch={false} href='/admin/dashboard' className="border px-4 py-2 rounded cursor-pointer transition-all hover:bg-[#d0a12b] hover:text-[#f8faf9]" >پنل ادمین</Link>
        <Link prefetch={false} href='/user/home' className="border px-4 py-2 rounded cursor-pointer transition-all hover:bg-[#d0a12b] hover:text-[#f8faf9]">پنل مشتری</Link>
      </div>
    </>
  )
}
