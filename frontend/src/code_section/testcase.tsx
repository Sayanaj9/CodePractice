function Testcase({questionSelectedByUser}:QuestionProps) {

  return (

<div className="flex flex-col h-full">
        <div className="text-black h-10 text-xl">TestCases</div>
        <div className="flex-1 bg-gray-200 rounded-xl p-5">
       
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
