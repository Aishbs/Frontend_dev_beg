window.addEventListener('load', fetchReport)
  
function fetchReport() {

  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let timezone = document.querySelector('.location-timezone');
  let iconImg = document.querySelector('.icon-image')
  let temperatureSection = document.querySelector('.temperature')
  let temperatureSpan = document.querySelector('.temperature span')

  if("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      
      const proxy = 'https://cors-anywhere.herokuapp.com/corsdemo';
      const api = `http://api.weatherapi.com/v1/current.json?key=27c1b09c4f5940a1a5c40644232405&q=${lat},${long}&aqi=no`;
      console.log(api);

      fetch(api)
      .then(response => {
        return response.json();
      })
      .then(async data => {
        console.log(data)
        const cur = data.current;
        const cond = cur.condition
        const loc = data.location

        temperatureDegree.textContent = cur.temp_c;
        temperatureDescription.textContent = cond.text;
        timezone.textContent = loc.name

        const image = document.createElement("img");
        image.setAttribute("src", cond.icon);

        image.addEventListener("load", () => {
            // Wait until the image has finished loading before trying to add elements to the page
            iconImg.replaceChildren(image);
            console.log(image)
        });

        temperatureSection.addEventListener('click', () => {
          if(temperatureSpan.textContent === 'C') {
            temperatureSpan.textContent = 'F';
            temperatureDegree.textContent = cur.temp_f;
          } else {
            temperatureSpan.textContent = 'C';
            temperatureDegree.textContent = cur.temp_c;
          }
        })
      })
    });

  } else {
    console.log("Geolocation is not supported by this browser.")
  }
}
