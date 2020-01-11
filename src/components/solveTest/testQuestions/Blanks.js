import React, { useState, useEffect } from "react";

import BlanksLine from "./BlanksLine";
import ShowImage from './ShowImage';

function Blanks(props) {
  const [state, setState] = useState(props.question);
  const [isMobile, setIsMobile] = useState(false);
  const [sel, setSel] = useState("");

  const updateBlank = (index, value) => {
    console.log('updateBlank', index, value);
    let temp = state.answer;
    temp[index] = value;
    setState({...state, answer: temp});
  }

  useEffect(() => {
    props.updateTest(state, props.questionNum);
  }, [state])

  useEffect(() => {
    console.log("Image", state.picture);
  }, [state.picture])

  useEffect(() => {
    let temp = window.orientation > -1;
    setIsMobile(temp);
  }, [])

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
      {state.picture !== undefined &&
        <ShowImage image={state.picture} size={state.pictureSize}/>
      }

      {isMobile &&
        <p className="alert alert-success mb-4">On mobile tap blank and then place to insert!</p>
      }

      <div className="mb-3">
        {
          state.sentencesArr.map((line, lineIndex) => (
            <BlanksLine key={lineIndex} line={line} updateBlank={updateBlank} sel={sel}/>
          ))
        }
      </div>

      <div>
        {state.blanks !== undefined && state.blanks !== null &&
          state.blanks.map((blank, index) => (
            <p
              key={index}
              id={index}
              className="badge badge-primary mr-3"
              style={{ fontSize: "20px" }}
              draggable="true"
              onDragStart={e => dragStart(e, { blank })}
              onTouchEnd={e => setSel(blank)}
            >
              {blank}
            </p>
          ))}
      </div>
    </div>
  );
}

export default Blanks;
