const form = document.getElementById('weights-form');
const rowsContainer = document.getElementById('weight-rows');
const addRowButton = document.getElementById('add-row');
const errorMessage = document.getElementById('form-error');
const results = document.getElementById('results');
const totalWeight = document.getElementById('total-weight');
const resultList = document.getElementById('result-list');
const distributionBar = document.getElementById('distribution-bar');

const colors = ['#236448', '#e57b3a', '#6889a8', '#a35d79', '#9b813f', '#715f9a', '#3d8b87', '#bb5c4b'];
let nextRowId = 1;

function parseWeight(value) {
    const normalizedValue = value.trim().replace(',', '.');

    if (normalizedValue === '') {
        return Number.NaN;
    }

    return Number(normalizedValue);
}

function formatNumber(value, maximumFractionDigits = 4) {
    return new Intl.NumberFormat('uk-UA', {
        maximumFractionDigits
    }).format(value);
}

function updateRemoveButtons() {
    const buttons = rowsContainer.querySelectorAll('.remove-row');
    const shouldDisable = buttons.length === 1;

    buttons.forEach((button) => {
        button.disabled = shouldDisable;
    });
}

function createWeightRow(name = '', weight = '') {
    const rowId = nextRowId;
    nextRowId += 1;

    const row = document.createElement('div');
    row.className = 'weight-row';

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = `weight-name-${rowId}`;
    nameInput.dataset.role = 'name';
    nameInput.autocomplete = 'off';
    nameInput.placeholder = `Вага ${rowsContainer.children.length + 1}`;
    nameInput.setAttribute('aria-label', `Назва ваги ${rowsContainer.children.length + 1}`);
    nameInput.value = name;

    const weightInput = document.createElement('input');
    weightInput.type = 'text';
    weightInput.id = `weight-value-${rowId}`;
    weightInput.dataset.role = 'weight';
    weightInput.inputMode = 'decimal';
    weightInput.autocomplete = 'off';
    weightInput.placeholder = 'Наприклад, 25';
    weightInput.setAttribute('aria-label', `Значення ваги ${rowsContainer.children.length + 1}`);
    weightInput.value = weight;

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'remove-row';
    removeButton.setAttribute('aria-label', 'Видалити вагу');
    removeButton.textContent = '×';
    removeButton.addEventListener('click', () => {
        row.remove();
        updateRemoveButtons();
        errorMessage.textContent = '';
    });

    row.append(nameInput, weightInput, removeButton);
    rowsContainer.append(row);
    updateRemoveButtons();

    return weightInput;
}

function readWeights() {
    const rows = [...rowsContainer.querySelectorAll('.weight-row')];
    let hasError = false;

    const weights = rows.map((row, index) => {
        const nameInput = row.querySelector('[data-role="name"]');
        const weightInput = row.querySelector('[data-role="weight"]');
        const value = parseWeight(weightInput.value);
        const isInvalid = !Number.isFinite(value) || value < 0;

        weightInput.setAttribute('aria-invalid', String(isInvalid));
        hasError ||= isInvalid;

        return {
            name: nameInput.value.trim() || `Вага ${index + 1}`,
            value
        };
    });

    if (hasError) {
        throw new Error('Вкажіть для кожного рядка число, що дорівнює або більше нуля.');
    }

    if (weights.length < 2) {
        throw new Error('Додайте щонайменше дві ваги для порівняння.');
    }

    const total = weights.reduce((sum, item) => sum + item.value, 0);

    if (total === 0) {
        throw new Error('Сума ваг має бути більшою за нуль.');
    }

    return { weights, total };
}

function renderResults(weights, total) {
    resultList.replaceChildren();
    distributionBar.replaceChildren();

    weights.forEach((item, index) => {
        const percentage = (item.value / total) * 100;
        const color = colors[index % colors.length];

        const segment = document.createElement('span');
        segment.className = 'distribution-bar__segment';
        segment.style.width = `${percentage}%`;
        segment.style.backgroundColor = color;
        segment.title = `${item.name}: ${formatNumber(percentage, 2)}%`;
        distributionBar.append(segment);

        const listItem = document.createElement('li');
        listItem.className = 'result-item';

        const dot = document.createElement('span');
        dot.className = 'result-item__dot';
        dot.style.backgroundColor = color;
        dot.setAttribute('aria-hidden', 'true');

        const name = document.createElement('span');
        name.className = 'result-item__name';
        name.textContent = item.name;

        const value = document.createElement('span');
        value.className = 'result-item__value';
        const percentageValue = document.createElement('strong');
        percentageValue.textContent = `${formatNumber(percentage, 2)}%`;
        value.append(percentageValue, ` · вага ${formatNumber(item.value)}`);

        listItem.append(dot, name, value);
        resultList.append(listItem);
    });

    totalWeight.textContent = formatNumber(total);
    results.hidden = false;
}

addRowButton.addEventListener('click', () => {
    const weightInput = createWeightRow();
    weightInput.focus();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    errorMessage.textContent = '';

    try {
        const { weights, total } = readWeights();
        renderResults(weights, total);
    } catch (error) {
        results.hidden = true;
        errorMessage.textContent = error.message;
    }
});

createWeightRow('Варіант A', '30');
createWeightRow('Варіант B', '20');
createWeightRow('Варіант C', '50');
