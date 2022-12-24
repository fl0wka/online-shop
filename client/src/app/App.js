import React from "react";
import AppLoader from "./components/ui/hoc/appLoader";
import Navbar from "./components/ui/navbar/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";

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
