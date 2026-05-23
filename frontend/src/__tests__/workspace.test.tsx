import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AnalysisModal from "../modal/analysis_modal";
import reducers, {selectedQuestion,setTypedCode} from "../store/reducers";
import type { QuestionType,TestCaseType } from "../store/reducers";
/// <reference types="@testing-library/jest-dom" />
describe("Analysis Modal", () => {  

   //Modal close button
    it("calls onClose when close btn is clicked", () => {
    const mockClose=jest.fn()
    render(
            <AnalysisModal   open={true} onClose={mockClose} analysisData='' loader={true}/>
    );
    const closeBtn =  screen.getByTestId('modal_close_btn');
    fireEvent.click(closeBtn)
    expect(mockClose).toHaveBeenCalled();
   });

   //render time complexity data
    it("render analysis data", () => {
    const mockClose=jest.fn()
    render(
            <AnalysisModal   open={true} onClose={mockClose} analysisData='Time Complexity: O(n)' loader={false}/>
    );
    const analysisText=screen.getByText(/Time Complexity/i)
    expect(analysisText).toBeInTheDocument();
   });

     //Modal loader
    it("calls loader when loading", () => {
    const mockClose=jest.fn()
    render(
            <AnalysisModal   open={true} onClose={mockClose} analysisData='' loader={true}/>
    );
     const loader =  screen.getByText(/Analyzing/i);
    expect(loader).toBeInTheDocument();
   });

});

describe("questions reducer", () => {

  it("sets selected question", () => {

    const initialState = {
       questions: [] as QuestionType[],
        questionSelected: null as QuestionType | null,
        loading: false,
        error: null as string | null,
        runBtnActive:false
  
    };

    const result = reducers.questionsList(
      initialState,
      selectedQuestion({
            id: 3,
            title: "Trapping Rain Water",
            description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
            difficulty: "Difficult",
            category_id: 1,
            function_name: "trap",
            starter_code: "function trap(height) {}",
            // category_name: "Arrays"
      })
    );

    expect(result.questionSelected?.title)
   .toBe("Trapping Rain Water");

  });

});

describe("testcode reducer", () => {

  it("sets typed code", () => {

    const  initialState={
        typedCode: "",
        testCodeResults: [] as TestCaseType [],
        runBtnActive:false,
        loading: false,
        error: null as string | null,
    }

    const result = reducers.testcode(
      initialState,
      setTypedCode("function trap(height) {}")
    );

    expect(result.typedCode).toBe("function trap(height) {}");

  });

});



