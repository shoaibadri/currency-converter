import { useEffect, useState } from "react";

function usecurrencyinfo(currency) {
    const [data, setdata] = useState({})

    useEffect(() => {
        if (!currency) return;
        const cur = currency.toLowerCase();
        
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${cur}.json`)
            .then((res) => {
                if (!res.ok) throw new Error("Primary API failed");
                return res.json();
            })
            .then((res) => setdata(res[cur] || {}))
            .catch(() => {
                // Fallback URL
                fetch(`https://latest.currency-api.pages.dev/v1/currencies/${cur}.json`)
                    .then((res) => res.json())
                    .then((res) => setdata(res[cur] || {}))
                    .catch((err) => console.error("Error fetching currency data:", err))
            })
    }, [currency])

    return data
}

export default usecurrencyinfo;