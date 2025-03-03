import {Route, Routes} from "react-router-dom"
import { ClientAuth } from '@/pages/client/ClientAuth'

export const ClientRoutes = () => {
  return (
    <Routes>
      <Route index element={<ClientAuth />}/>
      {/* <Route path="/" element={<PublicLayout />}>  */}
         {/* <Route path="" element={<SignUp />}/> */}
      {/* </Route> */}
    </Routes>
  )
}