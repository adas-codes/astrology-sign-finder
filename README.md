const westernSigns = [
  { name: 'Aries', symbol: '♈', dateRange: 'Mar 21 - Apr 19', description: 'Bold, energetic, and driven to initiate.', start: [3, 21], end: [4, 19] },
  { name: 'Taurus', symbol: '♉', dateRange: 'Apr 20 - May 20', description: 'Grounded, steady, and deeply practical.', start: [4, 20], end: [5, 20] },
  { name: 'Gemini', symbol: '♊', dateRange: 'May 21 - Jun 20', description: 'Curious, vibrant, and quick-witted.', start: [5, 21], end: [6, 20] },
  { name: 'Cancer', symbol: '♋', dateRange: 'Jun 21 - Jul 22', description: 'Nurturing, intuitive, and emotionally tuned.', start: [6, 21], end: [7, 22] },
  { name: 'Leo', symbol: '♌', dateRange: 'Jul 23 - Aug 22', description: 'Confident, expressive, and radiant.', start: [7, 23], end: [8, 22] },
  { name: 'Virgo', symbol: '♍', dateRange: 'Aug 23 - Sep 22', description: 'Analytical, observant, and detail-focused.', start: [8, 23], end: [9, 22] },
  { name: 'Libra', symbol: '♎', dateRange: 'Sep 23 - Oct 22', description: 'Balanced, diplomatic, and harmony-seeking.', start: [9, 23], end: [10, 22] },
  { name: 'Scorpio', symbol: '♏', dateRange: 'Oct 23 - Nov 21', description: 'Intense, magnetic, and transformational.', start: [10, 23], end: [11, 21] },
  { name: 'Sagittarius', symbol: '♐', dateRange: 'Nov 22 - Dec 21', description: 'Adventurous, philosophical, and freedom-loving.', start: [11, 22], end: [12, 21] },
  { name: 'Capricorn', symbol: '♑', dateRange: 'Dec 22 - Jan 19', description: 'Disciplined, ambitious, and achievement-driven.', start: [12, 22], end: [1, 19] },
  { name: 'Aquarius', symbol: '♒', dateRange: 'Jan 20 - Feb 18', description: 'Independent, visionary, and future-minded.', start: [1, 20], end: [2, 18] },
  { name: 'Pisces', symbol: '♓', dateRange: 'Feb 19 - Mar 20', description: 'Compassionate, imaginative, and spiritually aware.', start: [2, 19], end: [3, 20] }
];

const vedicSigns = [
  { name: 'Aries', symbol: '♈', dateRange: 'Apr 14 - May 14', description: 'A dynamic ram sign focused on courage and action.', start: [4, 14], end: [5, 14] },
  { name: 'Taurus', symbol: '♉', dateRange: 'May 15 - Jun 14', description: 'Steady, sensual, and rooted in comfort and values.', start: [5, 15], end: [6, 14] },
  { name: 'Gemini', symbol: '♊', dateRange: 'Jun 15 - Jul 14', description: 'Expressive, witty, and intellectually agile.', start: [6, 15], end: [7, 14] },
  { name: 'Cancer', symbol: '♋', dateRange: 'Jul 15 - Aug 14', description: 'Nurturing, emotional, and home-centered.', start: [7, 15], end: [8, 14] },
  { name: 'Leo', symbol: '♌', dateRange: 'Aug 15 - Sep 15', description: 'Confident, regal, and emotionally expressive.', start: [8, 15], end: [9, 15] },
  { name: 'Virgo', symbol: '♍', dateRange: 'Sep 16 - Oct 15', description: 'Precise, service-oriented, and analytical.', start: [9, 16], end: [10, 15] },
  { name: 'Libra', symbol: '♎', dateRange: 'Oct 16 - Nov 15', description: 'Elegant, relational, and harmony-seeking.', start: [10, 16], end: [11, 15] },
  { name: 'Scorpio', symbol: '♏', dateRange: 'Nov 16 - Dec 15', description: 'Deep, resilient, and intensely transformative.', start: [11, 16], end: [12, 15] },
  { name: 'Sagittarius', symbol: '♐', dateRange: 'Dec 16 - Jan 14', description: 'Adventurous, philosophical, and truth-seeking.', start: [12, 16], end: [1, 14] },
  { name: 'Capricorn', symbol: '♑', dateRange: 'Jan 15 - Feb 12', description: 'Ambitious, practical, and disciplined.', start: [1, 15], end: [2, 12] },
  { name: 'Aquarius', symbol: '♒', dateRange: 'Feb 13 - Mar 13', description: 'Original, detached, and future-focused.', start: [2, 13], end: [3, 13] },
  { name: 'Pisces', symbol: '♓', dateRange: 'Mar 14 - Apr 13', description: 'Compassionate, spiritual, and dreamy.', start: [3, 14], end: [4, 13] }
];

const trueSiderealSigns = [
  { name: 'Aries', symbol: '♈', dateRange: 'Apr 15 - May 15', description: 'A star-based Aries aligned with the actual zodiac constellations.', start: [4, 15], end: [5, 15] },
  { name: 'Taurus', symbol: '♉', dateRange: 'May 16 - Jun 15', description: 'Earthy, stable, and grounded with a more astronomical angle.', start: [5, 16], end: [6, 15] },
  { name: 'Gemini', symbol: '♊', dateRange: 'Jun 16 - Jul 15', description: 'Intellectual and adaptable in the true sidereal system.', start: [6, 16], end: [7, 15] },
  { name: 'Cancer', symbol: '♋', dateRange: 'Jul 16 - Aug 15', description: 'Nurturing and intuitive under the fixed star framework.', start: [7, 16], end: [8, 15] },
  { name: 'Leo', symbol: '♌', dateRange: 'Aug 16 - Sep 15', description: 'Creative and iconic in the astronomical zodiac.', start: [8, 16], end: [9, 15] },
  { name: 'Virgo', symbol: '♍', dateRange: 'Sep 16 - Oct 15', description: 'Analytical and discerning in an earth-centered chart.', start: [9, 16], end: [10, 15] },
  { name: 'Libra', symbol: '♎', dateRange: 'Oct 16 - Nov 15', description: 'Balanced and aesthetic in the sidereal sky map.', start: [10, 16], end: [11, 15] },
  { name: 'Scorpio', symbol: '♏', dateRange: 'Nov 16 - Dec 15', description: 'Depth, intensity, and transformation from the real zodiac.', start: [11, 16], end: [12, 15] },
  { name: 'Sagittarius', symbol: '♐', dateRange: 'Dec 16 - Jan 14', description: 'Expansive and adventurous with a broader astronomical frame.', start: [12, 16], end: [1, 14] },
  { name: 'Capricorn', symbol: '♑', dateRange: 'Jan 15 - Feb 12', description: 'Disciplined and strategic under true sidereal placement.', start: [1, 15], end: [2, 12] },
  { name: 'Aquarius', symbol: '♒', dateRange: 'Feb 13 - Mar 13', description: 'Visionary and original with a star-based placement.', start: [2, 13], end: [3, 13] },
  { name: 'Pisces', symbol: '♓', dateRange: 'Mar 14 - Apr 14', description: 'Dreamy, empathic, and spiritually attuned.', start: [3, 14], end: [4, 14] }
];

const chineseAnimals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
const tibetanAnimals = ['Mouse', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Sheep', 'Monkey', 'Rooster', 'Dog', 'Pig'];
const burmeseAnimals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];

const nativeSigns = [
  { name: 'Otter', dateRange: 'Jan 1 - Jan 28', description: 'Adaptable, intuitive, and deeply connected to emotion.', start: [1, 1], end: [1, 28] },
  { name: 'Wolf', dateRange: 'Jan 29 - Feb 25', description: 'Loyal, instinctive, and community-focused.', start: [1, 29], end: [2, 25] },
  { name: 'Falcon', dateRange: 'Feb 26 - Mar 25', description: 'Visionary, direct, and spiritually bold.', start: [2, 26], end: [3, 25] },
  { name: 'Bear', dateRange: 'Mar 26 - Apr 22', description: 'Grounded, protective, and deeply nurturing.', start: [3, 26], end: [4, 22] },
  { name: 'Deer', dateRange: 'Apr 23 - May 20', description: 'Gentle, graceful, and highly sensitive.', start: [4, 23], end: [5, 20] },
  { name: 'Raven', dateRange: 'May 21 - Jun 17', description: 'Mystical, wise, and perceptive.', start: [5, 21], end: [6, 17] },
  { name: 'Eagle', dateRange: 'Jun 18 - Jul 15', description: 'Powerful, fearless, and forward-looking.', start: [6, 18], end: [7, 15] },
  { name: 'Boar', dateRange: 'Jul 16 - Aug 12', description: 'Strong-willed, grounded, and instinctive.', start: [7, 16], end: [8, 12] },
  { name: 'Salmon', dateRange: 'Aug 13 - Sep 9', description: 'Resilient, transformative, and deeply driven.', start: [8, 13], end: [9, 9] },
  { name: 'Seabird', dateRange: 'Sep 10 - Oct 7', description: 'Curious, free, and spiritually agile.', start: [9, 10], end: [10, 7] },
  { name: 'Hawk', dateRange: 'Oct 8 - Nov 4', description: 'Observant, strategic, and fiercely independent.', start: [10, 8], end: [11, 4] },
  { name: 'Beaver', dateRange: 'Nov 5 - Dec 2', description: 'Practical, inventive, and steadfast.', start: [11, 5], end: [12, 2] },
  { name: 'Sage', dateRange: 'Dec 3 - Dec 31', description: 'Wise, reflective, and deeply grounded in spirit.', start: [12, 3], end: [12, 31] }
];

const celticTreeSigns = [
  { name: 'Birch', dateRange: 'Jan 1 - Jan 10', description: 'Fresh starts, renewal, and resilience.', start: [1, 1], end: [1, 10] },
  { name: 'Rowan', dateRange: 'Jan 11 - Jan 20', description: 'Protection, intuition, and magical strength.', start: [1, 11], end: [1, 20] },
  { name: 'Ash', dateRange: 'Jan 21 - Jan 31', description: 'Connection, balance, and inner calm.', start: [1, 21], end: [1, 31] },
  { name: 'Alder', dateRange: 'Feb 1 - Feb 10', description: 'Grounding energy and emotional resilience.', start: [2, 1], end: [2, 10] },
  { name: 'Willow', dateRange: 'Feb 11 - Feb 20', description: 'Depth, intuition, and emotional creativity.', start: [2, 11], end: [2, 20] },
  { name: 'Hawthorn', dateRange: 'Feb 21 - Mar 2', description: 'Beloved for love, courage, and beauty.', start: [2, 21], end: [3, 2] },
  { name: 'Oak', dateRange: 'Mar 3 - Mar 12', description: 'Strength, stability, and natural leadership.', start: [3, 3], end: [3, 12] },
  { name: 'Hazel', dateRange: 'Mar 13 - Mar 22', description: 'Wisdom, insight, and creativity.', start: [3, 13], end: [3, 22] },
  { name: 'Vine', dateRange: 'Mar 23 - Apr 1', description: 'Flourishing growth and artistic flow.', start: [3, 23], end: [4, 1] },
  { name: 'Ivy', dateRange: 'Apr 2 - Apr 11', description: 'Adaptability, loyalty, and persistence.', start: [4, 2], end: [4, 11] },
  { name: 'Blackthorn', dateRange: 'Apr 12 - Apr 21', description: 'Protection and a sharp instinct for survival.', start: [4, 12], end: [4, 21] },
  { name: 'Holly', dateRange: 'Apr 22 - May 1', description: 'Guardianship, vitality, and resilient spirit.', start: [4, 22], end: [5, 1] },
  { name: 'Elder', dateRange: 'May 2 - May 11', description: 'Mystery, wisdom, and inner transformation.', start: [5, 2], end: [5, 11] }
];

const mayanSigns = ['Imix', 'Ik\'', 'Akbal', 'Kan', 'Chikchan', 'Kimi', 'Manik', 'Lamat', 'Muluk', 'Ok', 'Chuwen', 'Eb', 'B\'en', 'Ix', 'Men', 'Kib', 'Kaban', 'Etznab', 'Kawak', 'Ajaw'];
const aztecSigns = ['Cipactli', 'Ehecatl', 'Calli', 'Cuetzpalin', 'Coatl', 'Miquiztli', 'Mazatl', 'Tochtli', 'Atl', 'Itzcuintli', 'Ozomatli', 'Malinalli', 'Acatl', 'Ocelotl', 'Cuauhtli', 'Cozcacuauhtli', 'Ollin', 'Tecpatl', 'Quiahuitl', 'Xochitl'];

const egyptianDecans = [
  'Anuket', 'Ptah', 'Ra', 'Hathor', 'Osiris', 'Isis', 'Horus', 'Set', 'Thoth', 'Sekhmet',
  'Bastet', 'Nut', 'Geb', 'Shu', 'Tefnut', 'Amun', 'Aten', 'Maat', 'Khonsu', 'Seshat',
  'Nephthys', 'Hapi', 'Khepri', 'Sobek', 'Wadjet', 'Serket', 'Neith', 'Renenutet', 'Apep', 'Maahes',
  'Bes', 'Ptaht', 'Mut', 'Hathor', 'Anubis', 'Sopdet'
];

const stems = ['Jia', 'Yi', 'Bing', 'Ding', 'Wu', 'Ji', 'Geng', 'Xin', 'Ren', 'Gui'];
const branches = ['Zi', 'Chou', 'Yin', 'Mao', 'Chen', 'Si', 'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai'];

function parseDob(value) {
  const normalized = String(value || '').trim();
  const match = normalized.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

  if (!match) {
    return null;
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function formatDate(date) {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

function dayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  return Math.floor(diff / 86400000) + 1;
}

function toMonthDay(date) {
  return { month: date.getMonth() + 1, day: date.getDate() };
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

function findMatch(date, entries) {
  const { month, day } = toMonthDay(date);

  for (const entry of entries) {
    if (isWithinRange(month, day, entry.start, entry.end)) {
      return entry;
    }
  }

  return entries[0];
}

function getChineseAnimal(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const chineseNewYearDay = 4;
  const adjustedYear = month < 2 || (month === 2 && day < chineseNewYearDay) ? year - 1 : year;
  const index = (adjustedYear - 4) % 12;
  return {
    name: chineseAnimals[(index + 12) % 12],
    description: 'The Chinese zodiac cycle is based on a 12-year animal cycle.',
    range: `Year ${adjustedYear}`
  };
}

function getTibetanAnimal(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const adjustedYear = month < 2 || (month === 2 && day < 4) ? year - 1 : year;
  const index = (adjustedYear - 4) % 12;
  return {
    name: tibetanAnimals[(index + 12) % 12],
    description: 'Tibetan astrology follows a 12-year animal rhythm, often linked to spiritual and karmic themes.',
    range: `Year ${adjustedYear}`
  };
}

function getBurmeseAnimal(date) {
  const year = date.getFullYear();
  const adjustedYear = year;
  const index = (adjustedYear - 4) % 12;
  return {
    name: burmeseAnimals[(index + 12) % 12],
    description: 'The Burmese zodiac is a traditional 12-animal cycle with deep cultural significance.',
    range: `Year ${adjustedYear}`
  };
}

function getMayanSign(date) {
  const start = new Date(Date.UTC(2024, 0, 1));
  const diffDays = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - start.getTime()) / 86400000);
  const index = ((diffDays + 1) % 20 + 20) % 20;
  return {
    name: mayanSigns[index],
    description: 'Mayan astrology is traditionally tied to the 20-day Tzolkin cycle and sacred numerology.',
    range: 'Tzolkin day sign'
  };
}

function getAztecSign(date) {
  const start = new Date(Date.UTC(2024, 0, 1));
  const diffDays = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - start.getTime()) / 86400000);
  const index = ((diffDays + 1) % 20 + 20) % 20;
  return {
    name: aztecSigns[index],
    description: 'Aztec day signs form part of a sacred calendar of 20 symbols linked to life force and timing.',
    range: 'Aztec day sign'
  };
}

function getEgyptianDecan(date) {
  const doy = dayOfYear(date) - 1;
  const index = Math.floor(doy / 10) % egyptianDecans.length;
  const decanName = egyptianDecans[index];
  const startDay = index * 10 + 1;
  const endDay = Math.min(startDay + 9, 365);
  return {
    name: decanName,
    description: 'Egyptian decans were 10-day periods tied to constellations and ritual significance.',
    range: `Day ${startDay} - ${endDay}`
  };
}

function getBaZi(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayNumber = Math.floor((Date.UTC(year, date.getMonth(), date.getDate()) - Date.UTC(2024, 0, 1)) / 86400000) + 1;

  const yearStem = stems[(year - 4) % 10];
  const yearBranch = branches[(year - 4) % 12];
  const monthStem = stems[(year + month - 1) % 10];
  const monthBranch = branches[(month + 1) % 12];
  const dayStem = stems[(dayNumber + 9) % 10];
  const dayBranch = branches[(dayNumber + 8) % 12];

  return {
    name: `${yearStem}${yearBranch} / ${monthStem}${monthBranch} / ${dayStem}${dayBranch}`,
    description: 'BaZi is a four-pillar analysis using the year, month, day, and hour pillars derived from the Chinese sexagenary cycle.',
    range: 'Year / Month / Day pillars (hour pillar requires birth time)'
  };
}

function buildCard(systemKey, title, signInfo) {
  const card = document.createElement('article');
  card.className = `zodiac-card ${systemKey}`;

  const header = document.createElement('div');
  header.className = 'card-header';

  const titleEl = document.createElement('h3');
  titleEl.className = 'system-name';
  titleEl.textContent = title;

  const badge = document.createElement('span');
  badge.className = 'system-badge';
  badge.textContent = signInfo.badge || 'Sign';

  header.appendChild(titleEl);
  header.appendChild(badge);

  const signName = document.createElement('h4');
  signName.className = 'sign-name';
  signName.textContent = signInfo.name;

  const rangeLine = document.createElement('p');
  rangeLine.className = 'range-line';
  rangeLine.textContent = signInfo.range;

  const detailLine = document.createElement('p');
  detailLine.className = signInfo.extraClass || 'detail-line';
  detailLine.textContent = signInfo.detail || '';

  const desc = document.createElement('p');
  desc.className = 'description';
  desc.textContent = signInfo.description;

  card.append(header, signName, rangeLine, detailLine, desc);
  return card;
}

function evaluate(date) {
  const western = findMatch(date, westernSigns);
  const vedic = findMatch(date, vedicSigns);
  const trueSidereal = findMatch(date, trueSiderealSigns);
  const chinese = getChineseAnimal(date);
  const baZi = getBaZi(date);
  const tibetan = getTibetanAnimal(date);
  const mayan = getMayanSign(date);
  const aztec = getAztecSign(date);
  const native = findMatch(date, nativeSigns);
  const celtic = findMatch(date, celticTreeSigns);
  const egyptian = getEgyptianDecan(date);
  const burmese = getBurmeseAnimal(date);

  return [
    { key: 'western', title: 'Western Tropical Zodiac', data: { name: `${western.symbol} ${western.name}`, range: western.dateRange, description: western.description, badge: 'WT', detail: 'Tropical Sun sign' } },
    { key: 'vedic', title: 'Vedic Sidereal Zodiac (Jyotish)', data: { name: `${vedic.symbol} ${vedic.name}`, range: vedic.dateRange, description: vedic.description, badge: 'Vedic', detail: 'Sidereal Sun sign' } },
    { key: 'true-sidereal', title: 'True Sidereal / Astronomical Zodiac', data: { name: `${trueSidereal.symbol} ${trueSidereal.name}`, range: trueSidereal.dateRange, description: trueSidereal.description, badge: 'True', detail: 'Constellation-based sign' } },
    { key: 'chinese', title: 'Chinese Zodiac (Shengxiao)', data: { name: chinese.name, range: chinese.range, description: chinese.description, badge: 'China', detail: '12-year animal cycle' } },
    { key: 'bazi', title: 'BaZi (Four Pillars of Destiny)', data: { name: baZi.name, range: baZi.range, description: baZi.description, badge: 'BaZi', detail: 'Year / Month / Day pillars' } },
    { key: 'tibetan', title: 'Tibetan Zodiac', data: { name: tibetan.name, range: tibetan.range, description: tibetan.description, badge: 'Tibetan', detail: '12-animal spiritual cycle' } },
    { key: 'mayan', title: 'Mayan Zodiac', data: { name: mayan.name, range: mayan.range, description: mayan.description, badge: 'Mayan', detail: 'Tzolkin sign' } },
    { key: 'aztec', title: 'Aztec Zodiac', data: { name: aztec.name, range: aztec.range, description: aztec.description, badge: 'Aztec', detail: 'Day sign cycle' } },
    { key: 'native-american', title: 'Native American Earth Astrology', data: { name: native.name, range: native.dateRange, description: native.description, badge: 'Earth', detail: '13-moon cycle' } },
    { key: 'celtic', title: 'Celtic Tree Zodiac', data: { name: celtic.name, range: celtic.dateRange, description: celtic.description, badge: 'Celtic', detail: 'Tree sign' } },
    { key: 'egyptian', title: 'Ancient Egyptian Decan System', data: { name: egyptian.name, range: egyptian.range, description: egyptian.description, badge: 'Egypt', detail: '10-day decan' } },
    { key: 'burmese', title: 'Burmese Zodiac (Mahabote)', data: { name: burmese.name, range: burmese.range, description: burmese.description, badge: 'Burmese', detail: 'Animal year' } }
  ];
}

function renderResults(date) {
  const grid = document.getElementById('result-grid');
  const results = evaluate(date);
  grid.innerHTML = '';

  results.forEach((system) => {
    const card = buildCard(system.key, system.title, system.data);
    grid.appendChild(card);
  });

  document.getElementById('birth-date-display').textContent = formatDate(date);
  document.getElementById('results').classList.remove('hidden');
}

function handleSubmit(event) {
  event.preventDefault();

  const input = document.getElementById('dob');
  const parsedDate = parseDob(input.value);

  if (!parsedDate) {
    alert('Please enter a valid date in DD/MM/YYYY format.');
    input.focus();
    return;
  }

  renderResults(parsedDate);
}

document.getElementById('dob-form').addEventListener('submit', handleSubmit);
