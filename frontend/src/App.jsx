
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <h1 className='text-5xl  text-red-600 '>Hello Developer </h1> 
      <Outlet/>
    </>
  )
}

export default App
