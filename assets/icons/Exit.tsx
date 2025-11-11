
export default function Exit({ width , height , color } : { width:number , height:number , color:string }) {
  return (
    <svg width={width} height={height} enableBackground="new 0 0 32 32" id="Layer_4" version="1.1" viewBox="0 0 32 32" >
        <g>
            <line fill="none" stroke={color} strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" x1="28" x2="1" y1="16" y2="16"/>
            <polyline fill="none" points="7,22 1,16 7,10" stroke={color} strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3"/>
            <path d="M9,8V3   c0-1.105,0.895-2,2-2h18c1.105,0,2,0.895,2,2v26c0,1.105-0.895,2-2,2H11c-1.105,0-2-0.895-2-2v-5" fill="none" stroke={color} strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3"/>
        </g>
    </svg>
  )
}
