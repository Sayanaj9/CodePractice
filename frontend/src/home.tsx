
import { useEffect } from 'react'
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
        <div className="h-20 bg-[#1F93CC] flex flex-col items-center justify-center mb-4">

            <div className='text-white p-2 text-3xl font-bold '>Code Practise</div> 
        </div>
      

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-[#1F93CC]">
            <th className="border border-gray-300 p-4 text-left font-semibold text-white">Questions</th>
            <th className="border border-gray-300 p-4 text-left font-semibold text-white">Difficulty</th>
            <th className="border border-gray-300 p-4 text-left font-semibold text-white">Category</th>
          </tr>
        </thead>
        <tbody>
          {allQuestionList?.map((question: any) => ( 
            <tr  className="hover:bg-gray-50 cursor-pointer" onClick={()=>handleQuestionSelection(question)}>
              <td className="border border-gray-300 p-4 text-black text-start ">{question?.description}</td>
              <td className="border border-gray-300 p-4 text-black text-start">{question?.difficulty}</td>
              <td className="border border-gray-300 p-4 text-black text-start">{question?.category_name}</td>
            </tr>
           ))} 
        </tbody>
      </table>
    </div>
  )
}

export default Home
