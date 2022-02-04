import React from "react";
import { secondsToDuration } from "../utils/duration";

function FocusDurationRender({focusDuration, setFocusDuration, session}) {

    const decreaseFocusDuration = (event) => {
        //for decreasing focus time
        if (session === null) {
          if (focusDuration > 300) {
            setFocusDuration((focusDuration - 300))
          }  else {
            alert("Focus time must be at least 5 minutes")
          }
        }
      }
    
      const increaseFocusDuration = (event) => {
        //for increasing focus time
        if (session === null) {
          if (focusDuration < 3600) {
            setFocusDuration((focusDuration + 300))
          }  else {
            alert("Focus time cannot exceed 1 hour")
          }
        }
      }
        
    return(
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              Focus Duration: {secondsToDuration(focusDuration)}
            </span>
            <div className="input-group-append">
              {/* Decrease Focus */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={decreaseFocusDuration}
              >
                <span className="oi oi-minus" />
              </button>
              {/* Increase Focus */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={increaseFocusDuration}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
    )
}

export default FocusDurationRender;