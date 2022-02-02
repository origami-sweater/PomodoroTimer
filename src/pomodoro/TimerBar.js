
import React from "react";
import ProgressBarStyle from "./ProgressBarStyle"


function convertMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let minutes = Math.floor((sec/60)); // get minutes
    let seconds = sec - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds; // Return is MM : SS
  }

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
                  <span> {session?.label === "Focusing" ? convertMS(focusDuration) : convertMS(breakDuration)} </span>
                  minutes
                </h2>
                {/* Countdown Timer */}
                <p className="lead" data-testid="session-sub-title">
                  {convertMS(session?.timeRemaining)} remaining
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