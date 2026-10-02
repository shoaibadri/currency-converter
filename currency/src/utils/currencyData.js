export const CURRENCY_METADATA = {
  usd: { name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  eur: { name: "Euro", symbol: "€", flag: "🇪🇺" },
  inr: { name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  gbp: { name: "British Pound", symbol: "£", flag: "🇬🇧" },
  jpy: { name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  cad: { name: "Canadian Dollar", symbol: "CA$", flag: "🇨🇦" },
  aud: { name: "Australian Dollar", symbol: "AU$", flag: "🇦🇺" },
  chf: { name: "Swiss Franc", symbol: "CHF", flag: "🇨🇭" },
  cny: { name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
  aed: { name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪" },
  sgd: { name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬" },
  nzd: { name: "New Zealand Dollar", symbol: "NZ$", flag: "🇳🇿" },
  sar: { name: "Saudi Riyal", symbol: "﷼", flag: "🇸🇦" },
  kwd: { name: "Kuwaiti Dinar", symbol: "KD", flag: "🇰🇼" },
  qar: { name: "Qatari Riyal", symbol: "QR", flag: "🇶🇦" },
  omr: { name: "Omani Rial", symbol: "OMR", flag: "🇴🇲" },
  bhd: { name: "Bahraini Dinar", symbol: "BD", flag: "🇧🇭" },
  brl: { name: "Brazilian Real", symbol: "R$", flag: "🇧🇷" },
  zar: { name: "South African Rand", symbol: "R", flag: "🇿🇦" },
  rub: { name: "Russian Ruble", symbol: "₽", flag: "🇷🇺" },
  krw: { name: "South Korean Won", symbol: "₩", flag: "🇰🇷" },
  try: { name: "Turkish Lira", symbol: "₺", flag: "🇹🇷" },
  myr: { name: "Malaysian Ringgit", symbol: "RM", flag: "🇲🇾" },
  thb: { name: "Thai Baht", symbol: "฿", flag: "🇹🇭" },
  idr: { name: "Indonesian Rupiah", symbol: "Rp", flag: "🇮🇩" },
  mxn: { name: "Mexican Peso", symbol: "Mex$", flag: "🇲🇽" },
  btc: { name: "Bitcoin", symbol: "₿", flag: "⚡" },
  eth: { name: "Ethereum", symbol: "Ξ", flag: "⟠" },
};

export const getCurrencyDetails = (code) => {
  if (!code) return { name: "", symbol: "", flag: "🌐" };
  const lower = code.toLowerCase();
  return (
    CURRENCY_METADATA[lower] || {
      name: code.toUpperCase(),
      symbol: code.toUpperCase(),
      flag: "🌐",
    }
  );
};
