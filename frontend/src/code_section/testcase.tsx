import { useEffect,useState } from "react"
import { useAppSelector } from "../store/hooks"

function Testcase({questionSelectedByUser}:QuestionProps) {
  const[testCases,setTestCases]=useState([])
  const testCodeResults=useAppSelector((state)=>state?.testcode?.testCodeResults)
  const showMessages=testCodeResults.length!==0
  useEffect(()=>{
     fetch('/api/testcases').then((res)=>res.json()
     .then((data)=>{
      const availableTestCases=data.filter((test:any)=>!test?.is_hidden)
      setTestCases(availableTestCases)
    }
    ))},[])

    let passedNonHiddenTestcases=[]
    let testResultTheme='text-green-500'
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
  return (

        <div className="flex flex-col h-full">
                <div className="text-black h-10 text-xl">TestCases</div>
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

                      {showMessages&&<div >
                          <div className="font-semibold flex h-10 p-2 bg-white pointer text-black mb-4">
                              🔒 Hidden Testcases
                          </div>

                          <div className={`text-sm text-gray-600 mt-1 text-start ${hiddenTestcaseResults?.theme}`}>
                            {hiddenTestcaseResults?.message}
                          </div>
                        </div>}

                </div>
            </div>
  )
}
type QuestionType={
    "id": number,
        "title": string,
        "description": string,
        "difficulty": string,
        "category_id": number
}
type QuestionProps={
  questionSelectedByUser:QuestionType|null;
}

export default Testcase
