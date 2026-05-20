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

const JUNK_METHOD_KEYWORDS = ['fried', 'deep fried', 'processed', 'sugary', 'loaded with sugar', 'fast food'];

function normalizeText(text) {
  return text.trim().toLowerCase();
}

export default function HomePage() {
  const [foodInput, setFoodInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [howMadeInput, setHowMadeInput] = useState('');
  const [submission, setSubmission] = useState(null);
  const [validationError, setValidationError] = useState('');

  const result = useMemo(() => {
    if (!submission) return null;

    const normalizedFood = normalizeText(submission.food);
    const normalizedHowMade = normalizeText(submission.howMade);

    if (JUNK_FOOD_LIST.includes(normalizedFood)) {
      return {
        label: 'Junk food ❌',
        helperText: 'Try eating this less often and balance it with whole foods.',
        color: 'text-rose-600'
      };
    }

    if (HEALTHIER_FOOD_LIST.includes(normalizedFood)) {
      return {
        label: 'Not junk food ✅',
        helperText: 'Nice choice. Keep building healthy habits!',
        color: 'text-emerald-600'
      };
    }

    if (JUNK_METHOD_KEYWORDS.some((keyword) => normalizedHowMade.includes(keyword))) {
      return {
        label: 'Likely junk food ❌',
        helperText: 'The preparation style sounds heavily processed or fried.',
        color: 'text-rose-600'
      };
    }

    return {
      label: "Possibly not junk food ✅",
      helperText: 'This item is not in our list, but the preparation sounds reasonable.',
      color: 'text-emerald-600'
    };
  }, [submission]);

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedFood = normalizeText(foodInput);
    const trimmedDescription = normalizeText(descriptionInput);
    const trimmedHowMade = normalizeText(howMadeInput);

    if (!trimmedFood || !trimmedDescription || !trimmedHowMade) {
      setValidationError('Please enter non-empty text for all fields.');
      setSubmission(null);
      return;
    }

    setValidationError('');
    setSubmission({
      food: foodInput.trim(),
      description: descriptionInput.trim(),
      howMade: howMadeInput.trim()
    });
  }

  return (
    <main
      className="flex min-h-screen w-full flex-col items-center justify-center bg-cover bg-center px-6 py-12"
      style={{
        backgroundImage:
          "linear-gradient(rgba(226, 232, 240, 0.62), rgba(51, 65, 85, 0.7)), url('https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1600&q=80')",
        backgroundPosition: 'center'
      }}
    >
      <section className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold tracking-tight">Junk or No</h1>
        <p className="mt-2 text-slate-600">
          Add a food item, a short description, and how it&apos;s made. We&apos;ll tell you if it is likely junk food.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {validationError && <p className="text-sm text-rose-600">{validationError}</p>}
          <div>
            <label htmlFor="food" className="block text-sm font-medium text-slate-700">
              Food item
            </label>
            <input
              id="food"
              type="text"
              value={foodInput}
              onChange={(event) => setFoodInput(event.target.value)}
              placeholder="Example: chips"
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">
              Short description
            </label>
            <textarea
              id="description"
              value={descriptionInput}
              onChange={(event) => setDescriptionInput(event.target.value)}
              placeholder="Example: Crunchy potato snack with salty flavor"
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              rows={2}
              required
            />
          </div>

          <div>
            <label htmlFor="howMade" className="block text-sm font-medium text-slate-700">
              How it&apos;s made
            </label>
            <textarea
              id="howMade"
              value={howMadeInput}
              onChange={(event) => setHowMadeInput(event.target.value)}
              placeholder="Example: Thin potato slices are deep fried and salted"
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              rows={2}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Check food
          </button>
        </form>

        {result && submission && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h2 className={`text-lg font-semibold ${result.color}`}>{result.label}</h2>
            <p className="mt-1 text-sm text-slate-600">{result.helperText}</p>
            <div className="mt-3 space-y-1 text-sm text-slate-700">
              <p><span className="font-semibold">Food:</span> {submission.food}</p>
              <p><span className="font-semibold">Description:</span> {submission.description}</p>
              <p><span className="font-semibold">How it&apos;s made:</span> {submission.howMade}</p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
