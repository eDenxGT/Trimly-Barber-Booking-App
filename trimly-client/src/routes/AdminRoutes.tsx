import { AdminAuth } from "@/pages/admin/AdminAuth";
import { NoAdminAuthRoute } from "@/utils/protected/PublicRoute";
import { Route, Routes } from "react-router-dom";

export const AdminRoutes = () => {
   return (
      <Routes>
         <Route
            index
            element={<NoAdminAuthRoute element={<AdminAuth />} />}
         />
         {/* <Route  */}
      </Routes>
   );
};
