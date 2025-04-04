
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/auth-context';
import MainLayout from './components/layout/main-layout';
import DashboardLayout from './components/layout/dashboard-layout';
import Index from './pages/Index';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';
import DoctorDashboard from './pages/dashboard/DoctorDashboard';
import PatientDashboard from './pages/dashboard/PatientDashboard';
import SecretaryDashboard from './pages/dashboard/SecretaryDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import MessagesPage from './pages/dashboard/MessagesPage';
import AppointmentsPage from './pages/dashboard/AppointmentsPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import PaymentsPage from './pages/dashboard/PaymentsPage';
import RecordsPage from './pages/dashboard/RecordsPage';
import SettingsPage from './pages/dashboard/SettingsPage';
import PregnancyPage from './pages/dashboard/PregnancyPage';
import PatientsPage from './pages/dashboard/PatientsPage';
import ReportsPage from './pages/dashboard/ReportsPage';
import TelemedicinePage from './pages/dashboard/TelemedicinePage';
import AnnouncementsPage from './pages/dashboard/AnnouncementsPage';
import ObstetricsService from './pages/services/ObstetricsService';
import GynecologyService from './pages/services/GynecologyService';
import FamilyPlanningService from './pages/services/FamilyPlanningService';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Index />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="services/obstetrics" element={<ObstetricsService />} />
            <Route path="services/gynecology" element={<GynecologyService />} />
            <Route path="services/family-planning" element={<FamilyPlanningService />} />
          </Route>
          
          {/* Auth Routes */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          
          {/* Dashboard Routes */}
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<DoctorDashboard />} />
            <Route path="patient" element={<PatientDashboard />} />
            <Route path="secretary" element={<SecretaryDashboard />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="records" element={<RecordsPage />} />
            <Route path="pregnancy" element={<PregnancyPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="patients" element={<PatientsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="telemedicine" element={<TelemedicinePage />} />
            <Route path="announcements" element={<AnnouncementsPage />} />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
