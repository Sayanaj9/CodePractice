
function QuestionScreen({questionSelectedByUser}:QuestionProps) {

  return (

    <div className="flex flex-col h-full">
        <div className="text-black h-10 text-xl">Description</div>
        <div className="flex-1 bg-gray-100 rounded-xl p-5 text-start text-black text-sm font-normal overflow-y-auto scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent">
                    <div className="font-semibold mb-2">{questionSelectedByUser?.description}</div>
                    <div className="whitespace-pre-line mb-2">
                          <div className="font-semibold mb-1">Instructions : </div>
                          <div>{questionSelectedByUser?.instructions} </div>
                      </div>
                      <div className="whitespace-pre-line">
                          <div className="font-semibold ">Example :</div>
                          <div>{questionSelectedByUser?.examples} </div>
                      </div>
          
        </div>
            

    </div>

    
  )
}
type QuestionType={
    "id": number, 
    "title": string,
    "description": string,
    "difficulty": string,
    "category_id": number,
    "instructions":string,
    "examples":string
}
type QuestionProps={
  questionSelectedByUser:QuestionType|null;
}
export default QuestionScreen


