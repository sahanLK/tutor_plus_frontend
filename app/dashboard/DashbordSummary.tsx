import {FaBookReader} from "react-icons/fa";
import {IoDocumentText} from "react-icons/io5";


export default function DashBoardSummary() {
    console.log("Mounted: Summary");
    return (
        <>
            {/* Cards */}
            <div className="cards flex flex-wrap gap-x-10 mt-12">
                {/* <DashBoardCard title="Classes Today" value="" icon=<FaBookReader /> url="" urlText="" /> */}
                {/* <DashBoardCard title="Assignments Today" value="" Icon="" url="" urlText="" />
                <DashBoardCard title="Quizzes Today" value="" Icon="" url="" urlText="" />
                <DashBoardCard title="My Balance" value="$230" Icon="" url="" urlText="" /> */}
                <div className="w-90 h-40 pl-8 py-8 bg-[#6a73fa] rounded-lg text-white shadow-lg">
                    <div className="flex">
                        <div className="w-2/3">
                            <h3 className="text-md pb-4 tracking-widest">CLASSES &nbsp;TODAY</h3>
                            <h1 className="text-2xl font-bold">2</h1>
                        </div>
                        <div className="w-1/3 flex items-center pl-2">
                            <FaBookReader size={40}/>
                        </div>
                    </div>
                </div>

                <div className="w-90 h-40 pl-8 py-8 bg-[#fabd23] rounded-lg text-white shadow-lg">
                    <div className="flex">
                        <div className="w-2/3">
                            <h3 className="text-md pb-4 tracking-widest">ASSIGNMENTS &nbsp;TODAY</h3>
                            <h1 className="text-2xl font-bold">2</h1>
                        </div>
                        <div className="w-1/3 flex items-center pl-2">
                            <IoDocumentText size={40}/>
                        </div>
                    </div>
                </div>

                <div className="w-90 h-40 pl-8 py-8 bg-[#04cc0e] rounded-lg text-white shadow-lg">
                    <div className="flex">
                        <div className="w-2/3">
                            <h3 className="text-md pb-4 tracking-widest">ASSIGNMENTS &nbsp;TODAY</h3>
                            <h1 className="text-2xl font-bold">2</h1>
                        </div>
                        <div className="w-1/3 flex items-center pl-2">
                            <FaBookReader size={40} className="mx-auto"/>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}