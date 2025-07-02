import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Authentication from './pages/Authentication'
import HomeFunction from './pages/Home/Home'
import ItemDetails from './pages/ItemDetails/ItemDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Authentication />
      {/* <HomeFunction /> */}
      {/* <ItemDetails />  */}
    </>
  )
}

export default App
