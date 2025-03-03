import { PublicHeader } from '@/components/headers/PublicHeader'
import { Outlet } from "react-router-dom";


export const PublicLayout= () => {
  return (
    <div className='relative'>
      <PublicHeader className="absolute top-0 left-0 right-0 z-30"/>
      <Outlet />
    </div>
  )
}
