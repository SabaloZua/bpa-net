import React, { useState, useEffect } from 'react';
import { RotateCw } from 'lucide-react';
import { Input } from "@/Components/ui/input";

const CurrencyConverterCard = () => {
  const [amount, setAmount] = useState('1,00');
  const [fromCurrency, setFromCurrency] = useState('AOA');
  const [toCurrency, setToCurrency] = useState('USD');
  const [result, setResult] = useState('0,00');
  const [rates, setRates] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');
  // Armazenar o valor numérico real para cálculos
  const [numericAmount, setNumericAmount] = useState(1);

  const currencies = [
    { value: 'AOA', label: 'AOA', flag: '🇦🇴', symbol: 'Kz' },
    { value: 'USD', label: 'USD', flag: '🇺🇸', symbol: '$' },
    { value: 'EUR', label: 'EUR', flag: '🇪🇺', symbol: '€' },
    { value: 'GBP', label: 'GBP', flag: '🇬🇧', symbol: '£' },
  ];

  // Função para buscar as taxas de câmbio atualizadas
  const fetchExchangeRates = async () => {
    try {
      setIsLoading(true);
      // Usando a API free do ExchangeRate-API
      const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
      const data = await response.json();
      
      if (data.result === 'success') {
        setRates(data.rates);
        
        // Formatar a data da última atualização
        const updateDate = new Date(data.time_last_update_utc);
        const formattedDate = `${updateDate.getDate()} ${updateDate.toLocaleString('pt-PT', { month: 'short' })} ${updateDate.getFullYear()}, ${updateDate.getHours()}:${updateDate.getMinutes().toString().padStart(2, '0')}`;
        setLastUpdated(formattedDate);
        
        // Realizar a conversão imediatamente após obter as taxas
        convertCurrency();
      }
    } catch (error) {
      console.error('Erro ao buscar taxas de câmbio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para converter a moeda usando o valor numérico
  const convertCurrency = () => {
    if (!rates || !rates[toCurrency]) return;
    
    const convertedAmount = numericAmount * rates[toCurrency];
    setResult(formatCurrency(convertedAmount));
  };

  // Função para trocar as moedas
  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  // Formatação de valores para exibição (com separadores de milhares e vírgulas)
  const formatCurrency = (value: number): string => {
    return value.toFixed(2)
      .replace('.', ',')
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  // Função para obter o símbolo da moeda
  const getCurrencySymbol = (currencyCode: string): string => {
    const currency = currencies.find(c => c.value === currencyCode);
    return currency ? currency.symbol : '';
  };

  // Extrai o valor numérico real de uma string formatada
  const extractNumericValue = (formattedValue: string): number => {
    // Remove todos os separadores de milhares (pontos)
    const cleanValue = formattedValue.replace(/\./g, '');
    // Substitui a vírgula por ponto para conversão para número
    const numericString = cleanValue.replace(',', '.');
    return parseFloat(numericString) || 0;
  };

  // Formatação do input de montante
  const formatInputValue = (value: string): string => {
    // Remove todos os separadores existentes e letras
    let cleanValue = value.replace(/\./g, '').replace(/[^0-9,]/g, '');
    
    // Se não tiver vírgula, assume que só tem parte inteira
    if (!cleanValue.includes(',')) {
      cleanValue = cleanValue + ',00';
    } else {
      // Garantir que tenha 2 casas decimais após a vírgula
      const parts = cleanValue.split(',');
      if (parts[1].length === 0) {
        cleanValue = parts[0] + ',00';
      } else if (parts[1].length === 1) {
        cleanValue = parts[0] + ',' + parts[1] + '0';
      } else {
        cleanValue = parts[0] + ',' + parts[1].substring(0, 2);
      }
    }

    // Se o valor estiver vazio, retorna 0,00
    if (cleanValue === ',00' || cleanValue === '') {
      return '0,00';
    }

    // Adicionar separadores de milhares
    const integerPart = cleanValue.split(',')[0];
    const decimalPart = cleanValue.split(',')[1];
    
    let formattedInteger = '';
    for (let i = 0; i < integerPart.length; i++) {
      if (i > 0 && (integerPart.length - i) % 3 === 0) {
        formattedInteger += '.';
      }
      formattedInteger += integerPart[i];
    }
    
    return formattedInteger + ',' + decimalPart;
  };

  // Buscar taxas quando moeda de origem muda
  useEffect(() => {
    fetchExchangeRates();
  }, [fromCurrency]);

  // Converter quando moeda de destino muda ou valor numérico muda
  useEffect(() => {
    if (Object.keys(rates).length > 0) {
      convertCurrency();
    }
  }, [toCurrency, numericAmount, rates]);

  // Tratamento da entrada do montante
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Remove todos os separadores e processa apenas os dígitos
    const digitsOnly = inputValue.replace(/\./g, '').replace(/[^0-9,]/g, '');
    
    // Permitir apenas dígitos e uma vírgula
    if (/^[0-9]*,?[0-9]*$/.test(digitsOnly)) {
      // Formatar o valor para exibição
      const formattedValue = formatInputValue(digitsOnly);
      setAmount(formattedValue);
      
      // Extrair e armazenar o valor numérico real
      const newNumericValue = extractNumericValue(formattedValue);
      setNumericAmount(newNumericValue);
    }
  };

  // Formatar o valor inicial ao carregar o componente
  useEffect(() => {
    const formattedInitial = formatInputValue(amount);
    setAmount(formattedInitial);
    setNumericAmount(extractNumericValue(formattedInitial));
  }, []);

  return (
    <div className="w-full px-3 py-3 flex flex-col gap-2">
      <div className="mb-2">
        <label className="block text-sm text-gray-600 mb-1">Montante</label>
        <div className="relative">
          <Input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            className="w-full bg-gray-100 border border-gray-200 rounded-md p-2 pl-8 text-gray-800"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500">{getCurrencySymbol(fromCurrency)}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 relative">
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
              <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Botão de troca entre as posições centrais */}
        <button 
          onClick={handleSwapCurrencies}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center z-10"
        >
          <RotateCw className="w-4 h-4" />
        </button>
        
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
              <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        className="w-full bg-blue-500 text-white rounded-md py-2 px-4 flex items-center justify-center mt-2"
        onClick={fetchExchangeRates}
        disabled={isLoading}
      >
        <span>{isLoading ? 'A converter...' : 'Converter'}</span>
        {isLoading ? (
          <RotateCw className="w-5 h-5 ml-2 animate-spin" />
        ) : (
          <RotateCw className="w-5 h-5 ml-2" />
        )}
      </button>
      
      <div className="mt-2 p-4 bg-gray-100 rounded-md">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl text-blue-600 font-semibold">
            {getCurrencySymbol(toCurrency)}{result}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Taxas de Câmbio actualizadas a {lastUpdated || '7 Fev 2025, 12:00'}
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverterCard;