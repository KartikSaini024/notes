import { useState } from 'react'
import Header from './Header.jsx';
import NotesContainer from './NotesContainer.jsx';
import Footer from './Footer.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <NotesContainer />
       
      <Footer />
    </>
  )
}

export default App
