import React, { useState, useEffect } from "react";

import BlanksLine from "./BlanksLine";

function Blanks(props) {
  const [state, setState] = useState(props.question);
  const [sentences, setSentences] = useState([]);

  //useEffect(() => {}, [state]);

  useEffect(() => {
    //console.log('sen:', state.sentences);
    //let temp = state.sentences.split("\n");
    setSentences(state.sentences);
  }, []);

  const dragStart = (e, value) => {
    const target = e.target;

    console.log("value:", value.blank);

    e.dataTransfer.setData("val", value.blank);

    if (state.allowDuplicate === false) {
      setTimeout(() => {
        target.style.display = "none";
      }, 0);
    }
  };

  return (
    <div style={{ fontSize: "20px" }}>
      <div className="mb-3">
        {
          sentences.map((line, lineIndex) => (
            <BlanksLine key={lineIndex} line={line} />
          ))
        }
      </div>

      <div>
        {state.blanks !== undefined &&
          state.blanks.map((blank, index) => (
            <p
              key={index}
              id={index}
              className="badge badge-primary mr-3"
              style={{ fontSize: "20px" }}
              draggable="true"
              onDragStart={e => dragStart(e, { blank })}
            >
              {blank}
            </p>
          ))}
      </div>
    </div>
  );
}

export default Blanks;
