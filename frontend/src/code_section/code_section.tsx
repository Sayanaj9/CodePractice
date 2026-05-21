import Question from "./question"
import Testcase from "./testcase"
import EditorScreen from "./editor_screen"
import { useAppSelector,useAppDispatch } from "../store/hooks"
import { postTestcode } from "../store/reducers"

function CodeSection() {
 const dispatch=useAppDispatch()
 const userTypedCode = useAppSelector(
    (state) => state.testcode.typedCode
  )
// const isRunBtnActive=useAppSelector((state)=>state?.questionsList?.runBtnActive)
const questionSelectedByUser=useAppSelector((state)=>state?.questionsList?.questionSelected)
const initialCode=questionSelectedByUser?.starter_code;
const questionId=questionSelectedByUser?.category_id;

const handleRunBtn=()=>{
        if(userTypedCode===''){
                    dispatch(postTestcode({questionId:questionId,code:initialCode}))
        }
        else{
                    dispatch(postTestcode({questionId:questionId,code:userTypedCode}))
        }
}
  return (

 <div className="h-screen bg-[#007FFF] flex flex-col">
        <div className="h-20 bg-#007FFF] flex items-center p-5 justify-between">

            <div className='text-white text-3xl font-bold'>Code Practise</div> 
            <button className="text-black h-10 w-24 bg-white rounded-xl font-bold cursor-pointer" onClick={handleRunBtn}
            >Run</button>
        </div>
        <div className='grid grid-cols-12 gap-4 p-4 flex-1 overflow-auto'>
                    
                    <div className='col-span-3 bg-white p-4 rounded-xl text-black-500 font-bold'>
                       <Question questionSelectedByUser={questionSelectedByUser}/>
                    </div>
                    <div className='col-span-5 bg-white p-4 rounded-xl text-black-500 font-bold'>
                         <EditorScreen  questionSelectedByUser={questionSelectedByUser}/>
                    </div>
                    <div className='col-span-4 bg-white p-4 rounded-xl text-black-500 font-bold'>
                         <Testcase />
                    </div>
        </div>
   </div> 
    
  )
}

export default CodeSection
