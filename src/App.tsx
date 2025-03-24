import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Dashboard } from "@/pages/Dashboard"
import { Clients } from "@/pages/Clients"
import { ClientDetails } from "@/pages/ClientDetails"
import { SiteHeader } from './components/site-header'

export default function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
          <main className="flex flex-1 flex-col gap-4">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/clients/:id" element={<ClientDetails />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    </BrowserRouter>
  )
}
