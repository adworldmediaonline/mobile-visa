export const COUNTRIES = [
  { label: 'India', value: 'IN', flag: '🇮🇳' },
  { label: 'Australia', value: 'AU', flag: '🇦🇺' },
  { label: 'United States', value: 'US', flag: '🇺🇸' },
  { label: 'United Kingdom', value: 'GB', flag: '🇬🇧' },
  { label: 'Canada', value: 'CA', flag: '🇨🇦' },
  { label: 'Germany', value: 'DE', flag: '🇩🇪' },
  { label: 'France', value: 'FR', flag: '🇫🇷' },
  { label: 'Italy', value: 'IT', flag: '🇮🇹' },
  { label: 'Spain', value: 'ES', flag: '🇪🇸' },
  { label: 'Netherlands', value: 'NL', flag: '🇳🇱' },
  { label: 'Switzerland', value: 'CH', flag: '🇨🇭' },
  { label: 'Sweden', value: 'SE', flag: '🇸🇪' },
  { label: 'Norway', value: 'NO', flag: '🇳🇴' },
  { label: 'Denmark', value: 'DK', flag: '🇩🇰' },
  { label: 'Finland', value: 'FI', flag: '🇫🇮' },
  { label: 'Japan', value: 'JP', flag: '🇯🇵' },
  { label: 'Singapore', value: 'SG', flag: '🇸🇬' },
  { label: 'South Korea', value: 'KR', flag: '🇰🇷' },
  { label: 'Thailand', value: 'TH', flag: '🇹🇭' },
  { label: 'Malaysia', value: 'MY', flag: '🇲🇾' },
  { label: 'Indonesia', value: 'ID', flag: '🇮🇩' },
  { label: 'Philippines', value: 'PH', flag: '🇵🇭' },
  { label: 'Vietnam', value: 'VN', flag: '🇻🇳' },
  { label: 'China', value: 'CN', flag: '🇨🇳' },
  { label: 'Hong Kong', value: 'HK', flag: '🇭🇰' },
  { label: 'Taiwan', value: 'TW', flag: '🇹🇼' },
  { label: 'New Zealand', value: 'NZ', flag: '🇳🇿' },
  { label: 'South Africa', value: 'ZA', flag: '🇿🇦' },
  { label: 'Brazil', value: 'BR', flag: '🇧🇷' },
  { label: 'Argentina', value: 'AR', flag: '🇦🇷' },
  { label: 'Chile', value: 'CL', flag: '🇨🇱' },
  { label: 'Mexico', value: 'MX', flag: '🇲🇽' },
  { label: 'Peru', value: 'PE', flag: '🇵🇪' },
  { label: 'Colombia', value: 'CO', flag: '🇨🇴' },
  { label: 'UAE', value: 'AE', flag: '🇦🇪' },
  { label: 'Saudi Arabia', value: 'SA', flag: '🇸🇦' },
  { label: 'Qatar', value: 'QA', flag: '🇶🇦' },
  { label: 'Kuwait', value: 'KW', flag: '🇰🇼' },
  { label: 'Bahrain', value: 'BH', flag: '🇧🇭' },
  { label: 'Oman', value: 'OM', flag: '🇴🇲' },
  { label: 'Israel', value: 'IL', flag: '🇮🇱' },
  { label: 'Turkey', value: 'TR', flag: '🇹🇷' },
  { label: 'Russia', value: 'RU', flag: '🇷🇺' },
  { label: 'Ukraine', value: 'UA', flag: '🇺🇦' },
  { label: 'Poland', value: 'PL', flag: '🇵🇱' },
  { label: 'Czech Republic', value: 'CZ', flag: '🇨🇿' },
  { label: 'Hungary', value: 'HU', flag: '🇭🇺' },
  { label: 'Austria', value: 'AT', flag: '🇦🇹' },
  { label: 'Belgium', value: 'BE', flag: '🇧🇪' },
  { label: 'Portugal', value: 'PT', flag: '🇵🇹' },
  { label: 'Greece', value: 'GR', flag: '🇬🇷' },
  { label: 'Ireland', value: 'IE', flag: '🇮🇪' },
  { label: 'Luxembourg', value: 'LU', flag: '🇱🇺' },
];

export const POPULAR_DESTINATIONS = [
  { label: 'India', value: 'IN', flag: '🇮🇳' },
  { label: 'Indonesia', value: 'ID', flag: '🇮🇩' },
  { label: 'Malaysia', value: 'MY', flag: '🇲🇾' },
  { label: 'Thailand', value: 'TH', flag: '🇹🇭' },
  { label: 'United Kingdom', value: 'GB', flag: '🇬🇧' },
  { label: 'United States', value: 'US', flag: '🇺🇸' },
];

export const EMPLOYMENT_STATUS_OPTIONS = [
  {
    label: 'Employed - Less than 2 years in current role',
    value: 'employed_less_2_years',
  },
  {
    label: 'Employed - More than 2 years in current role',
    value: 'employed_more_2_years',
  },
  { label: 'Student (With proof)', value: 'student' },
  { label: 'Retired (With proof of pension)', value: 'retired' },
  { label: 'Homemaker (Partner-dependent income)', value: 'homemaker' },
  { label: 'Unemployed', value: 'unemployed' },
  { label: 'Unemployed (Minor not in school yet)', value: 'unemployed_minor' },
  {
    label: 'Unemployed (parent - dependent income)',
    value: 'unemployed_dependent',
  },
];

export const MONTHLY_INCOME_OPTIONS = [
  { label: 'No income', value: 'no_income' },
  { label: 'Less than 1000 USD monthly', value: 'less_1000' },
  { label: '1000 - 2500 USD monthly', value: '1000_2500' },
  { label: 'Over 2500 USD monthly', value: 'over_2500' },
  { label: 'Partner-dependent income', value: 'partner_dependent' },
  { label: 'Income dependent (child/student)', value: 'income_dependent' },
];

export const TRAVEL_HISTORY_OPTIONS = [
  {
    label: "No, I haven't left my home country",
    value: 'no_travel',
  },
  {
    label:
      'Yes, in the last 5 years, I have traveled out of my home country and returned.',
    value: 'recent_travel',
  },
  {
    label:
      'Yes, in the last 5 years, I have traveled or have a visa for at least 1 of these countries - USA, Canada, Australia, UK, all Schengen countries.',
    value: 'advanced_travel',
  },
];

export const VISA_APPLICATION_HISTORY_OPTIONS = [
  { label: 'No', value: 'no' },
  { label: 'Yes', value: 'yes' },
  {
    label: 'I was denied this visa less than 12 months ago.',
    value: 'denied_recent',
  },
  { label: 'I was denied this visa over 12 months ago', value: 'denied_old' },
];
