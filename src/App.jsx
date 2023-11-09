import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import data from "./data.json";
// import DatePicker from './comp/SelectDate';
import SelectDate from './comp/SelectDate';
function App() {
  const [count, setCount] = useState(0)
  // console.log(JSON.stringify(data))
  return (
    <>
      <SelectDate/>
    </>
  )
}

export default App
