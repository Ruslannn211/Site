import AppNavigator from "./pages/AppNavigator.tsx";
import {Route, Routes} from "react-router-dom";
import AppAdminNavigator from "./admin-pages/AppAdminNavigator.tsx";

function App() {
    return (
        <Routes>
            <Route
                path="/control/*"
                element={<AppAdminNavigator />}
            />

            <Route
                path="/*"
                element={<AppNavigator />}
            />
        </Routes>
    );
}

export default App
