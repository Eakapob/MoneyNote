"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const Dashboard: React.FC = () => {
    return (
        <div className="flex h-screen">
            <div className="w-2/12"><Navbar /></div>
            <div className="flex-1 p-4">
                <h1>Welcome to Dashboard</h1>
                <div className="flex justify-start items-start gap-4 mt-4">
                    <div className="flex flex-col gap-4">
                        <div className="w-[230px] h-[140px] rounded-lg shadow-md">
                        </div>
                        <div className="w-[230px] h-[140px] rounded-lg shadow-md">
                        </div>
                    </div>
                    <div className="flex w-[540px] h-[390px] rounded-lg shadow-md">
                    </div>
                </div>
            </div>
            <div className="w-3/12"><Sidebar /></div>
        </div>
    )
}
export default Dashboard;