
import Link from "next/link";
import ArrowLeft from "@/assets/icons/ArrowLeft";
import ArrowRight from "@/assets/icons/ArrowRight";

export default function PaginationComponent() {
  return (
    <>
        <div className="w-1/2 p-4 mt-4 mx-auto flex items-center justify-center gap-4">
            <Link prefetch={false} href='#'>
                <ArrowRight width={20} height={20} color="#d0a12b" />
            </Link>
            <Link prefetch={false} href='#' className="border rounded-lg min-w-8 h-8 flex items-center justify-center">۱</Link>
            <span>...</span>
            <Link prefetch={false} href='#' className="border rounded-lg min-w-8 h-8 flex items-center justify-center">۲</Link>
            <Link prefetch={false} href='#' className="border rounded-lg min-w-8 h-8 flex items-center justify-center">۳</Link>
            <Link prefetch={false} href='#' className="border rounded-lg min-w-8 h-8 flex items-center justify-center">۴</Link>
            <span>...</span>
            <Link prefetch={false} href='#' className="border rounded-lg min-w-8 h-8 flex items-center justify-center">۵</Link>
            <Link prefetch={false} href='#'>
                <ArrowLeft width={20} height={20} color="#d0a12b" />
            </Link>
        </div>
    </>
  )
}
