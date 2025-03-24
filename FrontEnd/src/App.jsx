import { useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import axios from 'axios';
import Markdown from 'react-markdown';
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";


function App() {
  const [code, setCode] = useState(`/*Enter Your Core Here...*/
function sum() {
  return 1 + 1;
}`);

    const [review, setReview] = useState(``)
    
    async function reviewCode(){
      const response = await axios.post('http://localhost:3000/ai/get-review', {code})
      setReview(response.data)
    }
    
    return (
      <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(newCode) => setCode(newCode)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 16,
                border: "2px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
                color: "#fff",
              }}
            />
          </div>
          <div className="review" onClick={reviewCode}>Review</div>
        </div>
        <div className="right">{
          <Markdown rehypePlugins={[ rehypeHighlight ]}>{review}</Markdown>
        }</div>
      </main>
    </>
  );
}

export default App;
