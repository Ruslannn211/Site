import AppNavigator from "./pages/AppNavigator.tsx";
import {Route, Routes} from "react-router-dom";
import AppAdminNavigator from "./admin-pages/AppAdminNavigator.tsx";
import {useStore} from "@store";

function App() {
    const {user} = useStore(store => store.global.user);

    return (
        <Routes>
            {user?.isAdmin && (
                <Route path="/control/*" element={<AppAdminNavigator />}/>
            )}
            <Route path="/*" element={<AppNavigator />}/>
        </Routes>
    );
}

export default App
