import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import AppLayout from './ui/AppLayout';

import Welcome from './pages/Welcome';
import Login from './pages/Login';
import PageNotFound from './ui/PageNotFound';
import ProtectedRoute from './ui/ProtectedRoute';
import InternalAppLayout from './ui/InternalAppLayout';
import { useDarkMode } from './context/DarkModeContext';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';

import Budget from './pages/Budget';
import Transactions from './pages/Transactions';
import Calendar from './pages/Calendar';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  const { isDarkMode } = useDarkMode();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <InternalAppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="budget" element={<Budget />} />
            <Route path="calendar" element={<Calendar />} />

            <Route path="account" element={<Account />} />
          </Route>

          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="welcome" />} />
            <Route path="welcome" element={<Welcome />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      {/* <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: isDarkMode ? 'bg-gray-800' : 'bg-gray-50',
            color: isDarkMode ? 'bg-gray-50' : 'bg-gray-800',
          },
        }}
      /> */}
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: isDarkMode ? 'bg-gray-50' : 'bg-gray-800',
            color: isDarkMode ? 'text-gray-800' : 'text-gray-50',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
