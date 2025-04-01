import AuthGuard from "@/components/AuthGuard";

export default function DashBoard() {
    return (
        <AuthGuard>
            <div>
                <h2>Dashboard</h2>
            </div>
        </AuthGuard>
    )
}
