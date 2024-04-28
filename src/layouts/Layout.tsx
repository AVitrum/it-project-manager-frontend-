import { Outlet } from "react-router-dom";
import Header from "../layouts/Header";

export default function Layout() {
    return (
        <div className="layout">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
}