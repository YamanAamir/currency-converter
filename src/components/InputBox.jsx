import React, { useId, useState, useEffect } from 'react';
import useCurrencyInfo from '../hooks/useCurrencyInfo';

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    selectCurrency = "USD",
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {
    const amountInputId = useId();
    const [currency, setCurrency] = useState(selectCurrency);
    const { data, error } = useCurrencyInfo(currency);

    useEffect(() => {
        setCurrency(selectCurrency);
    }, [selectCurrency]);

    const handleCurrencyChange = (e) => {
        const newCurrency = e.target.value;
        setCurrency(newCurrency);
        onCurrencyChange && onCurrencyChange(newCurrency);
    };

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-black/60 mb-2 inline-block">{label}</label>
                <br />
                <input
                    id={amountInputId}
                    className="outline-none bg-gray-200 rounded-md w-3/4 text-center py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/60 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={currency}
                    onChange={handleCurrencyChange}
                    disabled={currencyDisable}
                >
                    {data ? (
                        Object.keys(data).map((currencyOption) => (
                            <option key={currencyOption} value={currencyOption}>
                                {currencyOption.toUpperCase()}
                            </option>
                        ))
                    ) : (
                        <option>Loading...</option>
                    )}
                </select>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}

export default InputBox;
