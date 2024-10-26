import React from 'react';

export function UserForm({ onSubmit }: { onSubmit: (data: { age: number; gender: string }) => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      age: Number(formData.get('age')),
      gender: String(formData.get('gender'))
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6">
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-300">
          Age
        </label>
        <input
          type="number"
          name="age"
          id="age"
          min="1"
          max="120"
          required
          className="mt-2 block w-full rounded-lg bg-gray-900 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-300">
          Gender
        </label>
        <select
          name="gender"
          id="gender"
          required
          className="mt-2 block w-full rounded-lg bg-gray-900 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-binary</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg hover:shadow-xl transform transition hover:-translate-y-0.5"
      >
        Generate Trailer
      </button>
    </form>
  );
}