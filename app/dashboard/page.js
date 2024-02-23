import Navbar from "../navbar/Navbar";
import Dashboard from "./components/Dashboard";


export default async function DashboardPage() {

    const response = await fetch('http://localhost:3000/todo', {
        cache: 'no-store'
    })
    const { data = [] } = await response.json()

    return (
        <main>
            <Dashboard todoList={data} />
        </main>
    )
}