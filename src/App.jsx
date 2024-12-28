import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Home } from "./pages/Student/Home";
import Subjects from "./pages/Student/Subjects";
import SubjectContent from "./pages/Student/SubjectContent";
import PYQList from "./pages/Student/PYQList";
import ChapterList from "./pages/Student/ChapterList";
import TopperSolution from "./pages/Student/TopperSolution";
import Communities from "./pages/Communities";
import MentorBooking from "./components/MentorBooking";
import LandingPage from "./pages/LandingPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Attempt from "./pages/Student/Attempt";
import ChapterQuestions from "./pages/Student/ChapterQuestions";
import Upload from "./pages/Student/Upload";
import Subscriptions from "./pages/Student/Subscriptions";
import Contact from "./pages/Contact";
import Report from "./pages/Report";
import Settings from "./pages/Settings";

const ProtectedRoute = ({ children, hideSidebar = false }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/landing" />;
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
            <Route path="/contact" element={<Contact />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/subjects" element={
              <ProtectedRoute>
                <Subjects />
              </ProtectedRoute>
            } />
            <Route path="/communities" element={
              <ProtectedRoute>
                <Communities />
              </ProtectedRoute>
            } />
            <Route path="/mentorship" element={
              <ProtectedRoute>
                <MentorBooking />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/subscriptions" element={
              <ProtectedRoute>
                <Subscriptions />
              </ProtectedRoute>
            } />
            <Route path="/subject/:subject" element={
              <ProtectedRoute>
                <SubjectContent />
              </ProtectedRoute>
            } />
            <Route path="/subject/:subject/pyq" element={
              <ProtectedRoute>
                <PYQList />
              </ProtectedRoute>
            } />
            <Route path="/subject/:subject/chapters" element={
              <ProtectedRoute>
                <ChapterList />
              </ProtectedRoute>
            } />
            <Route path="/subject/:subject/chapters/:chapterId" element={
              <ProtectedRoute>
                <ChapterQuestions />
              </ProtectedRoute>
            } />
            <Route path="/subject/:subject/pyq/:year/topper-solution" element={
              <ProtectedRoute>
                <TopperSolution />
              </ProtectedRoute>
            } />
            <Route path="/subject/:subject/pyq/:year/attempt" element={
              <ProtectedRoute hideSidebar={true}>
                <Attempt />
              </ProtectedRoute>
            } />
            <Route path="/subject/:subject/upload" element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            } />
            <Route path="/subject/:subject/:year/report" element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/landing" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}