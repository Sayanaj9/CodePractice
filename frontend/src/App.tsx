
import './App.css'
import CodeSection from './code_section/code_section'
import { useAppSelector } from "./store/hooks";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './home';
function App() {
  const allQuestionList = useAppSelector(
    (state) => state.questionsList.questions
  )

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home"/>}></Route> 
        <Route path="/home" element={<Home/> }/> 
        <Route path="/editor" element={<CodeSection/> }/> 


    </Routes>

  )
}

export default App
