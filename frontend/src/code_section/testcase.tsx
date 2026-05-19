import { useEffect,useState } from "react"

function Testcase({questionSelectedByUser}:QuestionProps) {
  const[testCases,setTestCases]=useState([])
  useEffect(()=>{
     fetch('/api/testcases').then((res)=>res.json()
     .then((data)=>{
      const availableTestCases=data.filter((test:any)=>!test?.is_hidden)
      setTestCases(availableTestCases)
    }
    ))})

    const handleTestcase=(testCase:any)=>{


    }
  return (

<div className="flex flex-col h-full">
        <div className="text-black h-10 text-xl">TestCases</div>
        <div className="flex flex-col flex-1 bg-gray-200 rounded-xl p-5  gap-4">
             { testCases.map((testCase:any,id)=>
                (
                <>
                <div className="flex h-10 p-2 bg-white pointer text-black">
                    <div onClick={()=>handleTestcase(testCase)}>Case {id}</div>
               </div>
                <div className="text-start text-xs"> 
                      <div>Input: {testCase?.input}</div>
                      <div>Expected Output:{testCase?.expected_output}</div>
                </div>
              </>
              ))}
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
