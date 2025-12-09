import { useState } from 'react';
import { Delete } from 'lucide-react';

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumber = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (shouldResetDisplay) {
      setDisplay('0.');
      setShouldResetDisplay(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);

    if (previousValue !== null && operation && !shouldResetDisplay) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    } else {
      setPreviousValue(currentValue);
    }

    setOperation(op);
    setShouldResetDisplay(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '×':
        return prev * current;
      case '÷':
        return current !== 0 ? prev / current : 0;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const currentValue = parseFloat(display);
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setShouldResetDisplay(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setShouldResetDisplay(false);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handlePercentage = () => {
    const currentValue = parseFloat(display);
    setDisplay(String(currentValue / 100));
  };

  const handleNegate = () => {
    const currentValue = parseFloat(display);
    setDisplay(String(-currentValue));
  };

  return (
    <div className="bg-slate-800 rounded-3xl shadow-2xl p-6 w-full max-w-sm">
      <div className="mb-6 bg-slate-900 rounded-2xl p-6 min-h-[100px] flex items-end justify-end">
        <div className="text-white text-right">
          {operation && previousValue !== null && (
            <div className="text-slate-400 text-sm mb-1">
              {previousValue} {operation}
            </div>
          )}
          <div className="text-4xl break-all">{display}</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <button
          onClick={handleClear}
          className="bg-slate-600 hover:bg-slate-500 text-white rounded-xl p-4 transition-colors"
        >
          AC
        </button>
        <button
          onClick={handleNegate}
          className="bg-slate-600 hover:bg-slate-500 text-white rounded-xl p-4 transition-colors"
        >
          +/-
        </button>
        <button
          onClick={handlePercentage}
          className="bg-slate-600 hover:bg-slate-500 text-white rounded-xl p-4 transition-colors"
        >
          %
        </button>
        <button
          onClick={() => handleOperation('÷')}
          className="bg-orange-500 hover:bg-orange-400 text-white rounded-xl p-4 transition-colors"
        >
          ÷
        </button>

        {/* Row 2 */}
        <button
          onClick={() => handleNumber('7')}
          className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl p-4 transition-colors"
        >
          7
        </button>
        <button
          onClick={() => handleNumber('8')}
          className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl p-4 transition-colors"
        >
          8
        </button>
        <button
          onClick={() => handleNumber('9')}
          className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl p-4 transition-colors"
        >
          9
        </button>
        <button
          onClick={() => handleOperation('×')}
          className="bg-orange-500 hover:bg-orange-400 text-white rounded-xl p-4 transition-colors"
        >
          ×
        </button>

        {/* Row 3 */}
        <button
          onClick={() => handleNumber('4')}
          className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl p-4 transition-colors"
        >
          4
        </button>
        <button
          onClick={() => handleNumber('5')}
          className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl p-4 transition-colors"
        >
          5
        </button>
        <button
          onClick={() => handleNumber('6')}
          className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl p-4 transition-colors"
        >
          6
        </button>
        <button
          onClick={() => handleOperation('-')}
          className="bg-orange-500 hover:bg-orange-400 text-white rounded-xl p-4 transition-colors"
        >
          -
        </button>

        {/* Row 4 */}
        <button
          onClick={() => handleNumber('1')}
          className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl p-4 transition-colors"
        >
          1
        </button>
        <button
          onClick={() => handleNumber('2')}
          className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl p-4 transition-colors"
        >
          2
        </button>
        <button
          onClick={() => handleNumber('3')}
          className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl p-4 transition-colors"
        >
          3
        </button>
        <button
          onClick={() => handleOperation('+')}
          className="bg-orange-500 hover:bg-orange-400 text-white rounded-xl p-4 transition-colors"
        >
          +
        </button>

        {/* Row 5 */}
        <button
          onClick={() => handleNumber('0')}
          className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl p-4 col-span-2 transition-colors"
        >
          0
        </button>
        <button
          onClick={handleDecimal}
          className="bg-slate-700 hover:bg-slate-600 text-white rounded-xl p-4 transition-colors"
        >
          .
        </button>
        <button
          onClick={handleEquals}
          className="bg-orange-500 hover:bg-orange-400 text-white rounded-xl p-4 transition-colors"
        >
          =
        </button>
      </div>
    </div>
  );
}
