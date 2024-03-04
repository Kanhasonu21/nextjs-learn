import Navbar from "../navbar/Navbar";
import Dashboard from "./components/Dashboard";


export const metadata = {
    // metadataBase: new URL('http://localhost:300'),
    title:"Add New Task",
    description:'The New Way to develop web app',
    // openGraph:{
    //     title: 'this is open graph title for testing',
    //     description: 'Some description',
    // }
}
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