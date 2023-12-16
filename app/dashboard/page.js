import Navbar from "../navbar/Navbar";
import Dashboard from "./components/Dashboard";


export default async function DashboardPage() {

    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        cache: 'no-store'
    })
    const users = await response.json()

    return (
        <main>
            <Dashboard users={users} />
        </main>
    )
}