
import Animation from './components/Animation';

export default function Home() {
  const text ="NextJs is so cool! Lets Learn it."
  return (
    <main>
      <div className="home-page"></div>
      <Animation data={text}/>
    </main>
  )
}
