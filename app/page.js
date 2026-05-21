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

const FOOD_MATCH_THRESHOLD = 0.78;

function normalizeFoodName(foodName) {
  return foodName.trim().toLowerCase();
}

function getEditDistance(firstFoodName, secondFoodName) {
  const previousDistances = Array.from(
    { length: secondFoodName.length + 1 },
    (_, index) => index
  );

  for (let firstIndex = 1; firstIndex <= firstFoodName.length; firstIndex += 1) {
    let previousDiagonal = previousDistances[0];
    previousDistances[0] = firstIndex;

    for (let secondIndex = 1; secondIndex <= secondFoodName.length; secondIndex += 1) {
      const savedDistance = previousDistances[secondIndex];
      const substitutionCost =
        firstFoodName[firstIndex - 1] === secondFoodName[secondIndex - 1] ? 0 : 1;

      previousDistances[secondIndex] = Math.min(
        previousDistances[secondIndex] + 1,
        previousDistances[secondIndex - 1] + 1,
        previousDiagonal + substitutionCost
      );
      previousDiagonal = savedDistance;
    }
  }

  return previousDistances[secondFoodName.length];
}

function getSimilarityScore(firstFoodName, secondFoodName) {
  const longestLength = Math.max(firstFoodName.length, secondFoodName.length);

  if (longestLength === 0) return 1;

  return 1 - getEditDistance(firstFoodName, secondFoodName) / longestLength;
}

function findClosestFoodMatch(foodName, foodList) {
  return foodList.reduce(
    (bestMatch, listedFood) => {
      const similarityScore = getSimilarityScore(foodName, listedFood);

      if (similarityScore > bestMatch.similarityScore) {
        return {
          foodName: listedFood,
          similarityScore
        };
      }

      return bestMatch;
    },
    {
      foodName: '',
      similarityScore: 0
    }
  );
}

function getFoodMatch(foodName, foodList) {
  if (foodList.includes(foodName)) {
    return {
      foodName,
      isFuzzyMatch: false
    };
  }

  const closestFoodMatch = findClosestFoodMatch(foodName, foodList);

  if (closestFoodMatch.similarityScore >= FOOD_MATCH_THRESHOLD) {
    return {
      foodName: closestFoodMatch.foodName,
      isFuzzyMatch: true
    };
  }

  return null;
}

export default function HomePage() {
  const [foodInput, setFoodInput] = useState('');
  const [checkedFood, setCheckedFood] = useState('');

  const result = useMemo(() => {
    if (!checkedFood) return null;

    const junkFoodMatch = getFoodMatch(checkedFood, JUNK_FOOD_LIST);

    if (junkFoodMatch) {
      return {
        label: 'Junk food ❌',
        helperText: junkFoodMatch.isFuzzyMatch
          ? `Did you mean "${junkFoodMatch.foodName}"? Try eating this less often and balance it with whole foods.`
          : 'Try eating this less often and balance it with whole foods.',
        color: 'text-rose-600'
      };
    }

    const healthierFoodMatch = getFoodMatch(checkedFood, HEALTHIER_FOOD_LIST);

    if (healthierFoodMatch) {
      return {
        label: 'Not junk food ✅',
        helperText: healthierFoodMatch.isFuzzyMatch
          ? `Did you mean "${healthierFoodMatch.foodName}"? Nice choice. Keep building healthy habits!`
          : 'Nice choice. Keep building healthy habits!',
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
    <main
      className="flex min-h-screen w-full flex-col items-center justify-center bg-cover bg-center px-6 py-12"
      style={{
        backgroundImage:
          "linear-gradient(rgba(226, 232, 240, 0.62), rgba(51, 65, 85, 0.7)), url('https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1600&q=80')",
        backgroundPosition: 'center'
      }}
    >
      <section className="w-full max-w-2xl rounded-2xl bg-white/95 p-8 shadow-lg backdrop-blur-sm sm:p-10">
        <h1 className="text-4xl font-black leading-none text-slate-950 sm:text-5xl">
          Junk or No
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
          Type a food item below. We&apos;ll tell you if it is likely junk food.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label
            htmlFor="food"
            className="block text-sm font-bold uppercase text-slate-500"
          >
            Food item
          </label>
          <input
            id="food"
            type="text"
            value={foodInput}
            onChange={(event) => setFoodInput(event.target.value)}
            placeholder="Example: chips"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-lg font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-base font-bold text-white transition hover:bg-blue-700 sm:text-lg"
          >
            Check food
          </button>
        </form>

        {result && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h2 className={`text-xl font-extrabold leading-tight ${result.color}`}>
              {result.label}
            </h2>
            <p className="mt-2 text-base leading-6 text-slate-600">{result.helperText}</p>
          </div>
        )}
      </section>
    </main>
  );
}
