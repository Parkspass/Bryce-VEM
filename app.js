/*jshint esversion: 6 */
console.log('connected');

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js')
        .then((reg) => console.log("Service Worker Registered", reg))
        .catch((err) => console.log("Service Worker Not Registered", err));
}

var app = new Vue({
    el: '#app',
    data: {
        page: 'main',
        trails: [
            "Agua Canyon Connecting Trail",
            "Bristlecone Loop",
            "Bryce Connector",
            "Bryce Point",
            "Bryce Point A - Trailhead",
            "Bryce Point B - Overlook",
            "Fairyland Loop",
            "Inspiration Point A (lower overlook)",
            "Inspiration Point B (upper overlook)",
            "Mossy Cave",
            "Navajo Loop",
            "Navajo Trail Junction",
            "Paria View",
            "Peekaboo Loop Trail",
            "Piracy Point Trail",
            "Queens Garden",
            "Rainbow Point A (Pavilion)",
            "Rainbow Point B (N Viewpoint)",
            "Riggs Spring Loop Trail",
            "Rim Trail",
            "Rim Trail Bryce/Inspiration",
            "Rim Trail Sunrise/Sunset",
            "Sheep Creek Connecting Trail",
            "Sunrise Point",
            "Sunset Point A (Sunset Overlook)",
            "Sunset Point B (North Overlook)",
            "Swamp Canyon Connecting Trail",
            "Tower Bridge Trail",
            "Tropic Trail",
            "Under-the-Rim Trail",
            "Under-the-Rim from Bristlecone", 
            "Wall Street",
            "Whiteman Canyon Connector",
            "Whiteman Connecting Trail",
            "Yovimpa Point",
        ],
        weatherConditions: ['Sunny', 'Mostly Sunny', 'Cloudy', 'Thunder Storms', 'Rain Showers', 'Rain', 'Sleet', 'Snow', 'Haze', 'Smokey'],
        visitations: ['Not busy', 'Not too busy', 'Little busy', 'Busy as it gets'],
        statuses: ['Clear', 'Minor Issue', 'Significant Issue', 'Closed or Major Issue'],
        conditions: ['Dry/Normal Summer Conditions', 'Mostly Dry (some water)', 'Wet and Slippery', 'Snow', 'Some Snow', 'Snow and Ice'],

        currentName: 'Staff/Vip Name(s)',
        currentDate: '',
        currentTrail: 'Trail or Segment Name',
        currentWeather: 'Weather',
        currentNotes: 'Notes',
        currentVisitation: 'Visitation',
        currentStatus: 'Trail Status',
        currentCondition: 'Trail Conditions',

        name_selected: false,
        date_selected: false,
        trail_selected: false,
        foot_selected: true,
        run_selected: false,
        bike_selected: false,
        e_selected: false,
        horse_selected: false,
        dog_selected: false,
        weather_selected: false,
        notes_selected: false,
        visitation_selected: false,
        status_selected: false,
        condition_selected: false,

        footUp: 0,
        footDown: 0,
        runUp: 0,
        runDown: 0,
        bikeUp: 0,
        bikeDown: 0,
        eUp: 0,
        eDown: 0,
        horseUp: 0,
        horseDown: 0,
        dogUp: 0,
        dogDown: 0,

        footRotation: 180,
        runRotation: 0,
        bikeRotation: 0,
        eRotation: 0,
        horseRotation: 0,
        dogRotation: 0,

        startTime: '',
        endTime: '',
        latitude: '',
        longitude: '',
        nameError: false,
        dateError: false,
    },
    created: function(){
        this.loadDate();
    },
    //used to find location:
    mounted(){
        
        function error() {
            status.textContent = 'Unable to retrieve your location';
        }

        if (!navigator.geolocation) {
            status.textContent = 'Geolocation is not supported by your browser';
        }
        else {
            status.textContent = 'Locating…';
            navigator.geolocation.getCurrentPosition(this.handleGetGeoLocation, error);
        }
    },
    methods: {
        // LOCATION
        handleGetGeoLocation(pos){
            var crd = pos.coords;

            const status = document.querySelector('#status');
            const latitude  = crd.latitude;
            const longitude = crd.longitude;

            console.log('Your current position is:');
            console.log(`Latitude : ${latitude}`);
            console.log(`Longitude: ${longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);

            this.latitude = latitude;
            this.longitude = longitude;
        },

        // INPUTS
        loadDate: function(){
            var date = new Date();
            var days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

            var fulldate = days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();
            this.currentDate = fulldate;
            this.startTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        },
        nameClicked: function(){
            this.name_selected = true;
            if (this.currentName == "Staff/Vip Name(s)"){
                this.currentName = "";
            }
        },
        outsideName: function(){
            this.name_selected = false;
            this.nameError = false;
            if(this.currentName == "" || this.currentName == "Staff/Vip Name(s)"){
                this.currentName = "Staff/Vip Name(s)";
                this.nameError = true;
            }
        },
        trailClicked: function(){
            this.page = "trailSelect";
        },
        weatherClicked: function(){
            this.page = "weatherSelect";
        },

        // BUTTONS
        footClicked: function(){
            if (this.foot_selected == true){
                this.foot_selected = false;
            }else{
                this.foot_selected = true;
            }
        },
        doneClicked: function(){
            this.notes_selected = false;
            if(this.currentNotes == ""){
                this.currentNotes = "Notes";
            }
        },
        sendClicked: function(){
            var endDate = new Date();
            this.endTime = endDate.getHours() + ":" + endDate.getMinutes() + ":" + endDate.getSeconds();
            this.checkNulls();
            if (this.currentName && this.currentName != "Staff/Vip Name(s)" && this.currentDate) {
                //The email call should go here:
                //->
                var park = "Bryce%20Data%20Submission";
                window.location.href="mailto:" + "?subject=" + park + "&body=" + 
                    this.currentName + ";" +
                    this.currentDate + ";" +
                    this.startTime + ";" +
                    this.endTime + ";" +
                    this.currentTrailSending + ";" +
                    this.latitude + ";" +
                    this.longitude + ";" +
                    this.footUp + ";" + 
                    this.footDown + ";" +
                    this.currentWeatherSending + ";" + 
                    this.currentVisitationSending + ";" +
                    this.currentStatusSending + ";" + 
                    this.currentConditionSending + ";" +
                    this.currentNotesSending + ";"
                ;
            }else {
                if (!this.currentName || this.currentName == "Staff/Vip Name(s)") {
                    this.nameError = true;
                }
                if (!this.currentDate) {
                    this.dateError = true;
                }
            }
        },
        checkNulls: function(){
            if (this.currentTrail == "Trail or Segment Name"){
                this.currentTrailSending = null;
            }else{
                this.currentTrailSending = this.currentTrail;
            }

            if(this.currentWeather == "Weather"){
                this.currentWeatherSending = null;
            }else{
                this.currentWeatherSending = this.currentWeather;
            }

            if(this.currentNotes == "Notes"){
                this.currentNotesSending = null;
            }else{
                this.currentNotesSending = this.currentNotes;
            }

            if(this.currentVisitation == "Visitation"){
                this.currentVisitationSending = null;
            }else{
                this.currentVisitationSending = this.currentVisitation;
            }

            if(this.currentStatus == "Trail Status"){
                this.currentStatusSending = null;
            }else{
                this.currentStatusSending = this.currentStatus;
            }

            if(this.currentCondition == "Trail Conditions"){
                this.currentConditionSending = null;
            }else{
                this.currentConditionSending = this.currentCondition;
            }
        },
    },
});

