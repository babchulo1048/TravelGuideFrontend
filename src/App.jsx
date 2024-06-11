import { Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import TourGuideRegister from "./pages/TourGuideRegister";
import TourGuidePage from "./pages/TourGuidePage";
import AdminPage from "./pages/AdminPage";
import ViewTourGuide from "./pages/ViewTourGuide";
import ViewBannedGuide from "./pages/ViewBannedGuide";
import ViewUser from "./pages/ViewUser";
import BannedUsers from "./pages/BannedUsers";
import AddPackage from "./pages/AddPackage";
import ViewPackage from "./pages/ViewPackage";
import ViewBooking from "./pages/ViewBooking";

import PieChartComponent from "./chart-component/UserPie";

function App() {
  return (
    <div>
      <>
        <Routes>
          <Route>
            <Route path="/" element={<AdminLogin />} />
            <Route path="/adminRegister" element={<AdminRegister />} />
            <Route path="/tourGuide" element={<TourGuideRegister />} />
            <Route path="/tourGuidePage" element={<TourGuidePage />} />
            <Route path="/adminPage" element={<AdminPage />} />
            <Route path="/viewTourGuide" element={<ViewTourGuide />} />
            <Route path="/bannedTourGuide" element={<ViewBannedGuide />} />
            <Route path="/viewUser" element={<ViewUser />} />
            <Route path="/viewUserBanned" element={<BannedUsers />} />
            <Route path="/package" element={<AddPackage />} />
            <Route path="/viewPackage" element={<ViewPackage />} />
            <Route path="/chartjs" element={<PieChartComponent />} />
            <Route path="/viewBook" element={<ViewBooking />} />
          </Route>
        </Routes>
      </>
    </div>
  );
}

export default App;
