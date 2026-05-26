
import { useEffect } from 'react'
import { useAppSelector,useAppDispatch } from "./store/hooks";
import { fetchQuestions } from "./store/reducers"
import { useNavigate } from "react-router-dom";
import {selectedQuestion,setQuestionLoader} from'./store/reducers';
import type { QuestionType } from "./store/reducers";
function Home() {  
const dispatch=useAppDispatch()
const navigate=useNavigate()
 const loader = useAppSelector(
    (state) => state.questionsList.questionLoader
  )
  useEffect(()=>{
      dispatch(fetchQuestions()).then(()=>dispatch(setQuestionLoader()))
    
  },[])

  const allQuestionList = useAppSelector(
    (state) => state.questionsList.questions
  )
  
  const handleQuestionSelection=(question:QuestionType)=>{
    dispatch(selectedQuestion(question))
    navigate("/editor")
  }
  return (
    <div className="min-h-screen p-4">
        <div className="h-20 bg-slate-800 flex flex-col items-center justify-center mb-4 rounded-2xl">

            <div className='text-white p-2 text-3xl font-bold '>CodePractice</div> 
        </div>
       

      <table className="w-full border-collapse border border-gray-200 rounded-2xl overflow-hidden">
        <thead>
          <tr className="bg-slate-800">
            <th className="border-l border-gray-200 p-4 text-left font-semibold text-white">Questions</th>
            <th className="border-l border-gray-200 p-4 text-left font-semibold text-white">Difficulty</th>
            <th className="border-l border-gray-200 p-4 text-left font-semibold text-white">Category</th>
          </tr>
        </thead>
        <tbody>
           {loader?(
                <tr>
                  <td colSpan={3} className="p-20">
                     <div className="flex items-center justify-center">
                        <div className="
                            w-15 h-15
                            border-4
                            border-blue-500
                            border-t-transparent
                            rounded-full
                            animate-spin
                        "></div>
                      </div>
                  </td>
                 </tr>
            ) :
          allQuestionList?.map((question: any) => ( 
            <tr  className="hover:bg-gray-100 cursor-pointer" onClick={()=>handleQuestionSelection(question)}>
              <td className="border-b border-gray-200 p-4 py-5 text-gray-800 font-medium text-start ">{question?.description}</td>
              <td className="border-b border-gray-200 p-4 py-5 text-gray-800 font-medium text-start">{question?.difficulty}</td>
              <td className="border-b border-gray-200 p-4  py-5 text-gray-800 font-medium text-start">{question?.category}</td>
            </tr>
           ))} 
        </tbody>
      </table>
    </div>
  )
}

export default Home
