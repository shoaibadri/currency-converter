import React from 'react'
import { getCurrencyDetails } from '../utils/currencyData'

function MultiCurrencyRates({ baseCurrency, baseAmount, rates, onSelectTarget }) {
  const popularCurrencies = ['usd', 'eur', 'gbp', 'inr', 'jpy', 'cad', 'aud', 'aed', 'chf', 'sgd', 'sar', 'cny']
  
  // Filter out the current base currency and take 6 items
  const targets = popularCurrencies.filter(c => c !== baseCurrency.toLowerCase()).slice(0, 6)

  return (
    <div className="glass-panel rounded-2xl p-4 flex flex-col transition-colors duration-300">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-bold font-display text-gray-900 dark:text-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-fuchsia-600 dark:bg-fuchsia-400 shadow-[0_0_6px_#e879f9]"></span>
            Live FX Comparison Matrix
          </h3>
          <p className="text-[11px] text-purple-700 dark:text-purple-300/70 mt-0.5">
            1 {baseCurrency.toUpperCase()} across major currencies
          </p>
        </div>
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/50 border border-purple-300 dark:border-purple-500/30 text-purple-800 dark:text-purple-200">
          ⚡ 6 Pairs
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {targets.map((code) => {
          const meta = getCurrencyDetails(code)
          const rate = rates && rates[code] ? Number(rates[code]) : null
          const convertedVal = rate ? (baseAmount * rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }) : '---'

          return (
            <div
              key={code}
              onClick={() => onSelectTarget && onSelectTarget(code)}
              className="glass-card-inner rounded-xl p-2.5 flex items-center justify-between cursor-pointer hover:border-purple-500 dark:hover:border-purple-400/60 hover:bg-purple-100/60 dark:hover:bg-purple-900/30 transition-all duration-150 group shadow-sm"
              title={`Click to convert to ${code.toUpperCase()}`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-lg select-none">{meta.flag}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-xs text-gray-900 dark:text-white uppercase group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                      {code}
                    </span>
                    <span className="text-[10px] text-purple-700/70 dark:text-purple-400/60 truncate hidden sm:inline">
                      {meta.name}
                    </span>
                  </div>
                  <div className="text-[9px] font-mono text-purple-600 dark:text-purple-300/60">
                    1 {baseCurrency.toUpperCase()} = {rate ? rate.toFixed(4) : '...'}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono font-bold text-xs text-purple-950 dark:text-purple-100 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-300 transition-colors">
                  {meta.symbol} {convertedVal}
                </div>
                <div className="text-[9px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center justify-end gap-0.5">
                  <span>●</span>
                  <span>Live</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MultiCurrencyRates

