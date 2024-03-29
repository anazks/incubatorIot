import React, { useEffect, useState } from 'react';
import './display.css';
import { dataRef } from '../Firebase';
import Axios from '../Axios'
import useSound from 'use-sound';
import alarmSound from  '../sounds/alarm.mp3'
import normal from '../sounds/normal.mp3'
function Display() {
  const [temp, setTemp] = useState(null);
  const [temp3,setTemp3] = useState(null)
  const [temp4,setTemp4] = useState(null)
  const [temp5,setTemp5] = useState(null)

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
        console.log(getData,"from firebase");
        setTemp(getData[2]);
        let  f = (getData[2] * (9 / 5)) + 32;
        setTemp(getData[1]);
        setTemp3(getData[0].Temp3)
        setTemp4(getData[0].Temp4)
        setTemp5(getData[0].Temp5)

        let currentDistance = getData[0];
        if (previousDistance !== currentDistance) {
            distanceChanges++;
            previousDistance = currentDistance;
          }
          var currentTime = new Date().getTime();
      var elapsedTime = currentTime - lastUpdateTime;

      // Check if one minute has passed
        // var rateOfChange = (distanceChanges / (elapsedTime / 60000)).toFixed(2);
        // var rateOfChange = temp3 + 40;
        function breath() {
            rateOfChange = temp + 40
        }
        setInterval(breath, 1000);

     
           
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
      
      <div className="rate">
        <div>
            <span>RESPIRATORY RATE</span>
            <h1>71</h1>
        </div>
      </div>
      <div className="temp">
        <div>
            <span>Incubator TEMPERATURE IN C</span>
            <h1>{temp} C</h1>
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
      <div className="temp temprature">
        <div className="items">
          Temprature A
          <h2>30 <sup>o</sup>C</h2>

        </div>
        <div className="items">
        Temprature B
        <h2>{temp3} <sup>o</sup>C</h2>

        </div>
        <div className="items">
        Temprature C
        <h2>{temp4} <sup>o</sup>C</h2>

        </div>
        <div className="items">
        Temprature D
        <h2>{temp5} <sup>o</sup>C</h2>

        </div>
 
      </div>
      
    
            
    </div>


  );
}

export default Display;
