import { useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import axios from 'axios';
import Markdown from 'react-markdown';
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function App() {
  const [code, setCode] = useState(`/*Enter Your Code Here...*/
function sum() {
  return 1 + 1;
}`);
  const [review, setReview] = useState(``);
  const [isReviewing, setIsReviewing] = useState(false); // State for "Reviewing..." message

  async function reviewCode() {
    setIsReviewing(true); // Show "Reviewing..." message
    setReview(""); // Clear previous review

    try {
      const response = await axios.post('https://code-reviewer-3ays.onrender.com/ai/get-review', { code });
      setReview(response.data);
    } catch (error) {
      setReview("❌ Error fetching review. Please try again.");
    } finally {
      setIsReviewing(false);
    }
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
                overflow: "auto"
              }}
            />
          </div>
          <div className="review" onClick={reviewCode}>
            {isReviewing ? "Reviewing..." : "Review"}
          </div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
