import React, { useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Test = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);

  const check = () => {
    console.log("editorState", convertToHTML(editorState.getCurrentContent()));
    setConvertedContent(convertToHTML(editorState.getCurrentContent()));
  };

  const loadDataFormHtml = () => {
    const html = "<p>Hey this <strong>editor</strong> rocks 😀</p>";
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    setEditorState(EditorState.createWithContent(contentState));
  };
  return (
    <div>
      <h2 onClick={check}>Check</h2>
      <h2 onClick={loadDataFormHtml}>load in editor from string html</h2>
      <div dangerouslySetInnerHTML={{ __html: convertedContent }}></div>

      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "list",
            "textAlign",
            "history",
          ],
          // inline: { inDropdown: true },
          // list: { inDropdown: true },
          // textAlign: { inDropdown: true },
          // link: { inDropdown: true },
          // history: { inDropdown: true },
        }}
      />
      {/* <div>{editorState}</div> */}
    </div>
  );
};

export default Test;
