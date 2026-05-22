import React from "react";

interface AnalysisModalProps {
  open: boolean;
  onClose: () => void;
  analysisData:string,
  loader:boolean
}

const AnalysisModal: React.FC<AnalysisModalProps> = ({ open, onClose, analysisData,loader }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-[2px]">
        <div className="bg-white flex flex-col items-center rounded-2xl shadow-lg w-[50vw] min-h-[300px] max-h-[80vh] overflow-y-auto p-4 relative">
                <button className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold cursor-pointer" onClick={onClose} >
                &times;
                </button>
                <div className="text-lg font-bold mb-4"> ✨ Powered By AI</div>
                    <div className="text-sm text-gray-600  text-start flex flex-col items-center justify-center whitespace-pre-wrap p-4">
                        {loader ? (
                            <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                            <span>Analyzing...</span>
                            </div>
                        ):

                        analysisData
                    
                    }

                    </div>
        
        </div>
    </div>
  );
};

export default AnalysisModal;
