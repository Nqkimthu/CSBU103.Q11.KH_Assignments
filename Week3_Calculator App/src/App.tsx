import { useState } from 'react';
import { Calculator } from './components/Calculator';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <Calculator />
    </div>
  );
}
