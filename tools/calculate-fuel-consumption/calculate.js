console.log('calculate.js loaded')

const distanceInMilesInput = document.getElementById('distance');
const fuelSuppliedInLitersInput = document.getElementById('fuel-supplied');
const clculateButton = document.getElementById('calculate');
const result = document.getElementById('result');

const calculateFuelConsumption = (distanceInMiles, fuelSuppliedInLiters) => {
    const distanceInKilometers = distanceInMiles * 1.609344;
    const fuelSupplied = fuelSuppliedInLiters / distanceInKilometers * 100;
    return fuelSupplied.toFixed(2);
};

const getClipboardString = (fuelConsumption, distanceInMiles, fuelSuppliedInLiters) => {
    const currentDate = new Date().toLocaleDateString('de-DE');
    const clipboardString = `${currentDate}
${distanceInMiles} miles; ${fuelSuppliedInLiters} liters;
Fuel consumption: ${fuelConsumption} Liters/100km`;
    return clipboardString;
}

clculateButton.addEventListener('click', function () {
    const distanceInMiles = distanceInMilesInput.value;
    const fuelSuppliedInLiters = fuelSuppliedInLitersInput.value;
    const fuelConsumption = calculateFuelConsumption(distanceInMiles, fuelSuppliedInLiters);
    result.innerHTML = fuelConsumption;
    const clipboardString = getClipboardString(fuelConsumption, distanceInMiles, fuelSuppliedInLiters);
    navigator.clipboard.writeText(clipboardString);
});

distanceInMilesInput.onkeyup = () => {
    console.log('distanceInMilesInput.onkeyup');
};
