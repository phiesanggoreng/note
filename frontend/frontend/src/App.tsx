import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AppProvider } from './context/AppContext'
import Layout from './layouts/Layout';
import Dashboard from './pages/Dashboard'
import NoteDetail from './pages/NoteDetail'
import NoteEditor from './pages/NoteEditor'
import Stats from './pages/Stats'
export function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex w-full min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
          <Toaster position="top-right" richColors />
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/note/:id" element={<NoteDetail />} />
              <Route path="/edit/:id" element={<NoteEditor />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
