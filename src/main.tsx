import {createRoot} from 'react-dom/client'
import './assets/scrollbar.css'
import './assets/index.css'
import App from './App.tsx'
import {setGlobalTheme} from "@atlaskit/tokens";
import '@atlaskit/css-reset';
import {Provider} from "react-redux";
import store from "./store/store.ts";
import {BrowserRouter} from "react-router-dom";
import {AuthWatcher} from "@components/AuthWatcher.tsx";

setGlobalTheme({light: "light", dark: "dark", colorMode: "light"}); //auto

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
            <AuthWatcher />
        </BrowserRouter>
    </Provider>
)
