import Chart from "@/components/dashboard/charts/Chart";
import WorkHistory from "@/components/dashboard/charts/WorkHistory";


export default function DashboardAnalytics() {
    return (
        <>
            <div className="flex mt-20 gap-5">

                <div className="w-3/4 pr-20">
                    <p className="text-lg text-stone-600">Analytics</p>
                    <Chart />
                </div>

                {/* Recent Activity */}
                <div className="w-1/4">
                    <p className="text-lg text-stone-600">Recent Activities</p>
                    <ul>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>

            <div>
                <p>Work History</p>
                <WorkHistory />
            </div>

        </>
    )
}