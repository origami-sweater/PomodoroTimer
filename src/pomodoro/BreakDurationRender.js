import React, { useState } from "react";
import { secondsToDuration } from "../utils/duration";

function BreakDurationRender({breakDuration, setBreakDuration, session}) {

  const decreaseBreakDuration = (event) => {
    //for decreasing break time
    if (session === null) {
      if (breakDuration > 60) {
        setBreakDuration((breakDuration - 60))
      }  else {
        alert("Break time must be at least 1 minute")
      }
    }
  }

  const increaseBreakDuration = (event) => {
    //for increasing break time
    if (session === null) {
      if (breakDuration < 900) {
        setBreakDuration((breakDuration + 60))
      }  else {
        alert("Break time cannot exceed 15 minutes")
      }
    }
  }

    return (
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                Break Duration: {secondsToDuration(breakDuration)}
              </span>
              <div className="input-group-append">
                {/* Decrease Break */}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={decreaseBreakDuration}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* Increase Break */}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={increaseBreakDuration}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
    )
}

export default BreakDurationRender;