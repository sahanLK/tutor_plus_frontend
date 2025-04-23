import { GoCloudOffline } from "react-icons/go";

export default function Sidebar() {
    return (
        <div className="col-span-2 px-4 pt-10 bg-gray-60 shadow pl-10">
            <section className="mb-10">
                <span className="text-stone-600 text-sm">Menu</span>
                <ul className="mt-2">
                    <li className="flex">Classes</li>
                    <li>Quizzes</li>
                    <li>Layouts</li>
                </ul>
            </section>
            <section>
                <span className="text-stone-600 text-sm">Menu</span>
                <ul className="mt-2">
                    <li>Home</li>
                    <li>Analytics</li>
                    <li>Layouts</li>
                </ul>
            </section>
        </div>
    )
}
