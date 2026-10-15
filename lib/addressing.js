const ADDRESS_WORDS = {
  anna: {
    kannada: 'ಅಣ್ಣ',
    transliteration: 'anna',
    reason: "You chose Anna, a familiar respectful address often used for an older man. Relationships and preferences vary, so use your judgment.",
  },
  akka: {
    kannada: 'ಅಕ್ಕ',
    transliteration: 'akka',
    reason: "You chose Akka, a familiar respectful address often used for an older woman. Relationships and preferences vary, so use your judgment.",
  },
  sir: {
    kannada: 'ಸರ್',
    transliteration: 'sir',
    reason: 'You chose Sir for a formal or official interaction.',
  },
  madam: {
    kannada: 'ಮೇಡಂ',
    transliteration: 'madam',
    reason: 'You chose Madam for a formal interaction.',
  },
};

export const ADDRESS_OPTIONS = [
  { id: 'none', label: 'No added address word' },
  { id: 'anna', label: 'Anna · older man' },
  { id: 'akka', label: 'Akka · older woman' },
  { id: 'sir', label: 'Sir · formal' },
  { id: 'madam', label: 'Madam · formal' },
];

export function applySelectedAddress(payload, addressId) {
  const address = Object.prototype.hasOwnProperty.call(ADDRESS_WORDS, addressId)
    ? ADDRESS_WORDS[addressId]
    : null;
  if (!address || !payload?.kannada_script || payload.kannada_script.includes(address.kannada)) return payload;

  const existingTip = payload.cultural_tip?.trim();
  return {
    ...payload,
    kannada_script: `${address.kannada}, ${payload.kannada_script}`,
    transliteration: payload.transliteration
      ? `${address.transliteration}, ${payload.transliteration}`
      : payload.transliteration,
    cultural_tip: [existingTip, address.reason].filter(Boolean).join(' '),
  };
}