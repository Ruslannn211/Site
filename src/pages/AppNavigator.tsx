import ProductsPage from "@pages/products/ProductsPage.tsx";
import RepairPage from "@pages/repair/RepairPage.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import UserLayout from "@components/layout/user-panel/UserLayout.tsx";
import CheckoutPage from "@pages/checkout/CheckoutPage.tsx";

function AppNavigator() {
    return (
        <UserLayout>
            <Routes>
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:product" element={<ProductsPage />} />
                <Route path="/repair" element={<RepairPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="*" element={<Navigate to="/products" replace />} />
            </Routes>
        </UserLayout>
    )
}

export default AppNavigator
