import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { LandingPageList } from '@/pages/LandingPageList';
import { LandingPageEditor } from '@/pages/LandingPageEditor';
import { LandingPagePreview } from '@/pages/LandingPagePreview';
import { LandingPagePublic } from '@/pages/LandingPagePublic';

interface AppProps {
  institution?: {
    id: string;
    name: string;
  };
  apiBaseUrl?: string;
}

function App({ institution, apiBaseUrl = '/api' }: AppProps) {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        {/* Admin Routes */}
        <Route
          path="/"
          element={<LandingPageList institution={institution} apiBaseUrl={apiBaseUrl} />}
        />
        <Route
          path="/new"
          element={<LandingPageEditor institution={institution} apiBaseUrl={apiBaseUrl} />}
        />
        <Route
          path="/:id/edit"
          element={<LandingPageEditor institution={institution} apiBaseUrl={apiBaseUrl} />}
        />
        <Route
          path="/:id/preview"
          element={<LandingPagePreview apiBaseUrl={apiBaseUrl} />}
        />

        {/* Public Routes */}
        <Route
          path="/lp/:slug"
          element={<LandingPagePublic apiBaseUrl={apiBaseUrl} />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
