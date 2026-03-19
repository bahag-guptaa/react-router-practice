import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { RecipeDetailContext, type RecipeData } from "../context/RecipeDetailContext"

const RecipeDetailPage: React.FC = () => {
    const { recipe_id } = useParams()
    const { fetchRecipe } = useContext(RecipeDetailContext)
    const [recipe, setRecipe] = useState<RecipeData | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const loadRecipe = async () => {
        if (!recipe_id) return
        const result = await fetchRecipe(recipe_id)
        if (result) {
            setRecipe(result)
        } else {
            setError('Failed to load recipe')
        }
        setLoading(false)
    }

    useEffect(() => {
        loadRecipe()
    }, [recipe_id])

    if (loading) return <p className="text-center text-gray-400 py-20 text-sm">Loading...</p>
    if (error) return <p className="text-center text-red-400 py-20 text-sm">{error}</p>
    if (!recipe) return <p className="text-center text-gray-400 py-20 text-sm">Recipe not found.</p>

    const ingredients = [
        recipe.strIngredient1, recipe.strIngredient2, recipe.strIngredient3,
        recipe.strIngredient4, recipe.strIngredient5, recipe.strIngredient6,
        recipe.strIngredient7, recipe.strIngredient8, recipe.strIngredient9,
        recipe.strIngredient10, recipe.strIngredient11, recipe.strIngredient12,
        recipe.strIngredient13, recipe.strIngredient14, recipe.strIngredient15,
        recipe.strIngredient16, recipe.strIngredient17, recipe.strIngredient18,
        recipe.strIngredient19, recipe.strIngredient20
    ]

    const measures = [
        recipe.strMeasure1, recipe.strMeasure2, recipe.strMeasure3,
        recipe.strMeasure4, recipe.strMeasure5, recipe.strMeasure6,
        recipe.strMeasure7, recipe.strMeasure8, recipe.strMeasure9,
        recipe.strMeasure10, recipe.strMeasure11, recipe.strMeasure12,
        recipe.strMeasure13, recipe.strMeasure14, recipe.strMeasure15,
        recipe.strMeasure16, recipe.strMeasure17, recipe.strMeasure18,
        recipe.strMeasure19, recipe.strMeasure20
    ]

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-2">{recipe.strMeal}</h1>
            <p className="text-sm text-gray-400 pb-8">{recipe.strCategory} · {recipe.strArea}</p>
            <div className="flex gap-6 mb-10">
                <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-1/2 rounded-3xl shadow-sm object-cover"
                />

                <div className="w-1/2 flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Ingredients</h2>
                    <ul className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1">
                        {ingredients.map((ingredient, index) => {
                            if (!ingredient || ingredient.trim() === '') return null
                            return (
                                <li key={index} className="bg-gray-50 rounded-xl px-4 py-2 text-sm text-gray-700 border border-gray-100 flex justify-between">
                                    <span>{ingredient}</span>
                                    <span className="text-gray-400">{measures[index]}</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>

            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h2>
            <ol className="list-decimal list-outside space-y-4 pl-5 text-left">
                {recipe.strInstructions
                    .split('\n')
                    .map((step) => step.trim())
                    .filter((step) => step.length > 0)
                    .filter((step) => !/^step\s*\d+$/i.test(step))
                    .map((step, index) => (
                        <li key={index} className="text-gray-600 leading-relaxed text-sm">{step}</li>
                    ))
                }
            </ol>
 
            {recipe.strYoutube && (
                <a
                    href={recipe.strYoutube}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-10 bg-white text-red-600 border border-e-red-600  text-sm font-medium px-6 py-3 rounded-xl hover:bg-red-600 hover:text-white transition"
                >
                    ▶ Watch on YouTube
                </a>
            )}

        </div>
    )
}

export default RecipeDetailPage
