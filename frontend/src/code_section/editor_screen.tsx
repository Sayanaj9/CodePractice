import Editor from '@monaco-editor/react';
import { useState } from 'react';
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

function EditorScreen({questionSelectedByUser}:QuestionProps) {
  const [typedCode,setTypedCode]=useState(null)
  const handleEditorChange=(data:any)=>{
    setTypedCode(data)
  }
  return (

<div className="flex flex-col h-full">
        <div className="text-black h-10 text-xl">Editor</div>
        <div className="flex-1 bg-gray-200 rounded-xl ">
              <Editor
                  height="100%"
                  options={{
                    padding:{
                      top:15,
                      bottom:15
                    }
                  }}
                  defaultLanguage="javascript"
                  defaultValue="// Write your code here"
                  theme="vs-dark"
                  onChange={handleEditorChange}
              />
        </div>
            

    </div>
  )
}

export default EditorScreen
