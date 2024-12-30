import { Toaster } from "@/components/ui/sonner";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import CreateSupplier from "./pages/create-supplier.tsx";
import EditSupplier from "./pages/edit-supplier.tsx";
import SupplierOverview from "./pages/supplier-overview.tsx";
import SuppliersOverviewPage from "./pages/suppliers-overview.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SuppliersOverviewPage />} />
        <Route path="/:supplier" element={<SupplierOverview />} />
        <Route path="/:supplier/update" element={<EditSupplier />} />
        <Route path="/create" element={<CreateSupplier />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
