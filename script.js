const API_BASE = document.querySelector('meta[name="api-base-url"]')?.content || '/api/v1';
const form = document.querySelector('#birth-form');
const birthplaceInput = document.querySelector('#birthplace');
const suggestions = document.querySelector('#place-suggestions');
const message = document.querySelector('#form-message');
const placeIdInput = document.querySelector('#place-id');
let searchTimer;

birthplaceInput.addEventListener('input', () => {
  placeIdInput.value = '';
  clearTimeout(searchTimer);
  const query = birthplaceInput.value.trim();
  if (query.length < 3) {
    suggestions.replaceChildren();
    suggestions.classList.add('hidden');
    return;
  }
  searchTimer = setTimeout(() => searchPlaces(query), 300);
});

async function searchPlaces(query) {
  setMessage('Searching configured place provider…');
  try {
    const response = await fetch(`${API_BASE}/places?query=${encodeURIComponent(query)}`);
    const body = await response.json();
    if (!response.ok) throw new Error(body.message || 'Place search is unavailable.');
    suggestions.replaceChildren();
    body.places.forEach((place) => {
      const option = document.createElement('button');
      option.type = 'button';
      option.className = 'place-option';
      option.setAttribute('role', 'option');
      option.textContent = place.label;
      option.addEventListener('click', () => {
        birthplaceInput.value = place.label;
        placeIdInput.value = place.placeId;
        suggestions.replaceChildren();
        suggestions.classList.add('hidden');
        setMessage('');
      });
      suggestions.append(option);
    });
    suggestions.classList.toggle('hidden', body.places.length === 0);
    setMessage(body.places.length ? 'Select the matching birthplace from the results.' : 'No matching places found.');
  } catch (error) {
    suggestions.replaceChildren();
    suggestions.classList.add('hidden');
    setMessage(error.message, true);
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  if (!placeIdInput.value) {
    setMessage('Select a birthplace from the provider search results.', true);
    birthplaceInput.focus();
    return;
  }

  const submit = document.querySelector('#chart-submit');
  submit.disabled = true;
  submit.querySelector('span').textContent = 'Calculating…';
  document.querySelector('#results').classList.add('hidden');
  setMessage('Resolving birth time and calculating the chart…');

  try {
    const response = await fetch(`${API_BASE}/charts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dateOfBirth: document.querySelector('#birth-date').value,
        timeOfBirth: document.querySelector('#birth-time').value,
        birthplace: { placeId: placeIdInput.value }
      })
    });
    const body = await response.json();
    if (!response.ok) throw new Error(body.message || 'Chart calculation failed.');
    renderChart(body);
    document.querySelector('#results').classList.remove('hidden');
    setMessage('');
    document.querySelector('#results').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    setMessage(error.message, true);
  } finally {
    submit.disabled = false;
    submit.querySelector('span').textContent = 'Calculate D1 chart';
  }
});

function renderChart(chart) {
  const pointsByHouse = Array.from({ length: 12 }, () => []);
  chart.points.forEach((point) => pointsByHouse[point.house - 1].push(point.name));

  const houses = chart.houses.map((house) => {
    const cell = document.createElement('article');
    cell.className = `house-cell${house.house === 1 ? ' lagna-house' : ''}`;
    const heading = document.createElement('div');
    heading.className = 'house-cell-heading';
    heading.textContent = `House ${house.house} · ${house.sign}`;
    const contents = document.createElement('p');
    contents.textContent = pointsByHouse[house.house - 1].join(' · ') || '—';
    cell.append(heading, contents);
    return cell;
  });
  const houseChart = document.querySelector('#house-chart');
  houseChart.replaceChildren(...houses);
  houseChart.setAttribute('aria-label', `Whole-sign houses. Lagna ${chart.lagna.sign}.`);

  const body = document.querySelector('#positions-body');
  body.replaceChildren(...chart.points.map((point) => {
    const row = document.createElement('tr');
    [
      point.name,
      `${point.sign}${point.isRetrograde ? ' ℞' : ''}`,
      String(point.house),
      `${point.longitudeInSign.toFixed(4)}°`,
      point.nakshatra,
      String(point.pada)
    ].forEach((value) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.append(cell);
    });
    return row;
  }));
  document.querySelector('#birth-summary').textContent =
    `${chart.birthDate} · ${chart.birthTime} · ${chart.birthplace.label}`;
  document.querySelector('#method-summary').textContent =
    `${chart.method.ayanamsa} · ${chart.method.houseSystem}`;
}

function setMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle('error', isError);
}
