import React, { useState } from "react";
import Blank from "./Blank";

function BlanksLine(props) {
  const [words, setWords] = useState(props.line.split(" "));

  return (
    <div className="row ml-0">
      {words !== undefined &&
        words.map((word, i) => {
          if (word.includes("[")) return <Blank key={i} index={word.substring(1,word.length-1)} updateBlank={props.updateBlank} sel={props.sel}/>;
          else
            return (
              <p key={i} style={{ float: "left" }} className="ml-2">
                {word}
              </p>
            );
        })}
      <div style={{ clear: "both" }}></div>
    </div>
  );
}

export default BlanksLine;
