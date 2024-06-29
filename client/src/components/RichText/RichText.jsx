import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RichText.css";

function RichText({ content, setContent, placeholder }) {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["blockquote", "code-block"],
      ["link", "image", "video", "formula"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "align",
    "direction",
    "background",
    "color",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "check",
    "script",
    "indent",
    "link",
    "image",
    "video",
    "formula",
    "clean",
  ];

  return (
    <>
      <ReactQuill
        theme="snow"
        className="quill-height"
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        value={content}
        onChange={setContent}
      />
      {/* <div
        className="output mt-5 ql-editor"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div> */}
    </>
  );
}

export default RichText;
