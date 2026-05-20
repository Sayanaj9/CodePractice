
import { useState,useEffect } from 'react'
import { useAppSelector,useAppDispatch } from "./store/hooks";
import { fetchQuestions } from "./store/reducers"
import { useNavigate } from "react-router-dom";
import {selectedQuestion} from'./store/reducers';
import type { QuestionType } from "./store/reducers";
function Home() {
const dispatch=useAppDispatch()
const navigate=useNavigate()
  useEffect(()=>{
      dispatch(fetchQuestions())
    
  },[])
  const allQuestionList = useAppSelector(
    (state) => state.questionsList.questions
  )
  
  const handleQuestionSelection=(question:QuestionType)=>{
    dispatch(selectedQuestion(question))
    navigate("/editor")
  }
  
  return (
    <div className="h-screen p-4">
        <div className="h-20 bg-[#007FFF] flex flex-col items-center justify-center mb-4">

            <div className='text-white p-2 text-3xl font-bold '>Code Practise</div> 
        </div>
      
      {/* <div className="mb-4 flex gap-2">
        <button 
          className={'px-4 py-2 rounded bg-gray-200 text-black font-medium'}
        >
          Sort by Questions
        </button>
        <button 
          className={`px-4 py-2 rounded bg-gray-200 text-black font-medium`}
        >
          Sort by Difficulty
        </button>
        <button 
          className={`px-4 py-2 roundedbg-gray-200 text-black font-medium`}
        >
          Sort by Category
        </button>
      </div> */}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left font-medium text-black">Questions</th>
            <th className="border border-gray-300 p-2 text-left font-medium text-black">Difficulty</th>
            <th className="border border-gray-300 p-2 text-left font-medium text-black">Category</th>
          </tr>
        </thead>
        <tbody>
          {allQuestionList?.map((question: any) => ( 
            <tr  className="hover:bg-gray-50 cursor-pointer" onClick={()=>handleQuestionSelection(question)}>
              <td className="border border-gray-300 p-2">{question?.description}</td>
              <td className="border border-gray-300 p-2">{question?.difficulty}</td>
              <td className="border border-gray-300 p-2">{question?.category_id}</td>
            </tr>
           ))} 
        </tbody>
      </table>
    </div>
  )
}

export default Home
