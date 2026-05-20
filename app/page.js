'use client';

import { useMemo, useState } from 'react';

const JUNK_FOOD_LIST = [
  'chips',
  'soda',
  'candy',
  'burger',
  'fries',
  'pizza',
  'donut',
  'ice cream',
  'fried chicken',
  'cookies'
];

const HEALTHIER_FOOD_LIST = [
  'apple',
  'banana',
  'broccoli',
  'oatmeal',
  'salad',
  'grilled fish',
  'brown rice',
  'lentils',
  'eggs',
  'yogurt'
];

function normalizeFoodName(foodName) {
  return foodName.trim().toLowerCase();
}

export default function HomePage() {
  const [foodInput, setFoodInput] = useState('');
  const [checkedFood, setCheckedFood] = useState('');

  const result = useMemo(() => {
    if (!checkedFood) return null;

    if (JUNK_FOOD_LIST.includes(checkedFood)) {
      return {
        label: 'Junk food ❌',
        helperText: 'Try eating this less often and balance it with whole foods.',
        color: 'text-rose-600'
      };
    }

    if (HEALTHIER_FOOD_LIST.includes(checkedFood)) {
      return {
        label: 'Not junk food ✅',
        helperText: 'Nice choice. Keep building healthy habits!',
        color: 'text-emerald-600'
      };
    }

    return {
      label: "I don't know this one yet 🤔",
      helperText: 'Tip: Try foods like chips, apple, soda, or broccoli.',
      color: 'text-amber-600'
    };
  }, [checkedFood]);

  function handleSubmit(event) {
    event.preventDefault();
    setCheckedFood(normalizeFoodName(foodInput));
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center px-6 py-12">
      <section className="w-full rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold tracking-tight">Junk or No</h1>
        <p className="mt-2 text-slate-600">
          Type a food item below. We&apos;ll tell you if it is likely junk food.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label htmlFor="food" className="block text-sm font-medium text-slate-700">
            Food item
          </label>
          <input
            id="food"
            type="text"
            value={foodInput}
            onChange={(event) => setFoodInput(event.target.value)}
            placeholder="Example: chips"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Check food
          </button>
        </form>

        {result && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h2 className={`text-lg font-semibold ${result.color}`}>{result.label}</h2>
            <p className="mt-1 text-sm text-slate-600">{result.helperText}</p>
          </div>
        )}
      </section>
    </main>
  );
}
