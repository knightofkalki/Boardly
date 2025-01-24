import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Navbar } from "./components/Navbar/Navbar";
import { Sidebar } from "./components/Sidebar";

// Routes
import Communities from "./pages/Communities";
import MentorBooking from "./components/MentorBooking";
import LandingPage from "./pages/LandingPage";
import Contact from "./pages/Contact";
import Report from "./pages/Report";
import Settings from "./pages/Settings";
import SlotListPage from "./pages/Slot/SlotList";
import SlotAddPage from "./pages/Slot/SlotAdd";
import NotFoundPage from "./pages/404";
import NoAccessPage from "./pages/403";
import { Home } from "./pages/Home";
import Subjects from "./pages/Subjects";
import SubjectContent from "./pages/SubjectContent";
import PYQList from "./pages/PYQList";
import ChapterList from "./pages/ChapterList";
import TopperSolution from "./pages/TopperSolution";
import Attempt from "./pages/Attempt";
import ChapterQuestions from "./pages/ChapterQuestions";
import Upload from "./pages/Upload";
import Subscriptions from "./pages/Subscriptions";
import ForgotPassword from "./components/Landing/ForgotPassword";
import ResetPassword from "./components/Landing/ResetPassword";
import Demo from "./pages/Demo/main";
import DemoPYQList from "./pages/Demo/PYQList";

const ProtectedRoute = ({ children, hideSidebar = false, roles = [] }) => {
  const { currentUser, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/landing" />;
  }

  if (roles.length > 0 && !roles.includes(currentUser.type)) {
    return <Navigate to="/403" />;
  }

  return (
    <>
      <Navbar />
      <div className={hideSidebar ? "" : "md:ml-16"}>
        {!hideSidebar && <Sidebar />}
        {children}
      </div>
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/demo/:class" element={<Demo />} />
            <Route path="/demo/:class/:subject/pyq" element={
              <DemoPYQList />
            } />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/403" element={<NoAccessPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password/*" element={<ResetPassword />} />
            <Route path="/" element={
              <ProtectedRoute roles={['student', 'mentor']}>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/subjects" element={
              <ProtectedRoute roles={['student']}>
                <Subjects />
              </ProtectedRoute>
            } />
            <Route path="/communities" element={
              <ProtectedRoute roles={['student']}>
                <Communities />
              </ProtectedRoute>
            } />
            <Route path="/mentorship" element={
              <ProtectedRoute roles={['student']}>
                <MentorBooking />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute roles={['student', 'mentor']}>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/subscriptions" element={
              <ProtectedRoute roles={['student']}>
                <Subscriptions />
              </ProtectedRoute>
            } />
            <Route path="/subject/:subject" element={
              <ProtectedRoute roles={['student']}>
                <SubjectContent />
              </ProtectedRoute>
            } />
            <Route path="/subject/:subject/pyq" element={
              <ProtectedRoute roles={['student']}>
                <PYQList />
              </ProtectedRoute>
            } />
            <Route path="/subject/:subject/chapters" element={
              <ProtectedRoute roles={['student']}>
                <ChapterList />
              </ProtectedRoute>
            } />
            <Route path="/subject/:subject/chapters/:chapterId" element={
              <ProtectedRoute roles={['student']}>
                <ChapterQuestions />
              </ProtectedRoute>
            } />
            <Route path="/subject/:subject/pyq/:year/topper-solution" element={
              <ProtectedRoute roles={['student']}>
                <TopperSolution />
              </ProtectedRoute>
            } />
            <Route path="/subject/:subject/pyq/:year/attempt" element={
              <ProtectedRoute roles={['student']} hideSidebar={true}>
                <Attempt />
              </ProtectedRoute>
            } />
            <Route path="/subject/:subject/upload" element={
              <ProtectedRoute roles={['student']}>
                <Upload />
              </ProtectedRoute>
            } />
            <Route path="/slot/" element={
              <ProtectedRoute roles={['mentor']}>
                <SlotListPage />
              </ProtectedRoute>
            } />
            <Route path="/slot/add" element={
              <ProtectedRoute roles={['mentor']}>
                <SlotAddPage />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}