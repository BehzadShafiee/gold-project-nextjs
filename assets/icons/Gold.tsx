
export default function Gold({ width , height , color } : { width:number , height:number , color:string }) {
  return (
    <svg width={width} height={height} fill={color} viewBox="0 0 512 512">
        <polygon points="315.31 246.81 293.53 175.33 218.47 175.33 196.69 246.81 315.31 246.81"/>
        <polygon points="246.62 336.67 224.84 265.19 149.78 265.19 128 336.67 246.62 336.67"/>
        <polygon points="384 336.67 362.22 265.19 287.17 265.19 265.38 336.67 384 336.67"/>
    </svg>
  )
}
