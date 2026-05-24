import QuestionScreen from "./question_screen"
import Testcase from "./testcase_screen"
import EditorScreen from "./editor_screen"
import { useAppSelector,useAppDispatch } from "../store/hooks"
import { postTestcode,resetTestCodeResults, setLoader } from "../store/reducers"
import { useNavigate } from "react-router-dom";


function WorkSpace() {
 const dispatch=useAppDispatch()
 const userTypedCode = useAppSelector(
    (state) => state.testcode.typedCode
  )
 const loader = useAppSelector(
    (state) => state.testcode.loader
  )
  
const navigate=useNavigate()

const questionSelectedByUser=useAppSelector((state)=>state?.questionsList?.questionSelected)
const initialCode=questionSelectedByUser?.starter_code;
const questionId=questionSelectedByUser?.id;

const handleRunBtn=()=>{
       dispatch(setLoader())
        if(userTypedCode===''){
                    dispatch(postTestcode({questionId:questionId,code:initialCode})).then(()=>dispatch(setLoader()))
        }
        else{
                    dispatch(postTestcode({questionId:questionId,code:userTypedCode})).then(()=>dispatch(setLoader()))
        }
}
const handleReturnToHomeBtn=()=>{
     dispatch(resetTestCodeResults([]))
     navigate("/")
}
  return (


<div className="h-screen bg-gray-200 flex flex-col overflow-hidden"> 
        <div className="flex items-center p-5 justify-between bg-slate-800 rounded-2xl">

            <div className='text-white text-3xl font-bold'>CodePractice</div> 
            <div className="flex gap-4">
               <button data-testid="run_btn" className="px-5 py-2 cursor-pointer rounded-xl bg-gray-200  font-medium text-gray-900 shadow hover:bg-gray-100 hover:scale-105 transition duration-200" onClick={handleReturnToHomeBtn}>Return to Home</button>
               <button data-testid="run_btn" className={`px-6 py-2 rounded-xl bg-blue-500 text-white font-medium shadow-sm hover:bg-blue-600 hover:scale-105 transition duration-200 ${loader ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
              disabled={loader}    onClick={handleRunBtn}>
                  {loader? "Running.." : '▶ Run'}</button>

            </div>
        </div>
             <div className='grid grid-cols-12 gap-4 p-4 flex-1 min-h-0 overflow-hidden'>
                    <div className='col-span-3 bg-white shadow-md border-2  border-gray-200 p-4 rounded-xl text-black font-bold flex flex-col flex-1 min-h-0'>
                       <QuestionScreen questionSelectedByUser={questionSelectedByUser}/>
                    </div>
                    <div className='col-span-5 bg-white shadow-md border-2 border-gray-200 p-4 rounded-xl text-black font-bold flex flex-col flex-1 min-h-0'>
                         <EditorScreen  questionSelectedByUser={questionSelectedByUser}/>
                    </div>
                    <div className='col-span-4 bg-white shadow-md border-2  border-gray-200 p-4 rounded-xl text-black font-bold flex flex-col flex-1 min-h-0'>
                         <Testcase />
                    </div>
               </div>
   </div> 
    
  )
}

export default WorkSpace
