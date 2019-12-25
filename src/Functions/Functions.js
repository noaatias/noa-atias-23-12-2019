export const icons=(WeatherIcon)=>{
    if(WeatherIcon<10){
        return(`https://developer.accuweather.com/sites/default/files/0${WeatherIcon}-s.png`)
    }
    else{
        return(`https://developer.accuweather.com/sites/default/files/${WeatherIcon}-s.png`)
    }
}
export  const EpochDateToName = (EpochDate)=>{
    var date = new Date(EpochDate * 1000).toLocaleDateString("en-us", {
        weekday: "long"
      });

      return date;
}

export const convertToFahrenheit = celsius => {
    return (celsius * 1.8 + 32).toFixed(1);
  };