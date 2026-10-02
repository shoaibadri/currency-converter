import React from 'react'
import { getCurrencyDetails } from '../utils/currencyData'

function ConversionHistory({ history = [], onClear, onReuse }) {
  if (!history || history.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-4 flex flex-col items-center justify-center text-center min-h-[110px] transition-colors duration-300">
        <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/70 border border-purple-300 dark:border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h4 className="text-xs font-bold text-gray-900 dark:text-purple-200">No Conversions Yet</h4>
        <p className="text-[10px] text-purple-700/70 dark:text-purple-400/60 mt-0.5 max-w-xs">
          Click <span className="text-purple-600 dark:text-purple-300 font-semibold">Convert</span> to record conversions here.
        </p>
      </div>
    )
  }

  return (
    <div className="glass-panel rounded-2xl p-4 flex flex-col transition-colors duration-300">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold font-display text-gray-900 dark:text-white flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400 shadow-[0_0_6px_#c084fc]"></span>
          Recent Conversion Log
        </h3>
        <button
          type="button"
          onClick={onClear}
          className="text-[10px] text-purple-600 dark:text-purple-400/70 hover:text-red-500 dark:hover:text-red-400 font-medium transition-colors cursor-pointer flex items-center gap-1"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Clear
        </button>
      </div>

      <div className="space-y-1.5 overflow-y-auto max-h-[140px] pr-1">
        {history.map((item) => {
          const fromMeta = getCurrencyDetails(item.from)

          return (
            <div
              key={item.id}
              className="glass-card-inner rounded-lg p-2 flex items-center justify-between text-xs hover:border-purple-500 dark:hover:border-purple-400/50 transition-all duration-150 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{fromMeta.flag}</span>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-1 text-[11px]">
                    <span>{item.amount} {item.from.toUpperCase()}</span>
                    <span className="text-purple-600 dark:text-purple-400">→</span>
                    <span className="text-fuchsia-600 dark:text-fuchsia-300 font-bold">{item.convertedAmount} {item.to.toUpperCase()}</span>
                  </div>
                  <div className="text-[9px] text-purple-600/70 dark:text-purple-400/50 font-mono">
                    {item.time} • Rate: {item.rate}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onReuse && onReuse(item)}
                className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950/80 hover:bg-purple-200 dark:hover:bg-purple-800/80 border border-purple-300 dark:border-purple-500/30 text-purple-900 dark:text-purple-200 text-[10px] font-bold transition-all hover:scale-105"
                title="Reuse this conversion"
              >
                Reuse
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ConversionHistory


