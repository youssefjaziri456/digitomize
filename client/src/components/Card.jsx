import { useState, useEffect, memo } from 'react';
import Button from './Button';
import './css/Card.css'
import geeksforgeeks from '../assets/geeksforgeeks.svg'
import leetcode from '../assets/leetcode.svg'
import codechef from '../assets/codechef.svg'
import codeforces from '../assets/codeforces.svg'

const hostToSVGMap = {
  leetcode: leetcode,
  codeforces: codeforces,
  geeksforgeeks: geeksforgeeks,
  codechef:codechef,
  // Add other hosts and their corresponding SVG variables here
};


function Card({ contest }) {
  const { name, startTimeUnix, url, duration, host } = contest;
  const startDate = new Date(startTimeUnix*1000)
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    timeZone: 'Asia/Kolkata' 
};
const startTimeIST = startDate.toLocaleString('en-US', options)
const [remaningTime, setRemainingTime] = useState("0")
useEffect(() => {
  const intervalId = setInterval(() => {
    setRemainingTime(updateTimer(startTimeUnix));
  }, 1000);

  return () => {
    clearInterval(intervalId);
  };
}, [startTimeUnix]);
  return (
<a href={url} target="_blank" rel="noopener noreferrer" className="card" style={{ textDecoration: 'none' }}>
    {/* <div className="card"> */}
      <div className='top'>
            <p id='startTime'>{startTimeIST}</p>
            <img src={hostToSVGMap[host]} alt={host} style={{maxHeight:'50px', maxWidth:'50px'}}/>
        </div>
      <h2>{name}</h2>
      <div className='lower_button'>
        <div className='inner_lower'>
      <p>Duration : {duration}min</p>
          <div>{remaningTime}</div>
          </div>
        <Button url={url} />
        </div>
    {/* </div> */}
    </a>
  );
}

export default memo(Card);


function updateTimer(startTime) {
  const currentTime = Math.floor(Date.now() / 1000);
  // const currentTime = getCurrentTimeIST();
  const timeDiff = startTime - currentTime;

  if (timeDiff <= 0) {
   return <p>Time Left: 0h 0m 0s</p>
  } else {
        const days = Math.floor(timeDiff / 86400);
        const hours = Math.floor((timeDiff % 86400) / 3600);
        const minutes = Math.floor((timeDiff % 3600) / 60);
        const seconds = timeDiff % 60;
        if (days > 0) {
            return <p>Time Left : {days}d {hours}h {minutes}m {seconds}s</p>
        }
        return <p>Time Left : {hours}h {minutes}m {seconds}s</p>
  }
}

    // const startTime = timerElement.dataset.startTime;
    // const timerElementId = timerElement.id;
   
