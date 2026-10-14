/* Business details still to be confirmed by the client — edit here only */
export const SITE_CONFIG = {
  // International format without "+" or spaces, e.g. 61412345678
  whatsappNumber: '61400000000',
  whatsappMessage: 'Hi CRG, I would like to ask about a roof inspection.',
  phoneDisplay: '1300 417 246',
  web3formsKey: '05183041-090d-483d-a39a-db68839d52fb',
  // Official profile URLs; every [data-social] link on the site uses these
  instagramUrl: '',
  facebookUrl: ''
};

/* Pages that have no navbar link of their own, mapped to the item to highlight */
export const NAV_ALIASES = {};

/* Each issue shows its own example in the pop-up's "Anything else?" box */
export const INSPECTION_ISSUES = [
  { label: 'Free roof inspection', example: 'e.g. Roof is about 20 years old and I’d like it checked' },
  { label: 'Storm or hail damage', example: 'e.g. Dented sheets after last week’s hailstorm' },
  { label: 'Leak or rust', example: 'e.g. Water stain on the ceiling after heavy rain' },
  { label: 'Need a new roof', example: 'e.g. Old tin roof with rust, looking to replace it' },
  { label: 'Insurance claim', example: 'e.g. Claim lodged, insurer has asked for a roof report' },
  { label: 'Not sure', example: 'e.g. Something doesn’t look right from the ground' }
];

export const DEFAULT_EXAMPLE = 'e.g. Single-storey house, metal roof, noticed a leak in the kitchen';

/* Suggestions for the pop-up's suburb field */
export const QLD_AREAS = [
  'Brisbane', 'Gold Coast', 'Sunshine Coast', 'Ipswich', 'Logan', 'Redland City',
  'Moreton Bay', 'Caboolture', 'Springfield', 'Toowoomba', 'Gympie', 'Noosa',
  'Bundaberg', 'Hervey Bay', 'Gladstone', 'Rockhampton', 'Mackay', 'Townsville', 'Cairns'
];
