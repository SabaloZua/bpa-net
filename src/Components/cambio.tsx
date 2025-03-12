import React, { useState } from "react";
import { RotateCw } from "lucide-react";
import { Input } from "@/components/ui/input";
const CurrencyConverterCard = () => {
  const [amount, setAmount] = useState("1,00");
  const [fromCurrency, setFromCurrency] = useState("AOA");
  const [toCurrency, setToCurrency] = useState("USD");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [result, setResult] = useState("0.00105");

  const currencies = [
    { value: "AOA", label: "AOA", flag: "🇦🇴" },
    { value: "USD", label: "USD", flag: "🇺🇸" },
    { value: "EUR", label: "EUR", flag: "🇪🇺" },
    { value: "GBP", label: "GBP", flag: "🇬🇧" },
  ];

  // const handleSwapCurrencies = () => {
  //   const temp = fromCurrency;
  //   setFromCurrency(toCurrency);
  //   setToCurrency(temp);
  // };

  return (
    <div className="w-full px-3 py-3 flex flex-col gap-2 ">
      <div className="mb-2">
        <label className="block text-sm text-gray-600 mb-1">Montante</label>
        <Input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-gray-100 border border-gray-200 rounded-md p-2 text-gray-800"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">De</label>
          <div className="relative">
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full bg-gray-100 border border-gray-200 rounded-md p-2 text-gray-800 appearance-none"
            >
              {currencies.map((currency) => (
                <option key={currency.value} value={currency.value}>
                  {currency.flag} {currency.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Para</label>
          <div className="relative">
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full bg-gray-100 border border-gray-200 rounded-md p-2 text-gray-800 appearance-none"
            >
              {currencies.map((currency) => (
                <option key={currency.value} value={currency.value}>
                  {currency.flag} {currency.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <button
        className=" w-full bg-blue-500 text-white rounded-md py-2 px-4 flex items-center justify-center"
        onClick={() => console.log("Converting...")}
      >
        <span>Converter</span>
        <RotateCw className="w-5 h-5 ml-2" />
      </button>

      <div className="mt-2 p-4 bg-gray-100 rounded-md">
        <div className="flex items-baseline gap-1">
          <span className="text-gray-600 text-lg">{toCurrency}</span>
          <span className="text-3xl text-blue-600 font-semibold">{result}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Taxas de Câmbio actualizadas a 7 Fev 2025, 12:00
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverterCard;
