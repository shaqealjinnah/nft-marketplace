import React, { useEffect, useState } from "react";

function CountdownTimer({ expiryDate }) {
  const [timeValues, setTimeValues] = useState({
    hours: 0,
    mins: 0,
    secs: 0,
  });

  const startTime = Date.now();
  let timeLeft = expiryDate - Date.now();
  let millisElapsed;
  let secondsLeft;
  let minsLeft;
  let hoursLeft;
  let countdown;

  function updateTimer() {
    countdown = expiryDate;

    millisElapsed = Date.now() - startTime;
    timeLeft = countdown - millisElapsed;

    hoursLeft = Math.floor(timeLeft / 1000 / 60 / 60) % 24;
    minsLeft = Math.floor(timeLeft / 1000 / 60) % 60;
    secondsLeft = Math.floor(timeLeft / 1000) % 60;

    setTimeValues({
      hours: hoursLeft,
      mins: minsLeft,
      secs: secondsLeft,
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updateTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="de_countdown">
      {timeValues.hours}h {timeValues.mins}m {timeValues.secs}s
    </div>
  );
}

export default CountdownTimer;
