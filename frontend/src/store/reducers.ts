import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export  const fetchQuestions=createAsyncThunk(
 "questions/fetchQuestions",
 async ()=>{
    const response=await fetch(`${import.meta.env.VITE_API_URL}/api/questions`);
    const data=await response.json()
    return data
 }
)
export  const postTestcode=createAsyncThunk(
 "testcode/postTestcode",
 async (bodyData:any)=>{
    const response=await fetch(`${import.meta.env.VITE_API_URL}/api/testcode`,{
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(bodyData)
      });
    const data=await response.json()
    return data
 }
)
const questionSlice=createSlice({
    name:"questions",
    initialState: {
        questions: [] as QuestionType[],
        questionSelected: null as QuestionType | null,
        loading: false,
        error: null as string | null,
        runBtnActive:false,
        questionLoader:true
    },
    reducers:{
        selectedQuestion:(state,action: PayloadAction<QuestionType>)=>{
            state.questionSelected=action.payload; 

        },
        setQuestionLoader:(state)=>{
            state.questionLoader=!state.questionLoader
        }
    },
     extraReducers: (builder) => {
            builder.addCase(fetchQuestions.fulfilled, (state, action) => {
                       state.loading = false;
                       state.questions = action.payload;
            }),
            builder.addCase(fetchQuestions.pending, (state) => {
                       state.loading = true;
            }),
            builder.addCase(fetchQuestions.rejected, (state) => {
                       state.loading = false;
                       state.error = "Failed to fetch questions";
            })
  },
})

const testcodeSlice=createSlice({
    name:"testcode",

    initialState: {
        typedCode: "",
        testCodeResults: [] as TestCaseType [],
        runBtnActive:false,
        loading: false,
        error: null as string | null,
        loader:false
    },
    reducers:{
       isRunBtnClicked:(state)=>{
            state.runBtnActive=!state.runBtnActive; 
        },
        setTypedCode:(state,action)=>{
            state.typedCode=action.payload;
        },
        resetTestCodeResults:(state,action)=>{
            state.testCodeResults=action.payload;
        },
        setLoader:(state)=>{
            state.loader=!state.loader
        }
    },
     extraReducers: (builder) => {
            builder.addCase(postTestcode.fulfilled, (state, action) => {
                       state.loading = false;
                       state.testCodeResults = action.payload;
            }),
            builder.addCase(postTestcode.pending, (state) => {
                       state.loading = true;
            }),
            builder.addCase(postTestcode.rejected, (state) => {
                       state.loading = false;
                       state.error = "Failed to fetch questions";
            })
  },
})

export const {selectedQuestion,setQuestionLoader}=questionSlice.actions
export const {isRunBtnClicked,setTypedCode,resetTestCodeResults,setLoader}=testcodeSlice.actions
export interface  QuestionType  {
    id: number;
    title: string;
    description: string;
    difficulty: string;
    category_id: number;
    starter_code: string;
    function_name:string;
    instructions:string;
    examples:string;
}
export interface  TestCaseType  {
    input: number[];
    expectedOutput: number[];
    actualOutput: number[];
    id: number;
    is_hidden: boolean;
    passed: boolean;
}
export default {
    questionsList: questionSlice.reducer,
    testcode: testcodeSlice.reducer
}