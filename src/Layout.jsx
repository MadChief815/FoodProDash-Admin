import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import TopBar from './Components/ToBar';

const Layout = () => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar fixed on the left */}
            <Sidebar />

            {/* Right side with TopBar and routed content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <TopBar />
                <div style={{ flex: 1, overflow: "auto" }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;