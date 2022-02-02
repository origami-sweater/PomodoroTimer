import React from "react";


function ProgressBarStyle({focusDuration, breakDuration, session}){
  let amt;
  if (session.label === "Focusing") {
      amt= session.timeRemaining / focusDuration * 100;
    } else {
      amt = session.timeRemaining / breakDuration * 100;
    }
    return(
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={amt}
                style={{ width: `${100-amt}%` }}
              >
              </div>
            </div>
          </div>
        </div>
      )
}

export default ProgressBarStyle;