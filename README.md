# Weather.
## A dynamic and interactive line graph made with D3 and the AccuWeather API

Weather. is an app that takes a user-entered zip United States zip code and draws an interactive 12-hour temperature forecast line graph using the D3 visualization library. It also provides information about the current temperature, the 12-hour high temperature, the 12-hour low temperature, and the 12-hour likelihood of rain.

### How to Use the App:
1. Enter a valid U.S. zip code into the input box on the homepage.
2. Hit return or click the "Submit" button.
3. Once your graph is drawn, move your mouse over the graph area to get the specific temperature for that time.
4. Scroll down the page to learn more weather details for the next 12 hours.

### Install Steps:

1. Clone this repository from https://github.com/BenParisot/sprinklr-takehome.git
2. Run `cd sprinklr-takehome` to move into the app folder.
2. Run `npm install` to install all app dependencies.
3. Run `npm start` to run app locally in development mode.
4. Open http://localhost:3000 to view the app.


    *Note: Only valid U.S. zip codes are allowed. Entering an invalid zip code will cause an error in fetching the weather data and the page will not be displayed.*
