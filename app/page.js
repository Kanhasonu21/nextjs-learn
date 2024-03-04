
import Animation from './components/Animation';
import { TypewriterEffect } from './components/TypeWriterEffect';
import {words} from './constants/constants';

export default function Home() {
  return (
    <main>
      <div className="home-page">
        <TypewriterEffect words={words} />
      </div>

    </main>
  )
}
