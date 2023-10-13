import React, { useState, useEffect } from 'react';
import './App.css'
const pageStyle = {
  textAlign: 'center',
  fontFamily: 'Arial, sans-serif',
  backgroundImage:"url(https://thehill.com/wp-content/uploads/sites/2/2022/08/CA_space_08032022istock.jpg)",
  // background: 'linear-gradient(45deg, #000033, #000000)',
  backgroundSize: '100% 100%',
  
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};





const timerStyle = {
  marginTop:"50px",
  marginLeft:"20px",
  fontSize: '72px',
  width: '100px',
  fontWeight: 'bold',
  color: 'white',
  background: 'transparent',
  border:"0"
};


const buttonStyle = {
  background: 'linear-gradient(135deg, #007bff, #6610f2)',
  color: 'white',
  padding: '15px 30px',
  borderRadius: '6px',
  border: 'none',
  fontSize: '20px',
  margin: '0 10px',
  cursor: 'pointer',
  
  transition: " 0.3s ease",
};

const sophisticatedButtonStyle = {
  ...buttonStyle,
  background: 'linear-gradient(135deg, #007bff, #6610f2)',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  ':hover': {
    background: 'linear-gradient(135deg, grey, #520fc3)',
  },
};



const resetButtonStyle = {
  ...buttonStyle,
  
  background: 'linear-gradient(135deg, red, #3d67cc)', 
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  ':hover': {
    background: 'linear-gradient(135deg, white, #3660a4)', 
    
  },
};
const separatorStyle = {
  fontSize: '45px',
  color: 'white',
  margin: '0 10px', 
};

const labelStyle = {
  fontSize: '24px',
  color: 'white',
};


const timeOverStyle = {
  fontSize: '24px',
  color: 'white',
  marginTop: '10px',
};

function SimpleTimer() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const[ran,setRan]=useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        if (hour === 0 && minute === 0 && second === 0) {
          clearInterval(intervalId);
          setIsRunning(false);
        } else {
          if (second > 0) {
            setSecond(second - 1);
          } else {
            if (minute > 0) {
              setMinute(minute - 1);
              setSecond(59);
            } else {
              if (hour > 0) {
                setHour(hour - 1);
                setMinute(59);
                setSecond(59);
              }
            }
          }
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [hour, minute, second, isRunning]);

  const startTimer = () => {
    if (hour > 0 || minute > 0 || second > 0) {
      setIsRunning(true);
      setRan(true);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setHour(0);
    setMinute(0);
    setSecond(0);
    setRan(false);
  };

  useEffect(() => {
    document.title = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
  }, [hour, minute, second]);

  const timeIsOver = hour === 0 && minute === 0 && second === 0;
  return (<>
  {/* <h1  style={{ fontSize: '36px', color: 'white', marginBottom: '200px' }}>Timer App:</h1> */}
    <div style={pageStyle}>
    <h1  style={{ fontSize: '50px', color: 'white',marginTop:"20px"}}>Timer:</h1> 
      <div style={{ display: 'flex', alignItems: 'center' ,marginTop:"30px"}}>
        <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
          <input
            type="number"
            value={hour}
            onChange={(e) => setHour(parseInt(e.target.value) || 0)}
            style={timerStyle}
          />
          <span style={labelStyle}>Hours</span>

        </div>
        <div style={{ fontSize: '45px', color: 'white' }}>:</div>
        <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
          <input
            type="number"
            value={minute}
            onChange={(e) => setMinute(parseInt(e.target.value) || 0)}
            style={timerStyle}
          />
          <span style={labelStyle}>Minutes</span>

        </div>
        <div style={{ fontSize: '45px', color: 'white' }}>:</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="number"
            value={second}
            onChange={(e) => setSecond(parseInt(e.target.value) || 0)}
            style={timerStyle}
          />
          <span style={labelStyle}>Seconds</span>

        </div>
      </div>

      {timeIsOver&&ran ? (
          <p style={timeOverStyle}>Time is over!</p>
          
        ) : (
          <div >
          </div>
        )}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
      <button style={sophisticatedButtonStyle} onClick={startTimer}>Start</button>
<button style={resetButtonStyle} onClick={resetTimer}>Reset</button>
      </div>
    </div>
    </>
  );
}

export default SimpleTimer;
