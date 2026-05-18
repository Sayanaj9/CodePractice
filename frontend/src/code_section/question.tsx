
function Question({questionSelectedByUser}:QuestionProps) {

  return (

    <div className="flex flex-col h-full">
        <div className="text-black h-10 text-xl">Description</div>
        <div className="flex-1 bg-gray-200 rounded-xl p-5">
          {questionSelectedByUser?.description}
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
export default Question


