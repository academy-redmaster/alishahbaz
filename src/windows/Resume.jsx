import WindowControl from "../components/WindowControl";
import windowWrapper from "#hoc/windowWrapper";
import { Download } from "lucide-react";
import { pdfjs, Document, Page } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

// ========= for productions
// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf/pdf.worker.min.mjs`;

const Resume = () => {
  return (
    <>
      <div id="window-header">
        <WindowControl target={"resume"} />
        <h2>Resume.pdf</h2>
        <a
          href="files/resume.pdf"
          download
          className="cursor-pointer flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          title="download resume"
        >
          <Download className="icon" />
          <span>Download</span>
        </a>
      </div>
      <div className="w-full flex flex-col items-center py-6 px-4 gap-6">
        <Document file="files/resume.pdf">
          <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
            <div className="w-full rounded-lg overflow-hidden bg-white shadow-sm">
              <Page
                pageNumber={1}
                renderTextLayer
                renderAnnotationLayer
                className="w-full h-auto"
              />
            </div>
            <div className="w-full rounded-lg overflow-hidden bg-white shadow-sm">
              <Page
                pageNumber={2}
                renderTextLayer
                renderAnnotationLayer
                className="w-full h-auto"
              />
            </div>
          </div>
        </Document>

        <div className="flex items-center justify-center gap-3 mt-4 p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm">
          <span className="text-sm text-gray-600 font-medium">
            Download Resume
          </span>
          <a
            href="files/resume.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>PDF</span>
          </a>
        </div>
      </div>
    </>
  );
};

const ResumeWindow = windowWrapper(Resume, "resume");
export default ResumeWindow;
