import React, { useState, useEffect } from 'react'
import { InputBox, MultiCurrencyRates, ConversionHistory } from './components'
import usecurrencyinfo from './hook/usecurrency.js'
import bgDark from './assets/bg.jpg'
import { getCurrencyDetails } from './utils/currencyData'

function App() {
    const [amount, setAmount] = useState(100)
    const [from, setFrom] = useState('usd')
    const [to, setTo] = useState('inr')
    const [convertedAmount, setConvertedAmount] = useState(0)
    const [isSwapping, setIsSwapping] = useState(false)
    const [copied, setCopied] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(true)
    const [history, setHistory] = useState([
        { id: 1, from: 'usd', to: 'inr', amount: 100, convertedAmount: 8654.50, rate: '86.5450', time: 'Just now' }
    ])

    const currencyInfo = usecurrencyinfo(from)
    const options = Object.keys(currencyInfo)

    // Sync dark class on document element
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDarkMode])

    // Convert only when user clicks Convert
    const convert = () => {
        if (currencyInfo && currencyInfo[to]) {
            const rate = Number(currencyInfo[to])
            const result = amount * rate
            const finalVal = Number(result.toFixed(4))
            setConvertedAmount(finalVal)

            // Add to history log
            const newHistoryItem = {
                id: Date.now(),
                from,
                to,
                amount,
                convertedAmount: finalVal,
                rate: rate.toFixed(4),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            }
            setHistory((prev) => [newHistoryItem, ...prev.slice(0, 5)])
        }
    }

    const swap = () => {
        setIsSwapping(true)
        setTimeout(() => setIsSwapping(false), 350)

        const prevFrom = from
        const prevTo = to
        const prevAmount = amount
        const prevConverted = convertedAmount

        setFrom(prevTo)
        setTo(prevFrom)
        setConvertedAmount(prevAmount)
        setAmount(prevConverted || 100)
    }

    const copyToClipboard = () => {
        if (!convertedAmount) return
        const text = `${amount} ${from.toUpperCase()} = ${convertedAmount} ${to.toUpperCase()}`
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleReuseHistory = (item) => {
        setFrom(item.from)
        setTo(item.to)
        setAmount(item.amount)
        setConvertedAmount(item.convertedAmount)
    }

    const currentRate = currencyInfo && currencyInfo[to] ? Number(currencyInfo[to]).toFixed(4) : null
    const inverseRate = currentRate && Number(currentRate) > 0 ? (1 / Number(currentRate)).toFixed(6) : null

    const popularPairs = [
        { from: 'usd', to: 'inr', label: 'USD → INR' },
        { from: 'usd', to: 'eur', label: 'USD → EUR' },
        { from: 'eur', to: 'usd', label: 'EUR → USD' },
        { from: 'gbp', to: 'usd', label: 'GBP → USD' },
        { from: 'usd', to: 'aed', label: 'USD → AED' },
        { from: 'usd', to: 'jpy', label: 'USD → JPY' },
    ]

    const quickAmounts = [10, 50, 100, 500, 1000]

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            <div 
                className="min-h-screen w-full relative flex flex-col justify-center items-center px-4 sm:px-6 py-6 sm:py-8 overflow-x-hidden font-sans transition-colors duration-500"
                style={{
                    backgroundColor: isDarkMode ? '#06040a' : '#f5f3ff',
                    backgroundImage: isDarkMode 
                        ? `radial-gradient(circle at 50% 15%, rgba(147, 51, 234, 0.16), transparent 60%), radial-gradient(circle at 85% 85%, rgba(217, 70, 239, 0.12), transparent 50%), url(${bgDark})`
                        : `radial-gradient(circle at 50% 10%, rgba(192, 132, 252, 0.25), transparent 60%), radial-gradient(circle at 90% 90%, rgba(232, 121, 249, 0.15), transparent 50%)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                }}
            >
                {/* Dark Mode Ambient Overlays */}
                {isDarkMode && (
                    <>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-[#0b0618]/85 to-black/95 backdrop-blur-[2px] pointer-events-none" />
                        <div className="absolute top-1/6 left-1/5 w-72 h-72 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
                        <div className="absolute bottom-1/6 right-1/5 w-80 h-80 bg-fuchsia-600/12 rounded-full blur-[110px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '3s' }} />
                    </>
                )}

                {/* Light Mode Soft Ambient Glows */}
                {!isDarkMode && (
                    <>
                        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300/30 rounded-full blur-[90px] pointer-events-none" />
                        <div className="absolute bottom-10 right-10 w-80 h-80 bg-fuchsia-200/40 rounded-full blur-[100px] pointer-events-none" />
                    </>
                )}

                {/* DASHBOARD CONTAINER */}
                <div className="w-full max-w-5xl z-10 flex flex-col items-center">
                    
                    {/* TOP NAVBAR: Theme Switcher & Status Badge */}
                    <div className="w-full flex items-center justify-between mb-4">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/70 border border-purple-300 dark:border-purple-500/40 text-purple-900 dark:text-purple-200 text-xs font-semibold uppercase tracking-wider shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]"></span>
                            <span>Live FX Rates</span>
                        </div>

                        {/* Theme Toggle Button */}
                        <button
                            type="button"
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1b1136] border border-purple-300 dark:border-purple-500/40 text-purple-900 dark:text-purple-200 text-xs font-bold flex items-center gap-2 hover:border-purple-500 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
                            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {isDarkMode ? (
                                <>
                                    <span className="text-amber-300 text-sm">☀️</span>
                                    <span>Light Mode</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-purple-600 text-sm">🌙</span>
                                    <span>Dark Mode</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* App Title Header */}
                    <div className="text-center mb-4 max-w-xl">
                        <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-gray-900 dark:text-transparent dark:bg-gradient-to-r dark:from-white dark:via-purple-100 dark:to-fuchsia-300 dark:bg-clip-text">
                            Currency Converter
                        </h1>
                        <p className="text-purple-800/80 dark:text-purple-300/70 text-xs sm:text-sm mt-1">
                            Simple, fast currency exchange with real-time global market rates
                        </p>
                    </div>

                    {/* Popular Quick Pairs Bar */}
                    <div className="w-full flex items-center justify-center gap-1.5 flex-wrap mb-5 max-w-2xl">
                        {popularPairs.map((pair) => (
                            <button
                                key={pair.label}
                                type="button"
                                onClick={() => {
                                    setFrom(pair.from)
                                    setTo(pair.to)
                                }}
                                className={`text-[11px] px-3 py-1 rounded-lg border transition-all duration-150 font-bold cursor-pointer ${
                                    from === pair.from && to === pair.to
                                        ? 'bg-purple-600 text-white border-purple-500 shadow-md scale-105'
                                        : 'bg-white/80 dark:bg-[#120a24]/80 text-purple-900 dark:text-purple-300/80 border-purple-200 dark:border-purple-800/40 hover:bg-purple-100 dark:hover:bg-purple-900/50 hover:border-purple-400'
                                }`}
                            >
                                {pair.label}
                            </button>
                        ))}
                    </div>

                    {/* 2-COLUMN DASHBOARD GRID WITH SPACED GAP */}
                    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                        
                        {/* LEFT COLUMN: Main Converter Card (Span 7) */}
                        <div className="lg:col-span-7 flex flex-col gap-4">
                            <div className="w-full glass-panel rounded-2xl p-4 sm:p-5 relative overflow-hidden transition-colors duration-300">
                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault()
                                        convert()
                                    }}
                                >
                                    {/* 1. FROM INPUT BOX */}
                                    <div className="w-full mb-2">
                                        <InputBox
                                            label="You Pay"
                                            amount={amount}
                                            currencyoption={options}
                                            oncurrencychange={(currency) => setFrom(currency)}
                                            selectcurrency={from}
                                            onamountchange={(val) => setAmount(val)}
                                        />
                                    </div>

                                    {/* Quick Amount Presets */}
                                    <div className="flex items-center justify-between px-2 py-1 mb-2 bg-purple-50/80 dark:bg-[#120a26]/50 rounded-lg border border-purple-200 dark:border-purple-900/30 text-xs">
                                        <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300/70">Quick Amounts:</span>
                                        <div className="flex gap-1.5">
                                            {quickAmounts.map((preset) => (
                                                <button
                                                    key={preset}
                                                    type="button"
                                                    onClick={() => setAmount(preset)}
                                                    className={`text-[11px] px-2 py-0.5 rounded-md font-bold transition-all ${
                                                        amount === preset 
                                                            ? 'bg-purple-600 text-white shadow-sm' 
                                                            : 'bg-white dark:bg-purple-950/40 text-purple-900 dark:text-purple-300/70 hover:bg-purple-200 dark:hover:bg-purple-900/50'
                                                    }`}
                                                >
                                                    ${preset}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* SWAP BUTTON */}
                                    <div className="relative w-full h-8 flex items-center justify-center my-1 z-20">
                                        <div className="absolute inset-x-0 h-[1px] bg-purple-200 dark:bg-purple-500/30" />
                                        <button
                                            type="button"
                                            className={`swap-btn-glow relative group px-4 py-1 rounded-full text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 border border-purple-400/50 cursor-pointer shadow-md ${
                                                isSwapping ? 'rotate-180 scale-110' : 'hover:scale-105 active:scale-95'
                                            }`}
                                            onClick={swap}
                                            title="Swap Currencies"
                                        >
                                            <svg 
                                                className={`w-3.5 h-3.5 transition-transform duration-300 ${isSwapping ? 'rotate-180 text-fuchsia-300' : 'group-hover:rotate-180'}`} 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                            </svg>
                                            <span>Swap</span>
                                        </button>
                                    </div>

                                    {/* 2. TO INPUT BOX */}
                                    <div className="w-full mt-1 mb-3">
                                        <InputBox
                                            label="You Receive"
                                            amount={convertedAmount}
                                            currencyoption={options}
                                            oncurrencychange={(currency) => setTo(currency)}
                                            selectcurrency={to}
                                            amountdisable
                                        />
                                    </div>

                                    {/* CONVERSION RESULT BOX */}
                                    {convertedAmount > 0 && (
                                        <div className="mb-3 p-3 rounded-xl bg-purple-100/90 dark:bg-gradient-to-r dark:from-purple-950/70 dark:to-fuchsia-950/50 border border-purple-300 dark:border-purple-500/40 flex items-center justify-between shadow-sm">
                                            <div>
                                                <div className="text-[10px] font-bold text-purple-700 dark:text-purple-300/80 uppercase">
                                                    Converted Amount
                                                </div>
                                                <div className="text-lg font-extrabold font-display text-purple-950 dark:text-white mt-0.5">
                                                    {amount} {from.toUpperCase()} = <span className="text-purple-700 dark:text-fuchsia-300">{convertedAmount} {to.toUpperCase()}</span>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={copyToClipboard}
                                                className="px-3 py-1.5 rounded-lg bg-white dark:bg-purple-900/60 hover:bg-purple-50 text-purple-900 dark:text-purple-200 border border-purple-300 dark:border-purple-500/40 text-xs font-bold flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-sm"
                                            >
                                                {copied ? (
                                                    <>
                                                        <span className="text-emerald-600 dark:text-emerald-400">✓</span>
                                                        <span>Copied!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-3.5 h-3.5 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                        <span>Copy</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    )}

                                    {/* LIVE RATE BADGE */}
                                    {currentRate && (
                                        <div className="mb-4 px-3 py-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/25 flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-1.5 text-purple-800 dark:text-purple-300/80">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]"></span>
                                                <span className="font-semibold">Exchange Rate:</span>
                                            </div>
                                            <span className="font-mono font-bold text-purple-950 dark:text-purple-100">
                                                1 {from.toUpperCase()} = {currentRate} {to.toUpperCase()}
                                            </span>
                                        </div>
                                    )}

                                    {/* CONVERT CTA BUTTON */}
                                    <button
                                        type="submit"
                                        className="w-full purple-glow-btn text-white font-bold py-3.5 px-5 rounded-xl text-base tracking-wide flex items-center justify-center gap-2 cursor-pointer border border-purple-300/40 shadow-lg"
                                    >
                                        <span>Convert {from.toUpperCase()} to {to.toUpperCase()}</span>
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Multi-Currency Rates & History Log (Span 5) */}
                        <div className="lg:col-span-5 flex flex-col gap-5">
                            {/* Live FX Matrix */}
                            <MultiCurrencyRates
                                baseCurrency={from}
                                baseAmount={amount}
                                rates={currencyInfo}
                                onSelectTarget={(targetCode) => setTo(targetCode)}
                            />

                            {/* Recent Conversions Log */}
                            <ConversionHistory
                                history={history}
                                onClear={() => setHistory([])}
                                onReuse={handleReuseHistory}
                            />
                        </div>
                    </div>

                    {/* Simple Clean Footer */}
                    <div className="mt-6 text-center text-xs text-purple-700/60 dark:text-purple-400/50 flex items-center gap-2">
                        <span>⚡ Real-Time Global Currency Engine</span>
                        <span>•</span>
                        <span>Black & Purple Theme</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
