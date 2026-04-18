import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RootLayout } from "@/components/layouts/RootLayout";
import { StudentDashboard } from "@/pages/student/StudentDashboard";
import { EquipmentBrowse } from "@/pages/student/EquipmentBrowse";
import { BorrowRequest } from "@/pages/student/BorrowRequest";
import { TransactionHistory } from "@/pages/student/TransactionHistory";
import { InstructorDashboard } from "@/pages/instructor/InstructorDashboard";
import { LabAssistantDashboard } from "@/pages/labassistant/LabAssistantDashboard";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { Login } from "@/pages/Login";
import { NotFound } from "@/pages/NotFound";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const router = createBrowserRouter([
  { path: "/login", Component: Login },
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: StudentDashboard },
      { path: "equipment", Component: EquipmentBrowse },
      { path: "borrow", Component: BorrowRequest },
      { path: "history", Component: TransactionHistory },
      {
        path: "instructor",
        element: <ProtectedRoute allowedRoles={["instructor", "admin"]}><InstructorDashboard /></ProtectedRoute>
      },

      {
        path: "lab-assistant",
        element: <ProtectedRoute allowedRoles={["lab-assistant", "admin"]}><LabAssistantDashboard /></ProtectedRoute>
      },

      {
        path: "admin",
        element: <ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>
      },
    ]
  },

  {
    path: "*",
    Component: NotFound,
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}