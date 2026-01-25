import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import UploadPage from './pages/UploadPage'
import ProcessingPage from './pages/ProcessingPage'
import ReportPage from './pages/ReportPage'
import ActionWorkflowPage from './pages/ActionWorkflowPage'
import MatchDetailPage from './pages/MatchDetailPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="processing" element={<ProcessingPage />} />
        <Route path="report" element={<ReportPage />} />
        <Route path="report/:matchId" element={<MatchDetailPage />} />
        <Route path="action-workflow" element={<ActionWorkflowPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  )
}

export default App
