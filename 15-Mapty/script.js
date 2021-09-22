'use strict';


class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10);
    clicks = 0;

    constructor(coords, distance, duration) {
        // this.date = new Date();
        // this.id =
        this.coords = coords // [lat, lng];
        this.distance = distance; // in km
        this.duration = duration; // in min
    }

    _setDescription() {
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }

    click() {
        this.clicks ++;
    }

}

class Running extends Workout {
    type = 'running';

    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }

    calcPace() {
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    type = 'cycling';

    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
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
    #zoomLevel = 13;

    constructor() {
        // Get user position
        this._getPosition();

        // Get data from local storage
        this._getLocalStorage();
        // Attach event handlers
        form.addEventListener('submit', this._newWorkout.bind(this));
        // Toggling workout field
        inputType.addEventListener('change', this._toggleElevationField);
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this))

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
        this.#map = L.map('map').setView(coords, this.#zoomLevel);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        // Handling click on map
        this.#map.on('click', this._showForm.bind(this));

        // Rendering marker from data that localStorage provide
        this.#workOuts.forEach(
            workout => this._renderWorkoutMarker(workout)
        );

    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        // Show form
        form.classList.remove('hidden');
        inputDistance.focus();
    };

    _hideForm() {
        // Clear input field
        inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = '';
        // Hide form and
        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(()=> form.style = 'grid', 100)
    }

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
        if (type === 'cycling') {
            const elevation = +inputElevation.value;
            if (!validInputs(duration, distance, elevation) || !allPositive(duration, distance))
                return alert('Input have to be positive numbers!')
            workOut = new Cycling([lat, lng], distance, duration, elevation);
        }

        // Add new object to workout array
        this.#workOuts.push(workOut);

        // Render workout on map as marker
        this._renderWorkoutMarker(workOut);

        // Render workout on list
        this._renderWorkout(workOut);

        // Hide form and  Clear input field
        this._hideForm();

        // Set local storage to all workouts
        this._setLocalStorage(this.#workOuts);

    };

    _renderWorkoutMarker(workout) {
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
            .setPopupContent(`${workout.type === 'running' ? '🏃' : '🚴'} ${workout.description}`)
            .openPopup();

    };

    _renderWorkout(workout) {
        let html = `
            <li class="workout workout--${workout.type}" data-id="${workout.id}">
                <h2 class="workout__title">${workout.description}</h2>
                <div class="workout__details">
                    <span class="workout__icon">${workout.type === 'running' ? '🏃' : '🚴'}‍️</span>
                    <span class="workout__value">${workout.distance}</span>
                    <span class="workout__unit">km</span>
                </div>
                 <div class="workout__details">
                    <span class="workout__icon">⏱</span>
                    <span class="workout__value">${workout.duration}</span>
                    <span class="workout__unit">min</span>
                </div>
        `;

        if (workout.type === 'running')
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.pace.toFixed(1)}</span>
                    <span class="workout__unit">min/km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">🦶🏼</span>
                    <span class="workout__value">${workout.cadence}</span>
                    <span class="workout__unit">spm</span>
                </div>
            </li>
            `;

        if (workout.type === 'cycling')
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.speed.toFixed(1)}</span>
                    <span class="workout__unit">km/h</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⛰</span>
                    <span class="workout__value">${workout.elevationGain}</span>
                    <span class="workout__unit">m</span>
                </div>
            </li>
            `;
        form.insertAdjacentHTML('afterend', html);
    }

    _moveToPopup(e){
        const workOutEl = e.target.closest('.workout');
        // console.log(workOutEl);

        if (!workOutEl) return;

        const workout = this.#workOuts.find(
            work => work.id === workOutEl.dataset.id
        );
        //console.log(workout);

        this.#map.setView(workout.coords, this.#zoomLevel, {
            animate: 1,
            pan: {
                duration: 1,
            }
            }
         );

        // Using public interface
        // workout.click();
    }

    _setLocalStorage(){
        localStorage.setItem('workouts', JSON.stringify(this.#workOuts));
    }

    _getLocalStorage(){
        const data = JSON.parse(localStorage.getItem('workouts'));
        if (!data) return;
        this.#workOuts = data;
        this.#workOuts.forEach(
            workout => this._renderWorkout(workout)
        );
        // console.log(data);
    }

    reset(){
        localStorage.removeItem('workouts')
        location.reload();
    }
}

/////////////////////////////////
const app = new App();
