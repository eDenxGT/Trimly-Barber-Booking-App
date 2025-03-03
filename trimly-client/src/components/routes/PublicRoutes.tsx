import { PublicLayout } from '@/pages/layouts/PublicLayout'
import {Route, Routes} from "react-router-dom"

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}> 
         {/* <Route path="" element={<SignUp />}/> */}
      </Route>
    </Routes>
  )
}
