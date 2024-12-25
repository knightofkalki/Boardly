import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Home } from "./pages/Home";
import Subjects from "./pages/Subjects";
import SubjectContent from "./pages/SubjectContent";
import PYQList from "./pages/PYQList";
import ChapterList from "./pages/ChapterList";
import TopperSolution from "./pages/TopperSolution";
import Communities from "./pages/Communities";
import MentorBooking from "./components/MentorBooking";
import LandingPage from "./pages/LandingPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Attempt from "./pages/Attempt";
import ChapterQuestions from "./pages/ChapterQuestions";
import Upload from "./pages/Upload";
import Subscriptions from "./pages/Subscriptions";
import Contact from "./pages/Contact";

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
            <Route path="/contact" element={
              <>
                <Navbar />
                <Contact />
              </>
            } />
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/schedule" element={
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
            <Route path="*" element={<Navigate to="/landing" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}