import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { Toast } from './components/common/Toast';
import { AskAaplaBoisarModal } from './components/ai/AskAaplaBoisarModal';

// Pages
import { HomePage } from './pages/HomePage';
import { BusinessesPage } from './pages/BusinessesPage';
import { BusinessDetailPage } from './pages/BusinessDetailPage';
import { CategoriesPage, SearchPage } from './pages/CategoriesPage';
import { OffersPage } from './pages/OffersPage';
import { JobsPage } from './pages/JobsPage';
import { PropertiesPage } from './pages/PropertiesPage';
import { ServicesPage } from './pages/ServicesPage';
import { EventsPage } from './pages/EventsPage';
import { MapPage } from './pages/MapPage';
import { BoisarTodayPage } from './pages/BoisarTodayPage';
import { TransportPage } from './pages/TransportPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { StudentZonePage } from './pages/StudentZonePage';
import { LostFoundPage } from './pages/LostFoundPage';
import { RewardsPage } from './pages/RewardsPage';
import { UserProfilePage, FavouritesPage } from './pages/UserProfilePage';

// Business & Admin Pages
import { BusinessRegisterPage } from './pages/business/BusinessRegisterPage';
import { BusinessDashboardPage } from './pages/business/BusinessDashboardPage';
import { BusinessAiToolsPage } from './pages/business/BusinessAiToolsPage';
import { BusinessSubscriptionPage, BusinessAdsPage } from './pages/business/BusinessSubscriptionPage';
import { AdminPanelPage } from './pages/admin/AdminPanelPage';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      <div className="flex-1">
        {children}
      </div>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <BottomNav />}
      <MobileDrawer />
      <AskAaplaBoisarModal />
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Endpoints */}
            <Route path="/" element={<HomePage />} />
            <Route path="/businesses" element={<BusinessesPage />} />
            <Route path="/business/:slug" element={<BusinessDetailPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/boisar-today" element={<BoisarTodayPage />} />
            <Route path="/transport" element={<TransportPage />} />
            <Route path="/emergency" element={<EmergencyPage />} />
            <Route path="/students" element={<StudentZonePage />} />
            <Route path="/lost-found" element={<LostFoundPage />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/favourites" element={<FavouritesPage />} />

            {/* Business Portal */}
            <Route path="/business/register" element={<BusinessRegisterPage />} />
            <Route path="/business/dashboard" element={<BusinessDashboardPage />} />
            <Route path="/business/leads" element={<BusinessDashboardPage />} />
            <Route path="/business/ai-tools" element={<BusinessAiToolsPage />} />
            <Route path="/business/reviews" element={<BusinessAiToolsPage />} />
            <Route path="/business/subscription" element={<BusinessSubscriptionPage />} />
            <Route path="/business/ads" element={<BusinessAdsPage />} />

            {/* Admin Portal */}
            <Route path="/admin" element={<AdminPanelPage />} />
            <Route path="/admin/*" element={<AdminPanelPage />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
