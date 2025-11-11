
export default function Chart({ width , height , color } : { width:number , height:number , color:string }) {
  return (
    <svg width={width} height={height} fill={color} viewBox="0 0 48 48" >
      <g>
        <path d="M24,0A24,24,0,1,0,48,24,24,24,0,0,0,24,0Zm1,2A22,22,0,0,1,46,23H25ZM24,46A22,22,0,0,1,23,2V24a1,1,0,0,0,.29.71L38.83,40.24A21.91,21.91,0,0,1,24,46Zm16.24-7.17L26.41,25H46A21.91,21.91,0,0,1,40.24,38.83Z"/>
      </g>
    </svg>
  )
}
