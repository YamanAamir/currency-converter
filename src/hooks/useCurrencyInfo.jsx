import { useEffect, useState } from 'react';

function useCurrencyInfo(currency) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://v6.exchangerate-api.com/v6/68af974f193b4a69c0966521/latest/${currency}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(res => {
                setData(res.conversion_rates);
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
            });
    }, [currency]);

    return { data, error };
}

export default useCurrencyInfo;
