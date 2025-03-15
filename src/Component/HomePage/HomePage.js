import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

let HomePage = () => {
    let [weatherDatas, setweatherDatas] = useState(null);
    let [place, setPlace] = useState('chennai'); 
    let [sunrise,setSunrise]=useState(null)
    let [sunset,setSunset]=useState(null)

    useEffect(() => {
        fetchWeatherdata(place);
        setPlace("")
    }, []); 

    let fetchWeatherdata = (cityname) => {
        let ApiKey = '3840b2ea122aed697e3f7ce95d39d7ef';
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${ApiKey}`)
            .then((x) => x.json())
            .then((y) => {
                setweatherDatas(y)
                setSunrise(time(y.sys.sunrise))
                setSunset(time(y.sys.sunset))
            })
    }
    let time=(a)=>{
        let date=new Date(a*1000)
        let risetime=date.toLocaleTimeString()
        return risetime
    }
    let handle = (e) => {
        if (e.target.name === "place") {
            setPlace(e.target.value);
        }
    }

    let submit = () => {
        fetchWeatherdata(place);
        setPlace("")
    }
    console.log(weatherDatas)
    return (
        <div style={{ backgroundColor: "rgba(20,30,42,10)", color: "white", width: "100vw", height: "100vh" }}>
            <div className="row d-flex justify-content-center" style={{ width: "100vw" }}>
                <div className="col-7 " style={{ backgroundColor: "rgba(200,200,150,200)",marginTop:"12%",borderRadius:"2%" }}>
                    <div className="d-flex justify-content-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" fill="red" class="bi bi-geo-alt-fill" viewBox="0 0 16 16" className="mt-4">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                    </svg>
                    <h5 className=" mt-3" style={{ color: "black" }}>{weatherDatas?.name}</h5>
                    </div>
                    <div className="d-flex justify-content-center col-12 ">
                        <div className="col-5 col-md-5 col-lg-3 col-xl-3 d-flex justify-content-center m-2" style={{border:"1px ",borderRadius:"2%",boxShadow:"0 4px 8px rgba(0,0,0,0.3)",backgroundColor: "rgb(187, 187, 241)"}}>
                        {weatherDatas && weatherDatas.main && (
                            <div className="m-3">
                                <h5 style={{color:"black"}}>Temp</h5>
                                <h3  style={{ color: "black" }}> {Math.round(weatherDatas.main.temp - 273.15)}℃</h3>
                            </div>
                        )}
                        </div>
                        <div className="col-5 col-md-5 col-lg-3 col-xl-3 d-flex justify-content-center m-2" style={{border:"1px ",borderRadius:"2%",boxShadow:"0 4px 8px rgba(0,0,0,0.3)",backgroundColor: "rgb(187, 187, 241)"}}>
                        {weatherDatas && weatherDatas.weather && weatherDatas.weather.map((a, b) => {
                            let iconUrl = `http://openweathermap.org/img/w/${a.icon}.png`;
                            return (
                                <div key={b} className="m-1">
                                    <img src={iconUrl} alt="Weather icon" />
                                    <h4 style={{ color: "black" }}>{a.main}</h4>
                                </div>
                            );
                        })}
                        </div>
                    </div>
                    <div className="m-1 d-flex justify-content-center">
                        {weatherDatas && weatherDatas.coord && (
                            <div>
                            <div style={{ color: "black" }}>
                                <p className="m-2">Lat: {weatherDatas.coord.lat}</p>
                                <p className="m-2">Lon: {weatherDatas.coord.lon}</p>
                            </div>
                            <div style={{ color: "black" }}>
                                <p className="m-2">windSpeed:{weatherDatas.wind.speed}kmph</p>
                                <p className="m-2">WindDeg:{weatherDatas.wind.deg}°</p>
                            </div>
                            </div>
                        )}
                    </div>
                    <div className="col-12 d-flex justify-content-between">
                    <div className="col-6" style={{border:"1px ",boxShadow:"0 1px 2px rgba(0,0,0,0.3)",backgroundColor:"rgba(203, 185, 120, 0.96)"}}>
                        <div className="d-flex justify-content-center m-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="yellow" class="bi bi-sunrise-fill" viewBox="0 0 16 16">
                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707m11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0M11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                        </svg>
                        </div>
                       
                        <p className="d-flex justify-content-center" style={{color:"black"}}>{sunrise}</p>
                    </div>
                    <div className="col-6 " style={{border:"1px ",boxShadow:"0 1px 2px rgba(0,0,0,0.3)",backgroundColor:"rgba(203, 185, 120, 0.96)"}}>
                        <div className="d-flex justify-content-center m-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="yellow" class="bi bi-sunset-fill" viewBox="0 0 16 16">
                        <path d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708zm-5.303-.51a.5.5 0 0 1 .707 0l1.414 1.413a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .706l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                        </svg>
                        </div>
                        <p className="d-flex justify-content-center" style={{color:"black"}}>{sunset}</p>
                    </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center col-12 mt-2 mb-1 ">
                            <input value={place} name="place" onChange={handle} className="col-7 col-md-5 col-lg-5 col-xl-4" style={{border:"1px solid",backgroundColor:"rgba(197, 189, 189, 0.89)",borderRadius:"3%"}}></input>
                            <button className="btn btn-success m-1 col-5 col-md-3 col-lg-2 col-xl-1" style={{height:"30px"}} onClick={submit}>Submit</button>   
                    </div> 
                </div>
            </div>
        </div>
    );
};

export default HomePage;
