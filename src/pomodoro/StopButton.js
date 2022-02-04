import React from "react";

function StopButton({setIsTimerRunning, setSession, session, disableStop}) {

    const handleStopButton = (event) => {
        if (session !== null) {
          setIsTimerRunning(false);
          setSession(null);
        } 
      }

    return (
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
    )
}

export default StopButton;
