
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
import About from "./pages/About";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import ObstetricsService from "./pages/services/ObstetricsService";
import GynecologyService from "./pages/services/GynecologyService";
import FamilyPlanningService from "./pages/services/FamilyPlanningService";

const queryClient = new QueryClient();

const App = () => (
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
              <Route path="/dashboard" element={<PatientDashboard />} />
              {/* Add more dashboard routes as needed */}
            </Route>
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
