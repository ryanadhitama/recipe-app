import { useState } from "react";
import { useRecipes } from "@/hooks/useRecipes";
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  const { recipes, loading, error, searchRecipes } = useRecipes();
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    await searchRecipes(query);
  };

  return (
    <>
      <div className="min-h-screen flex items-center">
        <div className="w-full max-w-[768px] mx-auto pt-10 p-6">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
            Find Your Favorite Recipes
          </h1>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex justify-center mb-8">
            <div className="relative w-full">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a recipe..."
                className="w-full py-3 pl-4 pr-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Search
              </button>
            </div>
          </form>

          {/* Loading and Error States */}
          {loading && (
            <p className="text-center text-lg text-gray-600">
              Searching for recipes...
            </p>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}

          {/* Recipe Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white border rounded-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-52 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2 text-gray-900">
                    {recipe.title}
                  </h2>
                  <Link
                    href={`/recipe/${recipe.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* No Recipes Found */}
          {!loading && recipes.length === 0 && query && (
            <p className="text-center text-lg text-gray-500 mt-6">
              No recipes found for <strong>{query}</strong>.
            </p>
          )}
        </div>
      </div>
      <Head>
        <title>Recipe App</title>
      </Head>
    </>
  );
}
