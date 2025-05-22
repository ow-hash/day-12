import Link from "next/link";



export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Link href="/dashboard/chart" className="bg-[#facc15] px-5 py-3 m-5 hover:bg-amber-200 rounded-2xl hover:text-black text-white font-bold">To Dashboard</Link>
        </div>
    );
}
