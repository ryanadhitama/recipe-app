import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecipes } from "@/hooks/useRecipes";
import Head from "next/head";

export default function RecipeDetail() {
  const router = useRouter();
  const { id } = router.query;
  const {
    recipeDetail: recipe,
    loading,
    error,
    fetchRecipeById,
  } = useRecipes();

  useEffect(() => {
    if (id) {
      fetchRecipeById(id);
    }
  }, [id]);

  return (
    <>
      <div className="w-full max-w-[768px] mx-auto pb-6">
        {loading && (
          <p className="text-lg text-gray-600 text-center">Loading recipe...</p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {recipe && (
          <div className="bg-white rounded-lg pt-10 p-6">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">
              {recipe.title}
            </h1>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-[400px] object-cover rounded-md my-7"
            />

            <section className="mb-6">
              <h2 className="text-3xl font-semibold mb-2">Summary</h2>
              <p
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
              />
            </section>

            <section className="mb-6">
              <h2 className="text-3xl font-semibold mb-2">Recipe Details</h2>
              <ul className="space-y-2">
                <li>
                  <strong>Vegetarian:</strong>{" "}
                  {recipe.vegetarian ? "✅ Yes" : "❌ No"}
                </li>
                <li>
                  <strong>Vegan:</strong> {recipe.vegan ? "✅ Yes" : "❌ No"}
                </li>
                <li>
                  <strong>Gluten Free:</strong>{" "}
                  {recipe.glutenFree ? "✅ Yes" : "❌ No"}
                </li>
                <li>
                  <strong>Dairy Free:</strong>{" "}
                  {recipe.dairyFree ? "✅ Yes" : "❌ No"}
                </li>
                <li>
                  <strong>Very Healthy:</strong>{" "}
                  {recipe.veryHealthy ? "✅ Yes" : "❌ No"}
                </li>
                <li>
                  <strong>Cheap:</strong> {recipe.cheap ? "✅ Yes" : "❌ No"}
                </li>
                <li>
                  <strong>Popular:</strong>{" "}
                  {recipe.veryPopular ? "✅ Yes" : "❌ No"}
                </li>
                <li>
                  <strong>Sustainable:</strong>{" "}
                  {recipe.sustainable ? "✅ Yes" : "❌ No"}
                </li>
                <li>
                  <strong>Low FODMAP:</strong>{" "}
                  {recipe.lowFodmap ? "✅ Yes" : "❌ No"}
                </li>
                <li>
                  <strong>Weight Watchers Points:</strong>{" "}
                  {recipe.weightWatcherSmartPoints}
                </li>
                <li>
                  <strong>Health Score:</strong> {recipe.healthScore}
                </li>
                <li>
                  <strong>Price Per Serving:</strong> ${recipe.pricePerServing}
                </li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-3xl font-semibold mb-2">Ingredients</h2>
              <ul className="list-disc ml-6 text-gray-700">
                {recipe.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id} className="mb-1">
                    {ingredient.amount} {ingredient.unit}{" "}
                    {ingredient.nameClean || ingredient.name}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-3xl font-semibold mb-2">Instructions</h2>
              <ol className="list-decimal ml-6 text-gray-700">
                {recipe.analyzedInstructions[0]?.steps.map((step) => (
                  <li key={step.number} className="mb-2">
                    {step.step}
                  </li>
                ))}
              </ol>
            </section>

            <section className="mb-6">
              <h2 className="text-3xl font-semibold mb-2">Source</h2>
              <p>
                Recipe by:{" "}
                <a
                  href={recipe.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {recipe.sourceName}
                </a>
              </p>
              <p>Credits: {recipe.creditsText}</p>
              <p>License: {recipe.license}</p>
            </section>
          </div>
        )}
      </div>
      <Head>
        <title>Recipe Detail</title>
      </Head>
    </>
  );
}
