import React from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppLoader from "./hoc/appLoader";
import Navbar from "./components/ui/navbar";

function App() {
    const element = useRoutes(routes);
    return (
        <>
            <AppLoader>
                <Navbar />
                {element}
            </AppLoader>

            <ToastContainer />
        </>
    );
}

export default App;
