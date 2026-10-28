const westernSigns = [
  { name: 'Aries', symbol: '♈', dateRange: 'Mar 21 - Apr 19', description: 'Bold, energetic, and ready to lead.', start: [3, 21], end: [4, 19] },
  { name: 'Taurus', symbol: '♉', dateRange: 'Apr 20 - May 20', description: 'Grounded, steady, and deeply practical.', start: [4, 20], end: [5, 20] },
  { name: 'Gemini', symbol: '♊', dateRange: 'May 21 - Jun 20', description: 'Curious, lively, and full of ideas.', start: [5, 21], end: [6, 20] },
  { name: 'Cancer', symbol: '♋', dateRange: 'Jun 21 - Jul 22', description: 'Nurturing, intuitive, and emotionally aware.', start: [6, 21], end: [7, 22] },
  { name: 'Leo', symbol: '♌', dateRange: 'Jul 23 - Aug 22', description: 'Confident, warm-hearted, and expressive.', start: [7, 23], end: [8, 22] },
  { name: 'Virgo', symbol: '♍', dateRange: 'Aug 23 - Sep 22', description: 'Organized, thoughtful, and detail-focused.', start: [8, 23], end: [9, 22] },
  { name: 'Libra', symbol: '♎', dateRange: 'Sep 23 - Oct 22', description: 'Balanced, charming, and harmony-seeking.', start: [9, 23], end: [10, 22] },
  { name: 'Scorpio', symbol: '♏', dateRange: 'Oct 23 - Nov 21', description: 'Passionate, intense, and deeply transformative.', start: [10, 23], end: [11, 21] },
  { name: 'Sagittarius', symbol: '♐', dateRange: 'Nov 22 - Dec 21', description: 'Adventurous, optimistic, and freedom-loving.', start: [11, 22], end: [12, 21] },
  { name: 'Capricorn', symbol: '♑', dateRange: 'Dec 22 - Jan 19', description: 'Disciplined, ambitious, and highly resilient.', start: [12, 22], end: [1, 19] },
  { name: 'Aquarius', symbol: '♒', dateRange: 'Jan 20 - Feb 18', description: 'Independent, imaginative, and forward-thinking.', start: [1, 20], end: [2, 18] },
  { name: 'Pisces', symbol: '♓', dateRange: 'Feb 19 - Mar 20', description: 'Compassionate, artistic, and spiritually tuned.', start: [2, 19], end: [3, 20] }
];

const vedicSigns = [
  { name: 'Aries', symbol: '♈', dateRange: 'Apr 14 - May 14', description: 'A fiery sidereal sign driven by initiative and courage.', start: [4, 14], end: [5, 14] },
  { name: 'Taurus', symbol: '♉', dateRange: 'May 15 - Jun 14', description: 'Steady, sensual, and rooted in comfort and values.', start: [5, 15], end: [6, 14] },
  { name: 'Gemini', symbol: '♊', dateRange: 'Jun 15 - Jul 14', description: 'Expressive, quick-witted, and intellectually curious.', start: [6, 15], end: [7, 14] },
  { name: 'Cancer', symbol: '♋', dateRange: 'Jul 15 - Aug 14', description: 'Warm, intuitive, and highly protective of home.', start: [7, 15], end: [8, 14] },
  { name: 'Leo', symbol: '♌', dateRange: 'Aug 15 - Sep 15', description: 'Confident, creative, and naturally charismatic.', start: [8, 15], end: [9, 15] },
  { name: 'Virgo', symbol: '♍', dateRange: 'Sep 16 - Oct 15', description: 'Analytical, helpful, and deeply service-minded.', start: [9, 16], end: [10, 15] },
  { name: 'Libra', symbol: '♎', dateRange: 'Oct 16 - Nov 15', description: 'Elegant, diplomatic, and relationship-focused.', start: [10, 16], end: [11, 15] },
  { name: 'Scorpio', symbol: '♏', dateRange: 'Nov 16 - Dec 15', description: 'Intense, strategic, and emotionally powerful.', start: [11, 16], end: [12, 15] },
  { name: 'Sagittarius', symbol: '♐', dateRange: 'Dec 16 - Jan 14', description: 'Philosophical, adventurous, and intellectually restless.', start: [12, 16], end: [1, 14] },
  { name: 'Capricorn', symbol: '♑', dateRange: 'Jan 15 - Feb 12', description: 'Disciplined, pragmatic, and achievement-driven.', start: [1, 15], end: [2, 12] },
  { name: 'Aquarius', symbol: '♒', dateRange: 'Feb 13 - Mar 13', description: 'Inventive, independent, and future-minded.', start: [2, 13], end: [3, 13] },
  { name: 'Pisces', symbol: '♓', dateRange: 'Mar 14 - Apr 13', description: 'Sensitive, imaginative, and spiritually open.', start: [3, 14], end: [4, 13] }
];

const paganSigns = [
  { name: 'Birch', symbol: '🌿', dateRange: 'Dec 24 - Jan 20', description: 'Fresh beginnings and resilient spirit.', start: [12, 24], end: [1, 20] },
  { name: 'Rowan', symbol: '🌳', dateRange: 'Jan 21 - Feb 17', description: 'Protection, intuition, and self-empowerment.', start: [1, 21], end: [2, 17] },
  { name: 'Ash', symbol: '🍃', dateRange: 'Feb 18 - Mar 17', description: 'A sign of connection, growth, and change.', start: [2, 18], end: [3, 17] },
  { name: 'Alder', symbol: '🌱', dateRange: 'Mar 18 - Apr 14', description: 'Grounding energy and emotional resilience.', start: [3, 18], end: [4, 14] },
  { name: 'Willow', symbol: '🕊️', dateRange: 'Apr 15 - May 12', description: 'Intuitive, creative, and deeply reflective.', start: [4, 15], end: [5, 12] },
  { name: 'Oak', symbol: '🌲', dateRange: 'May 13 - Jun 9', description: 'Strength, stability, and inner confidence.', start: [5, 13], end: [6, 9] },
  { name: 'Holly', symbol: '✨', dateRange: 'Jun 10 - Jul 7', description: 'Protection, vitality, and bold passion.', start: [6, 10], end: [7, 7] },
  { name: 'Hazel', symbol: '🌼', dateRange: 'Jul 8 - Aug 4', description: 'Wisdom, enchantment, and emotional clarity.', start: [7, 8], end: [8, 4] },
  { name: 'Vine', symbol: '🍇', dateRange: 'Aug 5 - Sep 1', description: 'Growth, creativity, and flourishing connection.', start: [8, 5], end: [9, 1] },
  { name: 'Ivy', symbol: '🌿', dateRange: 'Sep 2 - Sep 29', description: 'Adaptability, loyalty, and lasting devotion.', start: [9, 2], end: [9, 29] },
  { name: 'Reed', symbol: '🌾', dateRange: 'Sep 30 - Oct 27', description: 'Calm strength and intuitive balance.', start: [9, 30], end: [10, 27] },
  { name: 'Elder', symbol: '🌙', dateRange: 'Oct 28 - Nov 24', description: 'Mystery, wisdom, and deep spiritual insight.', start: [10, 28], end: [11, 24] }
];

const results = {
  western: document.getElementById('western-name'),
  westernRange: document.getElementById('western-date-range'),
  westernDescription: document.getElementById('western-description'),
  vedic: document.getElementById('vedic-name'),
  vedicRange: document.getElementById('vedic-date-range'),
  vedicDescription: document.getElementById('vedic-description'),
  pagan: document.getElementById('pagan-name'),
  paganRange: document.getElementById('pagan-date-range'),
  paganDescription: document.getElementById('pagan-description'),
  birthDate: document.getElementById('birth-date-display'),
  resultsSection: document.getElementById('results')
};

const form = document.getElementById('dob-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const dobValue = document.getElementById('dob').value;
  if (!dobValue) {
    alert('Please choose a date of birth.');
    return;
  }

  const birthDate = new Date(`${dobValue}T12:00:00`);
  const westernSlip = findSign(birthDate, westernSigns);
  const vedicSlip = findSign(birthDate, vedicSigns);
  const paganSlip = findSign(birthDate, paganSigns);

  results.birthDate.textContent = birthDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  applySignCard('western', westernSlip);
  applySignCard('vedic', vedicSlip);
  applySignCard('pagan', paganSlip);

  results.resultsSection.classList.remove('hidden');
});

function applySignCard(system, sign) {
  const nameEl = results[system];
  const rangeEl = results[`${system}Range`];
  const descEl = results[`${system}Description`];

  if (!sign) {
    nameEl.textContent = 'Unknown';
    rangeEl.textContent = 'No matching range';
    descEl.textContent = 'Please enter a valid date.';
    return;
  }

  nameEl.textContent = `${sign.symbol} ${sign.name}`;
  rangeEl.textContent = sign.dateRange;
  descEl.textContent = sign.description;
}

function findSign(date, signSet) {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  for (const sign of signSet) {
    const start = sign.start;
    const end = sign.end;

    if (isWithinRange(month, day, start, end)) {
      return sign;
    }
  }

  return signSet[0];
}

function isWithinRange(month, day, start, end) {
  const value = month * 100 + day;
  const startValue = start[0] * 100 + start[1];
  const endValue = end[0] * 100 + end[1];

  if (start[0] <= end[0]) {
    return value >= startValue && value <= endValue;
  }

  return value >= startValue || value <= endValue;
}
