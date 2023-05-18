console.log('calculate.js loaded')

const distanceInMilesInput = document.getElementById('distance');
const fuelSuppliedInLitersInput = document.getElementById('fuel-supplied');
const clculateButton = document.getElementById('calculate');
const result = document.getElementById('result');

const calculateFuelConsumption = (distanceInMiles, fuelSuppliedInLiters) => {
    const distanceInKilometers = distanceInMiles * 1.609344;
    const fuelSupplied = fuelSuppliedInLiters / distanceInKilometers * 100;
    return fuelSupplied.toFixed(2);
}

clculateButton.addEventListener('click', function() {
    const distanceInMiles = distanceInMilesInput.value;
    const fuelSuppliedInLiters = fuelSuppliedInLitersInput.value;
    const fuelConsumption = calculateFuelConsumption(distanceInMiles, fuelSuppliedInLiters);
    result.innerHTML = fuelConsumption;
});

distanceInMilesInput.onkeyup = () => {
    console.log('distanceInMilesInput.onkeyup');
};
