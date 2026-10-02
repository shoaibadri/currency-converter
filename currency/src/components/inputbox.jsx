import React, { useId } from 'react'
import { getCurrencyDetails } from '../utils/currencyData'

function InputBox({
    label,
    amount,
    onamountchange,
    oncurrencychange,
    currencyoption = [],
    selectcurrency = 'usd',
    amountdisable = false,
    currencydisable = false,
    className = "",
}) {
    const amountinputid = useId()
    const currencyMeta = getCurrencyDetails(selectcurrency)

    return (
        <div className={`glass-card-inner rounded-xl p-3 sm:p-3.5 transition-all duration-300 ${className}`}>
            {/* Top Label & Currency Header */}
            <div className="flex justify-between items-center mb-1.5">
                <label 
                    htmlFor={amountinputid} 
                    className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300/90"
                >
                    <span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400 shadow-[0_0_6px_#c084fc]"></span>
                    <span>{label}</span>
                    {currencyMeta.name && (
                        <span className="text-[10px] lowercase font-medium text-purple-600/70 dark:text-purple-400/60 hidden sm:inline">
                            ({currencyMeta.name})
                        </span>
                    )}
                </label>

                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300/80 flex items-center gap-1.5">
                    <span className="text-sm">{currencyMeta.flag}</span>
                    <span>{selectcurrency.toUpperCase()}</span>
                </span>
            </div>

            {/* Input & Dropdown Row */}
            <div className="flex items-center justify-between gap-2.5">
                <div className="flex-1 min-w-0 flex items-center gap-1.5">
                    <span className="text-lg sm:text-xl font-bold text-purple-600/70 dark:text-purple-400/60 select-none">
                        {currencyMeta.symbol !== selectcurrency.toUpperCase() ? currencyMeta.symbol : ''}
                    </span>
                    <input
                        id={amountinputid}
                        className="w-full bg-transparent text-xl sm:text-2xl font-display font-bold text-gray-900 dark:text-white placeholder-purple-400/40 dark:placeholder-purple-400/25 outline-none tracking-tight transition-all disabled:text-purple-900/80 dark:disabled:text-purple-200/90"
                        type="number"
                        placeholder="0.00"
                        disabled={amountdisable}
                        value={amount === 0 ? '' : amount}
                        onChange={(e) => onamountchange && onamountchange(Number(e.target.value))}
                        step="any"
                    />
                </div>

                <div className="flex-shrink-0">
                    <div className="relative">
                        <select
                            className="appearance-none bg-white/90 dark:bg-[#1c1236]/95 hover:bg-purple-50 dark:hover:bg-[#26184a] text-purple-950 dark:text-purple-100 font-bold text-xs sm:text-sm border border-purple-300 dark:border-purple-500/40 hover:border-purple-500 dark:hover:border-purple-400/70 rounded-lg px-3 py-1.5 pr-7 cursor-pointer outline-none focus:ring-2 focus:ring-purple-500/50 shadow-sm transition-all uppercase"
                            value={selectcurrency}
                            onChange={(e) => oncurrencychange && oncurrencychange(e.target.value)}
                            disabled={currencydisable}
                        >
                            {currencyoption.map((currency) => {
                                const meta = getCurrencyDetails(currency)
                                return (
                                    <option 
                                        key={currency} 
                                        value={currency} 
                                        className="bg-white dark:bg-[#120b24] text-gray-900 dark:text-purple-200 py-1"
                                    >
                                        {currency.toUpperCase()} {meta.name ? `- ${meta.name}` : ''}
                                    </option>
                                )
                            })}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-purple-600 dark:text-purple-300">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InputBox;


