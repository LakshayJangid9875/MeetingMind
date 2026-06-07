import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage   from './pages/LandingPage';
import LoginPage     from './pages/LoginPage';
import SignupPage    from './pages/SignupPage';
import Dashboard     from './pages/Dashboard';
import UploadPage    from './pages/UploadPage';
import MeetingDetail from './pages/MeetingDetail';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage  from './pages/SettingsPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/"             element={<LandingPage />} />
          <Route path="/login"        element={<LoginPage />} />
          <Route path="/signup"       element={<SignupPage />} />
          <Route path="/dashboard"    element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/upload"       element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />
          <Route path="/meetings/:id" element={<ProtectedRoute><MeetingDetail /></ProtectedRoute>} />
          <Route path="/analytics"    element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
          <Route path="/settings"     element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="*"             element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}