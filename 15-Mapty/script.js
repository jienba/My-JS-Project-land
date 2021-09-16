'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10);

    constructor(coords, distance, duration) {
        // this.date = new Date();
        // this.id =
        this.coords = coords // [lat, lng];
        this.distance = distance; // in km
        this.duration = duration; // in min
    }
    
}

class Running extends Workout{
    type = 'running';
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
    }

    calcPace(){
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout{
    type = 'cycling';
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
    }

    calcSpeed() {
        // km/hour
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

// const running1 = new Running([12,34], 15, 120, 15);
// const cycling1 = new Cycling([12,34], 30, 100, 34);
//
// console.log(running1, cycling1);


//////////////////////////////////////////////
// Application architecture

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
    #map;
    #mapEvent;
    #workOuts = [];

    constructor() {
        this._getPosition();
        form.addEventListener('submit', this._newWorkout.bind(this));

// Toggling workout field
        inputType.addEventListener('change', this._toggleElevationField);

    }

    _getPosition() {
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this),
                () => {
                    alert('Cannot get the current position');
                }
            );

    }

    _loadMap(position) {
        const {latitude} = position.coords;
        const {longitude} = position.coords;
        const coords = [latitude, longitude];
        this.#map = L.map('map').setView(coords, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);


        this.#map.on('click', this._showForm.bind(this));

    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        // Show form
        form.classList.remove('hidden');
        inputDistance.focus();
    };

    _toggleElevationField() {
            inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
            inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    };

    _newWorkout(e) {
        const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));
        const allPositive = (...inputs) => inputs.every(inp => inp > 0);
        e.preventDefault();
        // Get data from form
        const type = inputType.value;
        const duration = +inputDuration.value;
        const distance = +inputDistance.value;
        const {lat, lng} = this.#mapEvent.latlng;
        let workOut;


        // If activity is running, create running object
        if (type === 'running') {
            const cadence = +inputCadence.value;
            // check if data is valid
            if (!validInputs(duration, distance, cadence) || !allPositive(duration, distance, cadence))
                return alert('Input have to be positive numbers!')
            workOut = new Running([lat, lng], distance, duration, cadence);
        }

        // If activity is cycling, create cycling object
        if (type === 'cycling'){
            const elevation = +inputElevation.value;
            if (!validInputs(duration, distance, elevation)  || !allPositive(duration, distance))
                return alert('Input have to be positive numbers!')
            workOut = new Cycling([lat, lng], distance, duration, elevation);
        }



        // Add new object to workout array
        this.#workOuts.push(workOut);
        console.log(this.#workOuts);

        // Render workout on map as marker


        // Render workout on list
        this.renderWorkoutMarker(workOut)
        // Hide form and  Clear input field
        inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = '';


    }

    renderWorkoutMarker (workout){
        L.marker(workout.coords)
            .addTo(this.#map)
            .bindPopup(
                L.popup({
                    maxWidth: 250,
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: `${workout.type}-popup`
                })
            )
            .setPopupContent('workout')
            .openPopup();

    }
}

/////////////////////////////////
// Watching time 24:32
const app = new App();
