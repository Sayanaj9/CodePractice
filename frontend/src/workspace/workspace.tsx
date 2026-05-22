import QuestionScreen from "./question_screen"
import Testcase from "./testcase_screen"
import EditorScreen from "./editor_screen"
import { useAppSelector,useAppDispatch } from "../store/hooks"
import { postTestcode } from "../store/reducers"

function WorkSpace() {
 const dispatch=useAppDispatch()
 const userTypedCode = useAppSelector(
    (state) => state.testcode.typedCode
  )
// const isRunBtnActive=useAppSelector((state)=>state?.questionsList?.runBtnActive)
const questionSelectedByUser=useAppSelector((state)=>state?.questionsList?.questionSelected)
const initialCode=questionSelectedByUser?.starter_code;
const questionId=questionSelectedByUser?.id;

const handleRunBtn=()=>{
        if(userTypedCode===''){
                    dispatch(postTestcode({questionId:questionId,code:initialCode}))
        }
        else{
                    dispatch(postTestcode({questionId:questionId,code:userTypedCode}))
        }
}
  return (

 <div className="h-screen bg-[#1F93CC] flex flex-col overflow-hidden">
        <div className="h-20 flex items-center px-5 justify-between">

            <div className='text-white text-3xl font-bold'>CodePractice</div> 
            <button data-testid="run_btn" className="text-black h-10 w-24 bg-white hover:bg-gray-200 rounded-xl font-bold cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md" onClick={handleRunBtn}
            >▶ Run</button>
        </div>
             <div className='grid grid-cols-12 gap-4 p-4 flex-1 min-h-0 overflow-hidden'>
                    <div className='col-span-3 bg-white p-4 rounded-xl text-black-500 font-bold flex flex-col flex-1 min-h-0'>
                       <QuestionScreen questionSelectedByUser={questionSelectedByUser}/>
                    </div>
                    <div className='col-span-5 bg-white p-4 rounded-xl text-black-500 font-bold flex flex-col flex-1 min-h-0'>
                         <EditorScreen  questionSelectedByUser={questionSelectedByUser}/>
                    </div>
                    <div className='col-span-4 bg-white p-4 rounded-xl text-black-500 font-bold flex flex-col flex-1 min-h-0'>
                         <Testcase />
                    </div>
        </div>
   </div> 
    
  )
}

export default WorkSpace
