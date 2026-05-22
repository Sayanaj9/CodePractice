import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AnalysisModal from "../modal/analysis_modal";
import WorkSpace from "../workspace/workspace";
import Testcase from "../workspace/testcase_screen";
import React from "react";

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

