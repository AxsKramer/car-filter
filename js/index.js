import {cars} from './db.js';
//Variables
const brand = document.querySelector('#brand');
const year = document.querySelector('#year');
const min = document.querySelector('#min');
const max = document.querySelector('#max');
const doors = document.querySelector('#doors');
const transmission = document.querySelector('#transmission');
const color = document.querySelector('#color');
const results = document.querySelector('#results');
const anyResult = document.querySelector('.any-result');
const form = document.querySelector('#form');
const reset = document.querySelector('#reset');


const max_year = new Date().getFullYear();
const min_year = max_year - 10;

const searchData= {
    brand: '',
    year: '',
    min: '',
    max: '',    
    doors: '',
    transmission: '',
    color: ''
}


//Events
document.addEventListener('DOMContentLoaded', () => {
    showCars(cars);
    generateSelectYears();
});

brand.addEventListener('change', e => {
    searchData.brand = e.target.value;
    filterAuto();
});

year.addEventListener('change', e => {
    searchData.year = parseInt(e.target.value);
    filterAuto();
});

min.addEventListener('change', e => {
    searchData.min = e.target.value;
    filterAuto();
});

max.addEventListener('change', e => {
    searchData.max = e.target.value;
    filterAuto();
});

doors.addEventListener('change', e => {
    searchData.doors = e.target.value;
    filterAuto();
});

transmission.addEventListener('change', e => {
    searchData.transmission = e.target.value;
    filterAuto();
});

color.addEventListener('change', e => {
    searchData.color = e.target.value;
    filterAuto();
});

reset.addEventListener('click', () => {
    form.reset();
    window.location.reload();
})



//Functions
function showCars(cars){
    cleanHTML();
    
    cars.forEach(car => {

        const { marca, modelo, year, puertas, transmision, precio, color } = car;
        const carDisplay = `
        <div class="card border-dark mb-3 d-flex box-card" style="max-width: 12rem;">
            <div class="card-header text-center font-weight-bold">${marca} ${modelo}  ${year}</div>
            <div class="card-body text-dark">
                <p class="card-text"><strong>Transmission:</strong> ${transmision}</p>
                <p class="card-text"> <strong>Doors:</strong> ${puertas}</p>
                <p class="card-text"><strong>Price:</strong> $ ${precio}</p>
                <p class="card-text d-flex"><strong>Color:</strong>
                    <span class='color' style="background-color: ${color}" ></span>
                </p>
            </div>
        </div>
        `;
        results.innerHTML += carDisplay;
        
    });
}

function cleanHTML(){
    while(results.firstChild){
        results.removeChild(results.firstChild);
    }
}

function generateSelectYears(){
    for(let i = max_year; i >= min_year; i--){
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }
}

function noResults(){
    cleanHTML();
    anyResult.classList.add('alert', 'alert-danger');
    anyResult.textContent = 'No Results found it, try with other filter';
}

function filterAuto() {
    const resultado = cars.filter( filterBrand ).filter( filterYear ).filter( filterMin ).filter( filterMax ).filter( filterDoors ).filter( filterTransmission ).filter(filterColor );
    anyResult.textContent = 'Results';
    if( resultado ) {
        showCars(resultado);
    }
}

function filterBrand(car) {
    const { brand } = searchData;
    if( brand ) {
       return car.marca === brand;
    }
    return car;
}

function filterYear(car) {
    const { year } = searchData;
    if( year ) {
       return car.year === year;
    }
    return car;
}

function filterMin(car) {
    const { min } = searchData;
    if( min ) {
       return car.precio >= min;
    }
    return car;
}

function filterMax(car) {
    const { max } = searchData;
    if( max ) {
       return car.precio <= max;
    }
    return car;
}

function filterDoors(car) {
    const { doors } = searchData;
    if( doors ) {
       return car.puertas == doors;
    }
    return car;
}

function filterTransmission(car) {
    const { transmission } = searchData;
    if( transmission ) {
       return car.transmision === transmission;
    }
    return car;
}

function filterColor(car) {
    const { color } = searchData;
    if( color ) {
       return car.color == color;
    }
    return car;
}
