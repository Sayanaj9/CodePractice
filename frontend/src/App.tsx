
import './App.css'
import WorkSpace from './workspace/workspace'
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './home';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home"/>}></Route> 
        <Route path="/home" element={<Home/> }/> 
        <Route path="/editor" element={<WorkSpace/> }/> 


    </Routes>

  )
}

export default App
