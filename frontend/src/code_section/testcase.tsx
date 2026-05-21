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
     fetch('/api/testcases').then((res)=>res.json()
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

      const response=await fetch('/api/ai-test',{
        method:"POST",
          headers: {
            "Content-Type": "application/json"
         },
        body:JSON.stringify({code})
      })
      const data=await response.json();
            setLoader(false)

      setAnalysis(data?.analysis);
    
    }

    console.log({analysis})
  return (

        <div className="flex flex-col h-full">
                <div className="flex items-center justify-between">
                  <div className="text-black h-10 text-xl">TestCases</div>

                </div>
                <AnalysisModal open={openModal} onClose={() => setOpenModal(false)} analysisData={analysis} loader={loader}/>
                <div className="flex flex-col flex-1 bg-gray-200 rounded-xl p-5  gap-4">
                    { testCases.map((testCase:any,id)=>
                        (
                        <>
                        <div className="flex h-10 p-2 bg-white pointer text-black">
                            <div>Case {id}</div>
                      </div>
                        <div className="text-start text-xs"> 
                              <div>Input: {testCase?.input}</div>
                              <div>Expected Output:{testCase?.expected_output}</div>
                        </div>
                        {showMessages &&<div className="text-sm text-gray-600 text-start"> 
                              <span className={getVisibleTestcaseResult(testCase?.id)?.theme}>{getVisibleTestcaseResult(testCase?.id)?.message}</span>
                        </div>}
                        
                      </>
                      ))}
                      {showMessages&&<div className="text-sm text-green-500 mt-1 text-start">Passed: {passedNonHiddenTestcases?.length} / {nonHiddenTestCaseResults?.length}</div>}
                      {/* hidden testcase section */}
                      {showMessages&&<div >
                          <div className="font-semibold flex h-10 p-2 bg-white pointer text-black mb-4">
                              🔒 Hidden Testcases
                          </div>

                          <div className={`text-sm text-gray-600 mt-1 text-start ${hiddenTestcaseResults?.theme}`}>
                            {hiddenTestcaseResults?.message}
                          </div>
                        </div>}

                      {showMessages&&
                          <button className="font-semibold bg-[#007FFF] h-10 p-2 text-white cursor-pointer rounded-xl" onClick={handleAnalysisModal}>
                              ✨ Analyze Complexity
                          </button>
                        }

                </div>
            </div>
  )
}

export default Testcase
