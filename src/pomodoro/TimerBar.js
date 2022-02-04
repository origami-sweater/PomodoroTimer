
import React from "react";
import ProgressBarStyle from "./ProgressBarStyle"
import { secondsToDuration } from "../utils/duration";

function TimerBar({session, breakDuration, focusDuration, isTimerRunning}) {
    //Toggles Timer Information & Progress Bar  
    if (session !== null) {
      return (
        <div>
          <div className="row mb-2">
              <div className="col">
                {/* Session & Total Session Time*/}
                <h2 data-testid="session-title">
                  {session?.label} for 
                  <span> {session?.label === "Focusing" ? secondsToDuration(focusDuration) : secondsToDuration(breakDuration)} </span>
                  minutes
                </h2>
                {/* Countdown Timer */}
                <p className="lead" data-testid="session-sub-title">
                  {secondsToDuration(session?.timeRemaining)} remaining
                </p>
                {isTimerRunning ? null : <p>Paused</p>}
              </div>
            </div>
            <ProgressBarStyle breakDuration={breakDuration} focusDuration={focusDuration} session={session}/>
          </div>
      )} else {
        return null;
      }
  }

  export default TimerBar;