
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth-context";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/main-layout";
import DashboardLayout from "./components/layout/dashboard-layout";
import PatientDashboard from "./pages/dashboard/PatientDashboard";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import SecretaryDashboard from "./pages/dashboard/SecretaryDashboard";
import ProfilePage from "./pages/dashboard/ProfilePage";
import MessagesPage from "./pages/dashboard/MessagesPage";
import AppointmentsPage from "./pages/dashboard/AppointmentsPage";
import RecordsPage from "./pages/dashboard/RecordsPage";
import PaymentsPage from "./pages/dashboard/PaymentsPage";
import PatientsPage from "./pages/dashboard/PatientsPage";
import TelemedicinePage from "./pages/dashboard/TelemedicinePage";
import AnnouncementsPage from "./pages/dashboard/AnnouncementsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import ReportsPage from "./pages/dashboard/ReportsPage";
import PregnancyPage from "./pages/dashboard/PregnancyPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import ObstetricsService from "./pages/services/ObstetricsService";
import GynecologyService from "./pages/services/GynecologyService";
import FamilyPlanningService from "./pages/services/FamilyPlanningService";

// Create query client instance
const queryClient = new QueryClient();

const App = () => {
  console.log("App component rendering");
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Main Routes */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                
                {/* Service Routes */}
                <Route path="/services/obstetrics" element={<ObstetricsService />} />
                <Route path="/services/gynecology" element={<GynecologyService />} />
                <Route path="/services/family-planning" element={<FamilyPlanningService />} />
              </Route>
              
              {/* Dashboard Routes */}
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DoctorDashboard />} />
                <Route path="/dashboard/patient" element={<PatientDashboard />} />
                <Route path="/dashboard/secretary" element={<SecretaryDashboard />} />
                <Route path="/dashboard/profile" element={<ProfilePage />} />
                <Route path="/dashboard/messages" element={<MessagesPage />} />
                <Route path="/dashboard/appointments" element={<AppointmentsPage />} />
                <Route path="/dashboard/patients" element={<PatientsPage />} />
                <Route path="/dashboard/records" element={<RecordsPage />} />
                <Route path="/dashboard/payments" element={<PaymentsPage />} />
                <Route path="/dashboard/pregnancy" element={<PregnancyPage />} />
                <Route path="/dashboard/telemedicine" element={<TelemedicinePage />} />
                <Route path="/dashboard/announcements" element={<AnnouncementsPage />} />
                <Route path="/dashboard/settings" element={<SettingsPage />} />
                <Route path="/dashboard/reports" element={<ReportsPage />} />
              </Route>
              
              {/* Catch-all Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
