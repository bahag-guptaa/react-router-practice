import { useState } from "react"
import { Link } from "react-router"

interface RecipeData {
    idMeal: string
    strMeal: string
    strCategory: string
    strArea: string
    strMealThumb: string
}

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

const RecipesPage: React.FC = () => {
    const [recipes, setRecipes] = useState<RecipeData[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null)

    const handleLetterClick = async (letter: string) => {
        setSelectedLetter(letter)
        setError(null)
        setLoading(true)

        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
            const data: { meals: RecipeData[] | null } = await response.json()

            if (data.meals !== null) {
                setRecipes(data.meals)
            }
        } catch (err) {
            console.error('Error fetching recipes:', err)
            setError('Failed to load recipes')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-8">Recipes</h1>

            <div className="flex flex-wrap gap-2 mb-8">
                {LETTERS.map((letter) => (
                    <button
                        key={letter}
                        onClick={() => handleLetterClick(letter)}
                        className={`w-9 h-9 rounded-full text-sm font-medium uppercase transition-colors duration-200 ${selectedLetter === letter ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        {letter}
                    </button>
                ))}
            </div>

            {loading && <p className="text-gray-400 text-sm">Loading...</p>}
            {error && <p className="text-red-400 text-sm">{error}</p>}
            {!loading && selectedLetter && recipes.length === 0 && (
                <p className="text-gray-400 text-sm">No recipes found for "{selectedLetter}".</p>
            )}

            <ul className="grid grid-cols-3 gap-5">
                {recipes.map((recipe) => (
                    <Link to={`/recipe/${recipe.idMeal}`} key={recipe.idMeal}>
                        <li className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm cursor-pointer">
                            <img src={recipe.strMealThumb} className="w-full object-cover" />
                            <div className="p-4">
                                <p className="text-sm font-medium text-gray-900">{recipe.strMeal}</p>
                                <p className="text-xs text-gray-400 mt-1">{recipe.strCategory} · {recipe.strArea}</p>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default RecipesPage

