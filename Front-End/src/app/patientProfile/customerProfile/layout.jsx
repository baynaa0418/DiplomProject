//src/app/patientProfile/customerProfile/layout.jsx
'use client';
import {useRouter} from "next/navigation"
// import PatientProfile from "@/app/patientProfile/customerProfile/page.jsx"
export default function DashboardLayout({ children }) {
    return (
      <div className="flex min-h-screen" >
        {/* <PatientProfile/> */}
        {/* <nav>Sidebar or Navbar here</nav> */}
        <main>{children}</main>
      </div>
    );
  }
  