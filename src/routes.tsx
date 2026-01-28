import { lazy } from "react";
import { Outlet, Route, Routes } from "react-router-dom";

const BootUp = lazy(() => import("./pages/BootUp"));
const Desktop = lazy(() => import("./pages/Desktop"));
const Login = lazy(() => import("./pages/Login"));
const RootLayout = () => {
  return (
    <div className="os-container">
      <Outlet /> 
    </div>
  );
};

const AppRoutes = () => {
    return (
	<Routes>
	    <Route path="/" element={<RootLayout/>}
		errorElement={<div>Error loading App</div>}
	    >
		<Route index element={<BootUp/>} />
		<Route path="login" element={<Login/>} />
		<Route path="desktop" element={<Desktop/>} />
		
	    </Route>
	</Routes>
    );
}

export default AppRoutes;
