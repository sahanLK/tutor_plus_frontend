'use client';
import AuthGuard from "@/components/AuthGuard";

const DashBoard = () => {
    // await new Promise((res) => setTimeout(res, 2000));

    return (
        <div>
            <h2>Dashboard</h2>
        </div>
    )
}

export default AuthGuard(DashBoard);