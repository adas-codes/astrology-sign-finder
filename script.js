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

const trueSiderealSigns = [
  { name: 'Aries', symbol: '♈', dateRange: 'Apr 15 - May 14', description: 'A sign aligned with the actual tropical-to-sidereal offset and the evolving astronomical sky.', start: [4, 15], end: [5, 14] },
  { name: 'Taurus', symbol: '♉', dateRange: 'May 15 - Jun 14', description: 'Earthy, grounded, and highly anchored to physical reality.', start: [5, 15], end: [6, 14] },
  { name: 'Gemini', symbol: '♊', dateRange: 'Jun 15 - Jul 14', description: 'Intellectually curious, expressive, and dynamic.', start: [6, 15], end: [7, 14] },
  { name: 'Cancer', symbol: '♋', dateRange: 'Jul 15 - Aug 14', description: 'Nurturing and receptive, seeking safety and belonging.', start: [7, 15], end: [8, 14] },
  { name: 'Leo', symbol: '♌', dateRange: 'Aug 15 - Sep 14', description: 'Creative, radiant, and confident under the light of attention.', start: [8, 15], end: [9, 14] },
  { name: 'Virgo', symbol: '♍', dateRange: 'Sep 15 - Oct 14', description: 'Analytical and service-oriented with a refined eye for detail.', start: [9, 15], end: [10, 14] },
  { name: 'Libra', symbol: '♎', dateRange: 'Oct 15 - Nov 14', description: 'Balanced and relational, valuing harmony and fairness.', start: [10, 15], end: [11, 14] },
  { name: 'Scorpio', symbol: '♏', dateRange: 'Nov 15 - Dec 14', description: 'Intense, strategic, and revealing hidden truths.', start: [11, 15], end: [12, 14] },
  { name: 'Sagittarius', symbol: '♐', dateRange: 'Dec 15 - Jan 13', description: 'Adventurous and philosophical, seeking wider horizons.', start: [12, 15], end: [1, 13] },
  { name: 'Capricorn', symbol: '♑', dateRange: 'Jan 14 - Feb 12', description: 'Pragmatic and disciplined, driven toward long-term results.', start: [1, 14], end: [2, 12] },
  { name: 'Aquarius', symbol: '♒', dateRange: 'Feb 13 - Mar 13', description: 'Independent, future-minded, and intellectually original.', start: [2, 13], end: [3, 13] },
  { name: 'Pisces', symbol: '♓', dateRange: 'Mar 14 - Apr 14', description: 'Sensitive and imaginative, with a strong intuition.', start: [3, 14], end: [4, 14] },
  { name: 'Ophiuchus', symbol: '⛎', dateRange: 'Nov 29 - Dec 17', description: 'A constellation-based classification outside the twelve-sign zodiac, often included in astronomical discussions.', start: [11, 29], end: [12, 17] }
];

const chineseZodiac = [
  { name: 'Rat', symbol: '🐭', dateRange: 'Year 2020, 2032, 2044...', description: 'Clever, quick, and adaptable, the Rat starts the zodiac cycle.', start: [1, 1], end: [12, 31] },
  { name: 'Ox', symbol: '🐂', dateRange: 'Year 2021, 2033, 2045...', description: 'Steady, dependable, and patient, the Ox is grounded and resilient.', start: [1, 1], end: [12, 31] },
  { name: 'Tiger', symbol: '🐯', dateRange: 'Year 2022, 2034, 2046...', description: 'Bold, courageous, and dynamic, the Tiger leads with instinct.', start: [1, 1], end: [12, 31] },
  { name: 'Rabbit', symbol: '🐰', dateRange: 'Year 2023, 2035, 2047...', description: 'Gentle, graceful, and thoughtful, the Rabbit is calm and perceptive.', start: [1, 1], end: [12, 31] },
  { name: 'Dragon', symbol: '🐉', dateRange: 'Year 2024, 2036, 2048...', description: 'Charismatic and powerful, the Dragon is ambitious and fiercely alive.', start: [1, 1], end: [12, 31] },
  { name: 'Snake', symbol: '🐍', dateRange: 'Year 2025, 2037, 2049...', description: 'Insightful and introspective, the Snake values wisdom and subtlety.', start: [1, 1], end: [12, 31] },
  { name: 'Horse', symbol: '🐎', dateRange: 'Year 2026, 2038, 2050...', description: 'Energetic, free-spirited, and courageous, the Horse loves motion.', start: [1, 1], end: [12, 31] },
  { name: 'Goat', symbol: '🐐', dateRange: 'Year 2027, 2039, 2051...', description: 'Reflective, artistic, and gentle, the Goat is compassionate and intuitive.', start: [1, 1], end: [12, 31] },
  { name: 'Monkey', symbol: '🐒', dateRange: 'Year 2028, 2040, 2052...', description: 'Clever, playful, and inventive, the Monkey adapts quickly.', start: [1, 1], end: [12, 31] },
  { name: 'Rooster', symbol: '🐓', dateRange: 'Year 2029, 2041, 2053...', description: 'Observant, confident, and sharp-witted, the Rooster stands out.', start: [1, 1], end: [12, 31] },
  { name: 'Dog', symbol: '🐕', dateRange: 'Year 2030, 2042, 2054...', description: 'Loyal, protective, and sincere, the Dog values integrity.', start: [1, 1], end: [12, 31] },
  { name: 'Pig', symbol: '🐖', dateRange: 'Year 2031, 2043, 2055...', description: 'Generous, warm-hearted, and easygoing, the Pig is optimistic.', start: [1, 1], end: [12, 31] }
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

const tibetanSigns = [
  { name: 'Mouse', symbol: '🐭', dateRange: 'Year 2031, 2043...', description: 'The Tibetan animal year echoes the broader East Asian zodiac and emphasizes quick perception.', start: [1, 1], end: [12, 31] },
  { name: 'Ox', symbol: '🐂', dateRange: 'Year 2032, 2044...', description: 'Grounded and patient, the Ox encourages steady persistence.', start: [1, 1], end: [12, 31] },
  { name: 'Tiger', symbol: '🐯', dateRange: 'Year 2033, 2045...', description: 'Bold and propulsive, the Tiger is instinctive and fearless.', start: [1, 1], end: [12, 31] },
  { name: 'Rabbit', symbol: '🐰', dateRange: 'Year 2034, 2046...', description: 'Graceful and tactful, the Rabbit favors calm intelligence.', start: [1, 1], end: [12, 31] },
  { name: 'Dragon', symbol: '🐉', dateRange: 'Year 2035, 2047...', description: 'Dynamic and visionary, linked to movement and luck.', start: [1, 1], end: [12, 31] },
  { name: 'Snake', symbol: '🐍', dateRange: 'Year 2036, 2048...', description: 'Deeply intuitive and reflective, the Snake seeks insight.', start: [1, 1], end: [12, 31] },
  { name: 'Horse', symbol: '🐎', dateRange: 'Year 2037, 2049...', description: 'Energetic and adventurous, the Horse thrives on motion.', start: [1, 1], end: [12, 31] },
  { name: 'Sheep', symbol: '🐑', dateRange: 'Year 2038, 2050...', description: 'Sensitive and artistic, the Sheep favors peace and beauty.', start: [1, 1], end: [12, 31] },
  { name: 'Monkey', symbol: '🐒', dateRange: 'Year 2039, 2051...', description: 'Clever and quick-witted, with strong observational skill.', start: [1, 1], end: [12, 31] },
  { name: 'Rooster', symbol: '🐓', dateRange: 'Year 2040, 2052...', description: 'Watchful and discerning, the Rooster highlights clarity.', start: [1, 1], end: [12, 31] },
  { name: 'Dog', symbol: '🐕', dateRange: 'Year 2041, 2053...', description: 'Loyal and protective, a sign of trustworthiness and devotion.', start: [1, 1], end: [12, 31] },
  { name: 'Pig', symbol: '🐖', dateRange: 'Year 2042, 2054...', description: 'Generous and warm-hearted, the Pig evokes abundance and comfort.', start: [1, 1], end: [12, 31] }
];

const mayanSigns = [
  { name: 'Imix', symbol: '🦎', description: 'The first day sign of the 260-day Tzolkʼin cycle, linked with beginnings and fertile energy.', start: [1, 1], end: [12, 31] },
  { name: 'Ik’', symbol: '⚡', description: 'A wind or air sign associated with momentum and communication.', start: [1, 1], end: [12, 31] },
  { name: 'Ak’b’al', symbol: '🌙', description: 'A night sign linked to intuition and the deeper mysteries of the cosmos.', start: [1, 1], end: [12, 31] },
  { name: 'K’an', symbol: '💎', description: 'A seed or corn sign representing fertility, growth, and sustenance.', start: [1, 1], end: [12, 31] },
  { name: 'Chikchan', symbol: '🐍', description: 'A serpent sign associated with renewal, wisdom, and sacred power.', start: [1, 1], end: [12, 31] },
  { name: 'Kimi', symbol: '🕯️', description: 'A death sign tied to transformation and transition.', start: [1, 1], end: [12, 31] },
  { name: 'Manik’', symbol: '🦌', description: 'A deer sign associated with grace, gentleness, and cyclical rhythms.', start: [1, 1], end: [12, 31] },
  { name: 'Lamat', symbol: '✨', description: 'A Venus sign symbolizing beauty, harmony, and illumination.', start: [1, 1], end: [12, 31] },
  { name: 'Muluk', symbol: '💧', description: 'A water sign associated with rain, flow, and emotional movement.', start: [1, 1], end: [12, 31] },
  { name: 'Ok', symbol: '🌾', description: 'A sign linked to sacrifice, care, and continuity in life cycles.', start: [1, 1], end: [12, 31] },
  { name: 'Chuwen', symbol: '🦉', description: 'A sign of wisdom and cosmic guardianship.', start: [1, 1], end: [12, 31] },
  { name: 'Eb’', symbol: '🌊', description: 'A sign connected to water and the life-giving earth.', start: [1, 1], end: [12, 31] },
  { name: 'B’en', symbol: '🪴', description: 'The green or germination sign, symbolizing growth and emergence.', start: [1, 1], end: [12, 31] },
  { name: 'Ix', symbol: '🦋', description: 'A sign associated with magical transformation and primal energy.', start: [1, 1], end: [12, 31] },
  { name: 'Men', symbol: '🪶', description: 'A sign linked with intellect, memory, and spiritual clarity.', start: [1, 1], end: [12, 31] },
  { name: 'Kib’', symbol: '🌄', description: 'A sign of the sky and the cosmic path ahead.', start: [1, 1], end: [12, 31] },
  { name: 'Kaban', symbol: '🌧️', description: 'A storm sign associated with force, cleansing, and renewal.', start: [1, 1], end: [12, 31] },
  { name: 'Etz’nab’', symbol: '🗡️', description: 'A sign of cutting, transformation, and decisive movement.', start: [1, 1], end: [12, 31] },
  { name: 'Kawak', symbol: '⛰️', description: 'A mountain or earth sign linked to endurance and vitality.', start: [1, 1], end: [12, 31] },
  { name: 'Ajaw', symbol: '☀️', description: 'A solar sign symbolizing authority, vision, and radiant leadership.', start: [1, 1], end: [12, 31] }
];

const aztecSigns = [
  { name: 'Cipactli', symbol: '🐊', description: 'The crocodile day sign, associated with creation and watery beginnings.', start: [1, 1], end: [12, 31] },
  { name: 'Ehecatl', symbol: '🌬️', description: 'The wind sign, linked with movement and breath.', start: [1, 1], end: [12, 31] },
  { name: 'Calli', symbol: '🏠', description: 'The house sign, symbolizing shelter and continuity.', start: [1, 1], end: [12, 31] },
  { name: 'Cuetzpalin', symbol: '🐍', description: 'The lizard sign connected with adaptability and vitality.', start: [1, 1], end: [12, 31] },
  { name: 'Coatl', symbol: '🐍', description: 'The serpent sign, associated with wisdom and the sacred line of ancestors.', start: [1, 1], end: [12, 31] },
  { name: 'Miquiztli', symbol: '☠️', description: 'The death sign, representing transformation and the cycle of endings.', start: [1, 1], end: [12, 31] },
  { name: 'Mazatl', symbol: '🦌', description: 'The deer sign, a symbol of grace, fertility, and guidance.', start: [1, 1], end: [12, 31] },
  { name: 'Tochtli', symbol: '🐇', description: 'The rabbit sign, linked to fertility and quick movement.', start: [1, 1], end: [12, 31] },
  { name: 'Atl', symbol: '💧', description: 'The water sign, signifying flow and nourishment.', start: [1, 1], end: [12, 31] },
  { name: 'Itzcuintli', symbol: '🐕', description: 'The dog sign, emphasizing loyalty and service.', start: [1, 1], end: [12, 31] },
  { name: 'Ozomatli', symbol: '🐵', description: 'The monkey sign, symbolizing playfulness and intelligence.', start: [1, 1], end: [12, 31] },
  { name: 'Malinalli', symbol: '🌿', description: 'The grass sign, associated with resilience and continuity.', start: [1, 1], end: [12, 31] },
  { name: 'Acatl', symbol: '🌾', description: 'The reed sign, standing for endurance and renewal.', start: [1, 1], end: [12, 31] },
  { name: 'Ocelotl', symbol: '🐆', description: 'The jaguar sign, associated with power, instinct, and the night sky.', start: [1, 1], end: [12, 31] },
  { name: 'Cuauhtli', symbol: '🦅', description: 'The eagle sign, carrying themes of vision and sovereignty.', start: [1, 1], end: [12, 31] },
  { name: 'Cozcaquauhtli', symbol: '🦅', description: 'The vulture sign, linked to cosmic perspective and watchfulness.', start: [1, 1], end: [12, 31] },
  { name: 'Ollin', symbol: '🌀', description: 'The movement sign, emphasizing motion, rhythm, and change.', start: [1, 1], end: [12, 31] },
  { name: 'Tecciztli', symbol: '🌙', description: 'The moon sign, tied to cycles, memory, and ritual time.', start: [1, 1], end: [12, 31] },
  { name: 'Quiahuitl', symbol: '🌧️', description: 'The rain sign, connected with fertility, abundance, and renewal.', start: [1, 1], end: [12, 31] },
  { name: 'Xochitl', symbol: '🌼', description: 'The flower sign, associated with beauty, joy, and sacrifice in ritual time.', start: [1, 1], end: [12, 31] }
];

const nativeEarthSigns = [
  { name: 'Wolf', symbol: '🐺', dateRange: 'Jan 1 - Jan 13', description: 'A loyal, instinctive guide for community and courage.', start: [1, 1], end: [1, 13] },
  { name: 'Salmon', symbol: '🐟', dateRange: 'Jan 14 - Jan 26', description: 'A deeply intuitive sign linked with memory and movement.', start: [1, 14], end: [1, 26] },
  { name: 'Falcon', symbol: '🦅', dateRange: 'Jan 27 - Feb 8', description: 'A clear-seeing, forward-moving sign of vision and direction.', start: [1, 27], end: [2, 8] },
  { name: 'Deer', symbol: '🦌', dateRange: 'Feb 9 - Feb 21', description: 'Gentle and observant, the Deer follows intuitive timing.', start: [2, 9], end: [2, 21] },
  { name: 'Otter', symbol: '🦦', dateRange: 'Feb 22 - Mar 5', description: 'Playful and emotionally intelligent, the Otter values connection.', start: [2, 22], end: [3, 5] },
  { name: 'Raven', symbol: '🐦', dateRange: 'Mar 6 - Mar 18', description: 'A messenger sign with a sharp mind and artistic spark.', start: [3, 6], end: [3, 18] },
  { name: 'Owl', symbol: '🦉', dateRange: 'Mar 19 - Mar 31', description: 'Wise and introspective, the Owl blends intuition and perception.', start: [3, 19], end: [3, 31] },
  { name: 'Hawk', symbol: '🦅', dateRange: 'Apr 1 - Apr 13', description: 'A sign of vision, independence, and high perspective.', start: [4, 1], end: [4, 13] },
  { name: 'Bear', symbol: '🐻', dateRange: 'Apr 14 - Apr 26', description: 'A grounded and protective sign with strong instincts.', start: [4, 14], end: [4, 26] },
  { name: 'Goose', symbol: '🪶', dateRange: 'Apr 27 - May 9', description: 'The Goose evokes travel, patterns, and cyclical wisdom.', start: [4, 27], end: [5, 9] },
  { name: 'Beaver', symbol: '🦫', dateRange: 'May 10 - May 22', description: 'A practical and focused sign of persistence and building.', start: [5, 10], end: [5, 22] },
  { name: 'Elk', symbol: '🦌', dateRange: 'May 23 - Jun 4', description: 'Graceful and resilient, the Elk values grounded strength.', start: [5, 23], end: [6, 4] },
  { name: 'Cougar', symbol: '🐆', dateRange: 'Jun 5 - Jun 17', description: 'A powerful sign of instinct, leadership, and autonomy.', start: [6, 5], end: [6, 17] }
];

const egyptianDecans = [
  { name: 'Decan of Isis', symbol: '🌙', description: 'A historical decan connected with protective and cyclical feminine powers.', start: [1, 1], end: [1, 10] },
  { name: 'Decan of Osiris', symbol: '🛡️', description: 'A decan linked with kingship, order, and rebirth after darkness.', start: [1, 11], end: [1, 20] },
  { name: 'Decan of Horus', symbol: '🦅', description: 'A solar-royal decan associated with vision and kingship.', start: [1, 21], end: [1, 31] },
  { name: 'Decan of Thoth', symbol: '🧠', description: 'A decan associated with measurement, knowledge, and cosmic order.', start: [2, 1], end: [2, 10] },
  { name: 'Decan of Hathor', symbol: '🌼', description: 'A decan linked with music, beauty, and love.', start: [2, 11], end: [2, 29] },
  { name: 'Decan of Ra', symbol: '☀️', description: 'A solar decan emphasizing vitality, illumination, and power.', start: [3, 1], end: [3, 10] },
  { name: 'Decan of Anubis', symbol: '🦊', description: 'A funerary decan associated with transformation and the threshold.', start: [3, 11], end: [3, 20] },
  { name: 'Decan of Set', symbol: '🩸', description: 'A decan associated with conflict, momentum, and the desert storm.', start: [3, 21], end: [3, 31] },
  { name: 'Decan of Bastet', symbol: '🐈', description: 'A protective and affectionate decan linked with home and earthly warmth.', start: [4, 1], end: [4, 10] },
  { name: 'Decan of Sekhmet', symbol: '🐅', description: 'A fierce and radiant decan associated with healing and intensity.', start: [4, 11], end: [4, 20] },
  { name: 'Decan of Ptah', symbol: '🧱', description: 'A craft-oriented decan tied to creation and craftsmanship.', start: [4, 21], end: [4, 30] },
  { name: 'Decan of Nut', symbol: '🌌', description: 'A sky goddess decan representing the firmament and celestial cycles.', start: [5, 1], end: [5, 10] }
];

const burmeseSigns = [
  { name: 'Rat', symbol: '🐭', dateRange: 'Year 2020, 2032, 2044...', description: 'A classic animal sign linked with cleverness and attention to timing.', start: [1, 1], end: [12, 31] },
  { name: 'Ox', symbol: '🐂', dateRange: 'Year 2021, 2033, 2045...', description: 'A stable and practical sign of endurance and effort.', start: [1, 1], end: [12, 31] },
  { name: 'Tiger', symbol: '🐯', dateRange: 'Year 2022, 2034, 2046...', description: 'A powerful sign reminiscent of the broader Asian zodiac tradition.', start: [1, 1], end: [12, 31] },
  { name: 'Rabbit', symbol: '🐰', dateRange: 'Year 2023, 2035, 2047...', description: 'Gentle and adaptive, the Rabbit suggests grace under pressure.', start: [1, 1], end: [12, 31] },
  { name: 'Dragon', symbol: '🐉', dateRange: 'Year 2024, 2036, 2048...', description: 'A vibrant sign of courage and expansion.', start: [1, 1], end: [12, 31] },
  { name: 'Snake', symbol: '🐍', dateRange: 'Year 2025, 2037, 2049...', description: 'Elegant and perceptive, with deep intuition and strategic calm.', start: [1, 1], end: [12, 31] },
  { name: 'Horse', symbol: '🐎', dateRange: 'Year 2026, 2038, 2050...', description: 'A dynamic sign of speed, freedom, and movement.', start: [1, 1], end: [12, 31] },
  { name: 'Goat', symbol: '🐐', dateRange: 'Year 2027, 2039, 2051...', description: 'Gentle, artistic, and socially receptive.', start: [1, 1], end: [12, 31] },
  { name: 'Monkey', symbol: '🐒', dateRange: 'Year 2028, 2040, 2052...', description: 'A clever, adaptable sign with wit and curiosity.', start: [1, 1], end: [12, 31] },
  { name: 'Rooster', symbol: '🐓', dateRange: 'Year 2029, 2041, 2053...', description: 'Observant and confident, with a discerning eye.', start: [1, 1], end: [12, 31] },
  { name: 'Dog', symbol: '🐕', dateRange: 'Year 2030, 2042, 2054...', description: 'Loyal and protective, valuing devotion and social trust.', start: [1, 1], end: [12, 31] },
  { name: 'Pig', symbol: '🐖', dateRange: 'Year 2031, 2043, 2055...', description: 'Generous and warm, a sign of comfort, abundance, and compassion.', start: [1, 1], end: [12, 31] }
];

const form = document.getElementById('dob-form');
const results = {
  western: document.getElementById('western-name'),
  westernRange: document.getElementById('western-date-range'),
  westernDescription: document.getElementById('western-description'),
  vedic: document.getElementById('vedic-name'),
  vedicRange: document.getElementById('vedic-date-range'),
  vedicDescription: document.getElementById('vedic-description'),
  trueSidereal: document.getElementById('true-sidereal-name'),
  trueSiderealRange: document.getElementById('true-sidereal-date-range'),
  trueSiderealDescription: document.getElementById('true-sidereal-description'),
  chinese: document.getElementById('chinese-name'),
  chineseRange: document.getElementById('chinese-date-range'),
  chineseDescription: document.getElementById('chinese-description'),
  baZi: document.getElementById('bazi-name'),
  baZiRange: document.getElementById('bazi-date-range'),
  baZiDescription: document.getElementById('bazi-description'),
  tibetan: document.getElementById('tibetan-name'),
  tibetanRange: document.getElementById('tibetan-date-range'),
  tibetanDescription: document.getElementById('tibetan-description'),
  mayan: document.getElementById('mayan-name'),
  mayanRange: document.getElementById('mayan-date-range'),
  mayanDescription: document.getElementById('mayan-description'),
  aztec: document.getElementById('aztec-name'),
  aztecRange: document.getElementById('aztec-date-range'),
  aztecDescription: document.getElementById('aztec-description'),
  native: document.getElementById('native-name'),
  nativeRange: document.getElementById('native-date-range'),
  nativeDescription: document.getElementById('native-description'),
  celtic: document.getElementById('pagan-name'),
  celticRange: document.getElementById('pagan-date-range'),
  celticDescription: document.getElementById('pagan-description'),
  egyptian: document.getElementById('egyptian-name'),
  egyptianRange: document.getElementById('egyptian-date-range'),
  egyptianDescription: document.getElementById('egyptian-description'),
  burmese: document.getElementById('burmese-name'),
  burmeseRange: document.getElementById('burmese-date-range'),
  burmeseDescription: document.getElementById('burmese-description'),
  birthDate: document.getElementById('birth-date-display'),
  resultsSection: document.getElementById('results')
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const dobValue = document.getElementById('dob').value.trim();
  const dateParts = dobValue.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!dateParts) {
    alert('Please enter a valid date of birth in DD/MM/YYYY format.');
    return;
  }

  const [, dayText, monthText, yearText] = dateParts;
  const day = Number(dayText);
  const month = Number(monthText);
  const year = Number(yearText);
  const birthDate = new Date(0);
  birthDate.setHours(12, 0, 0, 0);
  birthDate.setFullYear(year, month - 1, day);

  if (
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day
  ) {
    alert('Please enter a valid date of birth in DD/MM/YYYY format.');
    return;
  }

  const westernResult = findSign(birthDate, westernSigns);
  const vedicResult = findSign(birthDate, vedicSigns);
  const trueSiderealResult = findSign(birthDate, trueSiderealSigns);
  const chineseResult = getChineseAnimal(birthDate);
  const baziResult = getBaZiSummary(birthDate);
  const tibetanResult = getTibetanAnimal(birthDate);
  const mayanResult = getMayanTzolkin(birthDate);
  const aztecResult = getAztecTonalpohualli(birthDate);
  const nativeResult = findSign(birthDate, nativeEarthSigns);
  const celticResult = findSign(birthDate, paganSigns);
  const egyptianResult = findSign(birthDate, egyptianDecans);
  const burmeseResult = getBurmeseAnimal(birthDate);

  results.birthDate.textContent = birthDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  applySignCard('western', westernResult);
  applySignCard('vedic', vedicResult);
  applySignCard('trueSidereal', trueSiderealResult);
  applySignCard('chinese', chineseResult);
  applySignCard('baZi', baziResult);
  applySignCard('tibetan', tibetanResult);
  applySignCard('mayan', mayanResult);
  applySignCard('aztec', aztecResult);
  applySignCard('native', nativeResult);
  applySignCard('celtic', celticResult);
  applySignCard('egyptian', egyptianResult);
  applySignCard('burmese', burmeseResult);

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

  nameEl.textContent = sign.symbol ? `${sign.symbol} ${sign.name}` : sign.name;
  rangeEl.textContent = sign.dateRange || 'Date-based classification';
  descEl.textContent = sign.description;
}

function findSign(date, signSet) {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  for (const sign of signSet) {
    if (isWithinRange(month, day, sign.start, sign.end)) {
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

function getChineseAnimal(date) {
  const year = date.getFullYear();
  const chineseNewYear = getChineseNewYearDate(year);
  const effectiveYear = date >= chineseNewYear ? year : year - 1;
  const animalIndex = ((effectiveYear - 2008) % 12 + 12) % 12;
  const animal = chineseZodiac[animalIndex];

  return {
    ...animal,
    dateRange: 'Chinese New Year boundary',
    description: 'The zodiac year is determined by the Chinese New Year boundary, not by January 1.'
  };
}

function getChineseNewYearDate(year) {
  const boundaries = {
    2020: new Date(2020, 1, 25),
    2021: new Date(2021, 1, 12),
    2022: new Date(2022, 1, 1),
    2023: new Date(2023, 0, 22),
    2024: new Date(2024, 1, 10),
    2025: new Date(2025, 0, 29),
    2026: new Date(2026, 1, 17),
    2027: new Date(2027, 1, 6),
    2028: new Date(2028, 0, 25),
    2029: new Date(2029, 1, 13),
    2030: new Date(2030, 1, 3),
    2031: new Date(2031, 0, 23),
    2032: new Date(2032, 1, 11),
    2033: new Date(2033, 1, 1),
    2034: new Date(2034, 0, 22),
    2035: new Date(2035, 1, 10),
    2036: new Date(2036, 0, 29),
    2037: new Date(2037, 1, 17),
    2038: new Date(2038, 1, 6),
    2039: new Date(2039, 0, 25),
    2040: new Date(2040, 1, 13),
    2041: new Date(2041, 1, 3),
    2042: new Date(2042, 0, 23),
    2043: new Date(2043, 1, 11),
    2044: new Date(2044, 1, 1),
    2045: new Date(2045, 0, 22),
    2046: new Date(2046, 1, 10),
    2047: new Date(2047, 0, 29),
    2048: new Date(2048, 1, 17),
    2049: new Date(2049, 1, 6),
    2050: new Date(2050, 0, 25),
    2051: new Date(2051, 1, 13),
    2052: new Date(2052, 1, 3)
  };

  return boundaries[year] || new Date(year, 1, 15);
}

function getBaZiSummary(date) {
  const stemCycle = ['Ji', 'Geng', 'Xin', 'Ren', 'Gui', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  const branchCycle = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const yearIndex = (date.getFullYear() - 4) % 12;
  const monthIndex = (date.getMonth() + 1) % 12;
  const dayIndex = (date.getDate() + date.getMonth()) % 12;

  const yearPillar = `${stemCycle[(yearIndex + 1) % stemCycle.length]} ${branchCycle[(yearIndex + 1) % branchCycle.length]}`;
  const monthPillar = `${stemCycle[(monthIndex + 3) % stemCycle.length]} ${branchCycle[(monthIndex + 2) % branchCycle.length]}`;
  const dayPillar = `${stemCycle[(dayIndex + 5) % stemCycle.length]} ${branchCycle[(dayIndex + 3) % branchCycle.length]}`;

  return {
    name: 'BaZi',
    symbol: '🪐',
    dateRange: `${yearPillar} / ${monthPillar} / ${dayPillar}`,
    description: 'A simplified Four Pillars summary based on the Gregorian birth date. A full BaZi reading normally also requires birth time and timezone.'
  };
}

function getTibetanAnimal(date) {
  const year = date.getFullYear();
  const animalIndex = ((year - 2008) % 12 + 12) % 12;
  const animal = tibetanSigns[animalIndex];
  return {
    ...animal,
    dateRange: 'Tibetan year animal',
    description: 'The Tibetan animal year is linked to the wider East Asian zodiac traditions and is best interpreted in context with the surrounding astrological calendar.'
  };
}

function getMayanTzolkin(date) {
  const jd = toJulianDay(date);
  const correlationOffset = 584283;
  const tzolkinDay = ((jd + correlationOffset) % 260 + 260) % 260;
  const signIndex = Math.floor(tzolkinDay % 20);
  const tone = Math.floor(tzolkinDay % 13) + 1;
  const sign = mayanSigns[signIndex];

  return {
    name: `${sign.name} (${tone})`,
    symbol: sign.symbol,
    dateRange: `Tone ${tone} • Tzolkʼin day ${tzolkinDay + 1}`,
    description: `${sign.description} This is a simplified Tzolkʼin reading based on a documented correlation constant and day-count method.`
  };
}

function getAztecTonalpohualli(date) {
  const jd = toJulianDay(date);
  const correlationOffset = 584283;
  const day = ((jd + correlationOffset) % 260 + 260) % 260;
  const signIndex = Math.floor(day % 20);
  const number = Math.floor(day % 13) + 1;
  const sign = aztecSigns[signIndex];

  return {
    name: `${sign.name} ${number}`,
    symbol: sign.symbol,
    dateRange: `Number ${number} • 260-day count`,
    description: `${sign.description} The Aztec tonalpohualli uses a 20-day sign and 13-number cycle distinct from the Mayan Tzolkʼin.`
  };
}

function getBurmeseAnimal(date) {
  const year = date.getFullYear();
  const animalIndex = ((year - 2008) % 12 + 12) % 12;
  const animal = burmeseSigns[animalIndex];
  return {
    ...animal,
    dateRange: 'Burmese zodiac animal year',
    description: 'The Burmese Mahabote system uses animal-year classifications that overlap with wider East Asian traditions, but without assuming a complete astrological chart from birth date alone.'
  };
}

function toJulianDay(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;

  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}
