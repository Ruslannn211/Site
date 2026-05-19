import {Navigate, Route, Routes} from "react-router-dom";
import AdminLayout from "@components/layout/admin-panel/AdminLayout.tsx";
import DashboardPage from "@admin-pages/dashboard/DashboardPage.tsx";
import OrdersPage from "@admin-pages/orders/OrdersPage.tsx";
import RepairPage from "@admin-pages/repair/RepairPage.tsx";
import ProductsPage from "@admin-pages/products/ProductsPage.tsx";
import CategoriesPage from "@admin-pages/categories/CategoriesPage.tsx";
import UsersPage from "@admin-pages/users/UsersPage.tsx";

function AppAdminNavigator() {
    return (
        <AdminLayout>
            <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/repair" element={<RepairPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="*" element={<Navigate to="/control/dashboard" replace />} />
            </Routes>
        </AdminLayout>
    )
}

export default AppAdminNavigator
