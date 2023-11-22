import React, { useEffect, useState } from 'react';
import './display.css';
import { dataRef } from '../Firebase';
import Axios from '../Axios'
import useSound from 'use-sound';
import alarmSound from  '../sounds/alarm.mp3'
import normal from '../sounds/normal.mp3'
function Display() {
  const [temp, setTemp] = useState(null);
  const [respiratory, setRespiratory] = useState(0);
  const [overHeat,setOverHeat] =useState(false)
 const [Hb,setHb] =useState(0)
 //const [handlePlay] = useSound(alarmSound,{volume:1.0,autoplay:true});
  //const [handlePlay2] = useSound(normal,{volume:1.0,autoplay:true});
  const getDatafromDB = () => {
    try {
       // handlePlay2();
        
        var previousDistance = 0;
        var lastUpdateTime = new Date().getTime();
        var distanceChanges = 0;
      dataRef.ref().child('test').on('value', (data) => {
        const getData = Object.values(data.val());
        console.log(getData);
        setTemp(getData[2]);
        let  f = (getData[2] * (9 / 5)) + 32;
        setTemp(parseFloat(f).toFixed(2))
        let currentDistance = getData[0];
        if (previousDistance !== currentDistance) {
            distanceChanges++;
            previousDistance = currentDistance;
          }
          var currentTime = new Date().getTime();
      var elapsedTime = currentTime - lastUpdateTime;

      if (elapsedTime >= 60000) { // Check if one minute has passed
        var rateOfChange = (distanceChanges / (elapsedTime / 60000)).toFixed(2);
        setRespiratory(rateOfChange * 6 );
        console.log(rateOfChange,"rate of change")
        // Reset variables for the next minute
        distanceChanges = 0;
        lastUpdateTime = currentTime;
      }
           
        //setRespiratory(rateOfChange);
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => { 
    const fetchDataInterval = setInterval(() => {
      getDatafromDB();
      console.log(1)
    //   handlePlay2()  
      Axios.get('/HB_API').then((response)=>{
        console.log(response.data)
        setHb(response.data[0])
    })
    }, 1000);
    
    // Clear the interval when the component unmounts
    return () => clearInterval(fetchDataInterval);
   
  }, []);

  return (
    <div className='main'>
      <div className="temp">
        <div>
            <span>TEMPERATURE IN C</span>
            <h1>{temp} F</h1>
        </div>
      </div>
      <div className="rate">
        <div>
            <span>RESPIRATORY RATE</span>
            <h1>{respiratory.toFixed(2)}</h1>
        </div>
      </div>
      <div className="rate hearRate">
            <div>
                <span>HEART BEAT</span> <br />
                    <a href="http://127.0.0.1:8000/Analyse" target='_blank' className='anlyze'>Analyse</a>
                <h1>{ Hb ? Hb.HB.toFixed(2) :0}</h1>
            </div>
      </div>
      {
        overHeat ?
        <div className="overHeat">
                    <div>
                        <h1>OVER HEAT!!!</h1>
                    </div>
            </div>: '' 
      }
            
    </div>
  );
}

export default Display;
