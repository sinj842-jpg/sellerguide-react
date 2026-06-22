import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { ReadinessPage } from './pages/ReadinessPage'
import { ChecklistPage } from './pages/ChecklistPage'
import { StepDetailPage } from './pages/StepDetailPage'
import { ReadyCompletePage } from './pages/ReadyCompletePage'
import { SmartstoreSetupPage } from './pages/SmartstoreSetupPage'
import { BusinessCompliancePage } from './pages/BusinessCompliancePage'
import { MyInfoPage } from './pages/MyInfoPage'
import { DetailPageAiPage } from './pages/DetailPageAiPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/detail-page-ai" element={<DetailPageAiPage />} />
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <ReadinessPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checklist/:type"
          element={
            <ProtectedRoute>
              <ChecklistPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checklist/:type/step/:index"
          element={
            <ProtectedRoute>
              <StepDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checklist/:type/complete"
          element={
            <ProtectedRoute>
              <ReadyCompletePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/smartstore-setup"
          element={
            <ProtectedRoute>
              <SmartstoreSetupPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/business-compliance"
          element={
            <ProtectedRoute>
              <BusinessCompliancePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-info"
          element={
            <ProtectedRoute>
              <MyInfoPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
