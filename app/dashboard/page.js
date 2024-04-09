import { getServerSession } from "next-auth";
import Navbar from "../navbar/Navbar";
import Dashboard from "./components/Dashboard";
import { redirect } from "next/navigation";


export const metadata = {
    title: "Add New Task",
    description: 'The New Way to develop web app',
}
export default async function DashboardPage() {
    const session = await getServerSession();
    if(!session) redirect('/login');
    
    const PortalURI= process.env.NEXT_PUBLIC_PORTAL_URI;
    const response = await fetch(`${PortalURI}/api/dashboard`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
          },
        cache: 'no-store'
    })

    const { data = [] } = await response.json()

    return (
        <main className="bg-gray-50 dark:bg-gray-900">
            <Dashboard todoList={data} />
        </main>
    )
}