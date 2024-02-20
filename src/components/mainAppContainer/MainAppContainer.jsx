import { Routes, Route} from 'react-router-dom';
import Header from "../header/Header";
import HomePage from '../../pages/HomePage/HomePage';
import RatingPage from '../../pages/RatingPage/RatingPage';
import SettingsPage from '../../pages/SettingsPage/SettingsPage';
import EasyLevelPage from '../../pages/SettingsPage/EasyLevelPage/EasyLevelPage';
import MediumLevelPage from '../../pages/SettingsPage/MediumLevelPage/MediumLevelPage';
import HardLevelPage from '../../pages/SettingsPage/HardLevelPage/HardLevelPage';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import Footer from "../footer/Footer";
import './mainAppContainer.css'

function MainAppContainer () {
  return (
    <div className="mainAppContainer">
      <Header />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rating" element={<RatingPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/easy" element={<EasyLevelPage />} />
          <Route path="/settings/medium" element={<MediumLevelPage />} />
          <Route path="/settings/hard" element={<HardLevelPage />} />
          <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default MainAppContainer;
