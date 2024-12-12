import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Header } from './components/Layout/Header'
import { Dashboard } from './components/Dashboard/Dashboard'
import { AUMList } from './components/AUMList/AUMList'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <AUMList />
                  </div>
                  <div className="lg:col-span-2">
                    <Dashboard />
                  </div>
                </div>
              }
            />
            <Route
              path="/portfolio"
              element={
                <div className="max-w-7xl mx-auto">
                  <AUMList />
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </QueryClientProvider>
  )
}

export default App
