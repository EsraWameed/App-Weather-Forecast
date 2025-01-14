let key = "126b93916d5b8e5d67aa8207dcd2d65d"
// grab all the info we will be using


var displaySearchedhistory = document.querySelector('#displayHistory');
// an array to push searched cities
var searchedCity=[];
var button = document.querySelector('.button');
var inputValue = document.querySelector('.inputValue');
var cityName = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');

//new
var currentWind = document.querySelector(".mainWind");
var currentHumid = document.querySelector(".mainHumidity");

// global variable forday 1 forecast 
var tempDay1 = document.querySelector('.day1Temp');
var windDay1 = document.querySelector('.day1Wind');
var HumidDay1 = document.querySelector('.day1Humidity');
// global variable forday 2 forecast 
var tempDay2 = document.querySelector('.day2Temp');
var windDay2 = document.querySelector('.day2Wind');
var HumidDay2 = document.querySelector('.day2Humidity');
// global variable forday 3 forecast 
var tempDay3 = document.querySelector('.day3Temp');
var windDay3 = document.querySelector('.day3Wind');
var HumidDay3 = document.querySelector('.day3Humidity');
// global variable forday 4 forecast 
var tempDay4 = document.querySelector('.day4Temp');
var windDay4 = document.querySelector('.day4Wind');
var HumidDay4 = document.querySelector('.day4Humidity');
// global variable forday 5 forecast 
var tempDay5 = document.querySelector('.day5Temp');
var windDay5 = document.querySelector('.day5Wind');
var HumidDay5 = document.querySelector('.day5Humidity');
//input value is the tag and .value is type of text inputed

//for the current time
var currentTime = document.querySelector('.mainDate');
var day1Date = document.querySelector('.day1Date');
var day2Date = document.querySelector('.day2Date');
var day3Date = document.querySelector('.day3Date');
var day4Date = document.querySelector('.day4Date');
var day5Date = document.querySelector('.day5Date');

//icons
var maincityIcons = document.querySelector('.maincityIcon')
var daily1Icon= document.querySelector('.day1icon')
var daily2Icon= document.querySelector('.day2icon')
var daily3Icon= document.querySelector('.day3icon')
var daily4Icon= document.querySelector('.day4icon')
var daily5Icon= document.querySelector('.day5icon')

function fetchCurrentWeather(value){
  setHistory(value);
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${key}&units=metric`)
  // we want the response in json format. no colon cause full function

      .then(response => response.json())
      .then((data)=> {
          getForecast(data)
         

      var citynameValue = data['name'];
      var maincityIcon = data['weather'][0]['icon'];
      var tempValue = data['main']['temp'];
      var descValue = data['weather'][0]['description'];
      console.log(data.wind.speed)
      var mainWindspeed = data.wind.speed
      currentWind.innerHTML = mainWindspeed+" MPH"
      console.log(data.main.humidity)
      var currentumidity = data.main.humidity
      currentHumid.innerHTML = "Humidity: "+ currentumidity+ " %"
      
      
      maincityIcons.setAttribute("src", " https://openweathermap.org/img/w/"+maincityIcon+".png") 

      cityName.innerHTML = citynameValue;
      temp.innerHTML = tempValue+" °C";
      desc.innerHTML = descValue;
      
      var unixTime= data['dt'];
      

const dateTimeString = moment.unix(unixTime).format("DD-MM-YYYY");

     currentTime.innerHTML = dateTimeString;
      


      })
  
  //to catch the error 
      .catch (err => alert("Wrong City Name!"))
}


button.addEventListener('click', function(){
  fetchCurrentWeather(inputValue.value)
})

//--------------------------------------------------------------------------------------
// converting dt time

//--------------------------------------------------------------------------------


function getForecast(weatherData){
    
    //allow for template literals
    //consideration: isolate coordinates

    let lon = weatherData.coord.lon

    let lat = weatherData.coord.lat
    let URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`

    

    fetch(URL)
    .then(response => response.json())
    .then((data)=>{
       

        //credit to Michael Sinn, code for splitting into 5 days 136-156

        let dailyWeather = [];
          let currentDay = [];
          // Split the data into separate days
          data.list.forEach((e) => {
            if (currentDay.length === 0) {
              currentDay.push(e);
            } else {
              if (
                currentDay[currentDay.length - 1].dt_txt.split(" ")[0] !==
                e.dt_txt.split(" ")[0]
              ) {
                dailyWeather.push(currentDay);
                currentDay = [e];
              } else {
                currentDay.push(e);
              }
            }
          });
          if (currentDay.length !== 0) dailyWeather.push(currentDay);
          if (dailyWeather.length > 5) dailyWeather.shift();

        

      // to display the 5 day forecast. temp, wind, humidity
      //day 1
    

      var day1Temperature = dailyWeather[0][4].main.temp;
      var day1Windspeed = dailyWeather[0][4].wind.speed;
      var day1Humidity = dailyWeather[0][4].main.humidity;
          tempDay1.innerHTML= day1Temperature+" °C";
          windDay1.innerHTML=day1Windspeed+" MPH";
          HumidDay1.innerHTML="Humidity: "+day1Humidity+ " %";
          //-------------------
          var unixTimeDay1= dailyWeather[0][4]['dt'];
        
          var dateTimeString = moment.unix(unixTimeDay1).format("DD-MM-YYYY");

          day1Date.innerHTML = dateTimeString

    ourDay1icon= dailyWeather[0][4].weather[0].icon;
    
    daily1Icon.setAttribute("src", " https://openweathermap.org/img/w/"+ourDay1icon+".png") 

  //------------------------------------
          
// day 2 

var day2Temperature = dailyWeather[1][4].main.temp;
      var day2Windspeed = dailyWeather[1][4].wind.speed;
      var day2Humidity = dailyWeather[1][4].main.humidity;
          tempDay2.innerHTML= day2Temperature+" °C";
          windDay2.innerHTML=day2Windspeed+" MPH";
          HumidDay2.innerHTML="Humidity: "+day2Humidity+" %";

          var unixTimeDay2= dailyWeather[1][4]['dt'];
        
          var dateTimeString = moment.unix(unixTimeDay2).format("DD-MM-YYYY");
day2Date.innerHTML = dateTimeString


ourDay2icon= dailyWeather[1][4].weather[0].icon
daily2Icon.setAttribute("src", " https://openweathermap.org/img/w/"+ourDay1icon+".png") 


// day 3
var day3Temperature = dailyWeather[2][4].main.temp;
      var day3Windspeed = dailyWeather[2][4].wind.speed;
      var day3Humidity = dailyWeather[2][4].main.humidity;
          tempDay3.innerHTML= day3Temperature+" °C";
          windDay3.innerHTML=day3Windspeed+" MPH";
          HumidDay3.innerHTML="Humidity: "+day3Humidity+" %";

          var unixTimeDay3= dailyWeather[2][4]['dt'];
          var dateTimeString = moment.unix(unixTimeDay3).format("DD-MM-YYYY");
day3Date.innerHTML = dateTimeString


ourDay3icon = dailyWeather[2][4].weather[0].icon
daily3Icon.setAttribute("src", " https://openweathermap.org/img/w/"+ourDay3icon+".png") 



//day 4
var day4Temperature = dailyWeather[3][4].main.temp;
      var day4Windspeed = dailyWeather[3][4].wind.speed;
      var day4Humidity = dailyWeather[3][4].main.humidity;
          tempDay4.innerHTML= day4Temperature+" °C";
          windDay4.innerHTML=day4Windspeed+" MPH";
          HumidDay4.innerHTML="Humidity: "+day4Humidity+" %";

          var unixTimeDay4= dailyWeather[3][4]['dt'];
          var dateTimeString = moment.unix(unixTimeDay4).format("DD-MM-YYYY");
day4Date.innerHTML = dateTimeString


ourDay4icon = dailyWeather[3][4].weather[0].icon
daily4Icon.setAttribute("src", " https://openweathermap.org/img/w/"+ourDay4icon+".png") 
//day 5

var day5Temperature = dailyWeather[4][0].main.temp;
      var day5Windspeed = dailyWeather[4][0].wind.speed;
      var day5Humidity = dailyWeather[4][0].main.humidity;
          tempDay5.innerHTML= day5Temperature+" °C";
          windDay5.innerHTML=day5Windspeed+" MPH";
          HumidDay5.innerHTML="Humidity: "+day5Humidity+" %";

          var unixTimeDay5= dailyWeather[4][0]['dt'];
          var dateTimeString = moment.unix(unixTimeDay5).format("DD-MM-YYYY");
day5Date.innerHTML = dateTimeString

// console.log(dailyWeather[4][4].weather[0].icon)

ourDay5icon = dailyWeather[3][4].weather[0].icon
daily5Icon.setAttribute("src", " https://openweathermap.org/img/w/"+ourDay5icon+".png");


//pull out date time strong and access jus

          
    })
}


//functions that render info to page. loop for creating elements for 5 days

// local storage 

function setHistory(search){
  searchedCity.push(search);
  if( searchedCity.length>5){
    searchedCity.shift()
  }
  localStorage.setItem("searched-city",JSON.stringify(searchedCity));
  getHistory();

}
// don't need parameter becuase we are pulling existing info
function getHistory(){
  displaySearchedhistory.innerHTML= "";
  //most recent at the top

  //set data attribute, give it data attribute to buttons and give it attribute of city name itself. button.setAttribute[data-search, ]
  for(i=searchedCity.length-1; i>=0; i--){
    var button = document.createElement("button");
// button.setAttribute("data-search", searchedCity[i]);
    button.setAttribute("class","history-button");
    button.textContent = searchedCity[i];
    displaySearchedhistory.append(button);
    
  }
}
//add event listener to search container. use match event 
// try to make 

displaySearchedhistory.addEventListener("click", e=>{
  
  if (e.target.className==="history-button"){
    fetchCurrentWeather(e.target.textContent)
    console.log(e.target.textContent)
  }
  
})