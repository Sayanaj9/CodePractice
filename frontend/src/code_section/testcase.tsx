import { useEffect, useState } from "react"
import AnalysisModal from "../modal/analysis_modal"
import { useAppSelector } from "../store/hooks"

function Testcase() {
  const [testCases, setTestCases] = useState([])
  const [openModal, setOpenModal] = useState(false)
    const [analysis, setAnalysis] = useState('')
    const [loader, setLoader] = useState(false)

  const {testCodeResults,typedCode}=useAppSelector((state)=>state?.testcode)
  const showMessages=testCodeResults.length!==0
  const questionSelectedByUser=useAppSelector((state)=>state?.questionsList?.questionSelected)
const initialCode=questionSelectedByUser?.starter_code;
  useEffect(()=>{
     fetch('/api/testcases',{
      method:"POST",
      headers:{
          "Content-Type":"application/json"
        },
      body:JSON.stringify({questionId:questionSelectedByUser?.id})
      
     }).then((res)=>res.json()
     .then((data)=>{
      const availableTestCases=data.filter((test:any)=>!test?.is_hidden)
      setTestCases(availableTestCases)
    }
    ))},[])

    let passedNonHiddenTestcases=[]
    let nonHiddenTestCaseResults=[]
    const getVisibleTestcaseResult=(id:number)=>{
          nonHiddenTestCaseResults=testCodeResults.filter((test:any)=>!test?.is_hidden)
          passedNonHiddenTestcases=nonHiddenTestCaseResults.filter((res)=>res.passed)
          const result=nonHiddenTestCaseResults.filter((res:any)=>res.id===id)
          if(result!==undefined){

                if(result[0]?.passed){
                      return{
                          message:"Passed",
                          theme:'text-green-500'
                    }
                      
              }
              else{
                 return{
                      message:"Failed",
                      theme: 'text-red-500'
                    }
              }
          }
    }

    const getHiddenTestcaseMessage=(message:string)=>{
      if(message==='hidden'){
              const hiddenTestCaseResults=testCodeResults.filter((test:any)=>test?.is_hidden)
              const failedHiddenTestcases=hiddenTestCaseResults.filter((res)=>!res.passed)
              if(failedHiddenTestcases?.length!==0){
                    return{
                      message:`Failed: ${failedHiddenTestcases?.length} / ${hiddenTestCaseResults?.length}`,
                      theme:'text-red-500'
                    }
              }
              else{
                   return{
                      message:'All Testcases Passed',
                      theme:'text-green-500'
                    }
              }
      }
    }
    const hiddenTestcaseResults = getHiddenTestcaseMessage('hidden');
    const handleAnalysisModal = async() => {
      setOpenModal(true)
      setLoader(true)
      let code;
       if(typedCode===''){
                         code=initialCode
              }
              else{
                         code=typedCode
              }
      try{
        const response=await fetch('/api/ai-test',{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
         },
            body:JSON.stringify({code})
          })
          if (!response.ok) {
                throw new Error("AI request failed");
            }
          const data=await response.json();
                setLoader(false)

          setAnalysis(data?.analysis);
      }
      catch (error) {
            setAnalysis("Failed to analyze code.")  
        }
        finally {

                    setLoader(false);

      }
    
    }

  return (

        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
                <div className="flex items-center justify-center">
                  <div className="text-black h-10 text-xl">TestCases</div>

                </div>

                {/* ----------------------- Analysis Modal -------------------------------*/}
                <AnalysisModal open={openModal} onClose={() => setOpenModal(false)} analysisData={analysis} loader={loader}/>
                
                {/* ----------------------- visible testcase section  -------------------------------*/}
                <div className="flex flex-col flex-1 min-h-0 bg-gray-100 rounded-xl p-5">
                  <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent">
                    { testCases.map((testCase:any,id)=>(
                        <div className=" border-b border-gray-300 pb-4 mb-4" key={id}>
                            <div className="p-2 mb-4 pointer text-black text-start bg-slate-50 border border-slate-300 rounded-xl shadow-md">
                                <div>Case {id}</div>
                          </div>
                            <div className="text-start text-sm text-black font-normal flex flex-col gap-2 hover:shadow-lg transition"> 
                                  <div>Input: {testCase?.input}</div>
                                  <div>Expected Output: {testCase?.expected_output}</div>
                            </div>
                            {showMessages &&<div className="text-sm text-gray-600 text-start pt-[8px]"> 
                                  <span className={getVisibleTestcaseResult(testCase?.id)?.theme}>{getVisibleTestcaseResult(testCase?.id)?.message}</span>
                            </div>}
                        </div>
                      ))}
                    {/* Passed summary and hidden testcases inside scrollable list */}
                    {showMessages&&<div className="text-sm text-green-500 mb-4 text-start">Passed: {passedNonHiddenTestcases?.length} / {nonHiddenTestCaseResults?.length}</div>}
                    {showMessages&&<div >
                        <div className="font-semibold flex h-10 p-2 bg-white pointer text-black mb-4">
                            🔒 Hidden Testcases
                        </div>
                        <div className={`text-sm text-gray-600 mb-4  text-start ${hiddenTestcaseResults?.theme}`}>
                          {hiddenTestcaseResults?.message}
                        </div>
                      </div>}
                  </div>
                  {showMessages&&
                      <button className="font-semibold bg-[#007FFF] h-10 p-2 text-white cursor-pointer rounded-xl mt-4 hover:bg-[#0066CC] transition-all duration-200 shadow-sm hover:shadow-md" onClick={handleAnalysisModal}>
                          ✨ Analyze Complexity
                      </button>
                  }
                </div>
            </div>
  )
}

export default Testcase
