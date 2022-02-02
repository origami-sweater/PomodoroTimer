import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import TimerBar from "./TimerBar";

// These functions are defined outside of the component to ensure they do not have access to state
// and are, therefore, more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher-order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */

//Helper function to convert seconds to hhmmss - adjusted to remove hours
function convertMS(value) {
  const sec = parseInt(value, 10); // convert value to number if it's string
  let minutes = Math.floor((sec/60)); // get minutes
  let seconds = sec - (minutes * 60); //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return minutes+':'+seconds; // Return is MM : SS
}

function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration,
    };
  };
}



function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);

  //States for the focus & break durations
  const [focusDuration, setFocusDuration] = useState(1500);
  const [breakDuration, setBreakDuration] = useState(300);
  //State that controls disabling the stop button
  const [disableStop, setDisableStop] = useState("true");

  //Button Events

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
  
  const handleStopButton = (event) => {
    if (session !== null) {
      setIsTimerRunning(false);
      setSession(null);
    } 
  }
  

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You won't need to make changes to the callback function
   */
  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    if(disableStop === "true") setDisableStop("");
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              Focus Duration: {convertMS(focusDuration)}
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
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                Break Duration: {convertMS(breakDuration)}
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
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* Stop Button */}
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="stop"
              title="Stop the session"
              onClick={handleStopButton}
              disabled={disableStop}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <TimerBar session={session} breakDuration={breakDuration} focusDuration={focusDuration} isTimerRunning={isTimerRunning}/>
    </div>
  );
}

export default Pomodoro;
