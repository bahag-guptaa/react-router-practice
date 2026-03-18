import { useState } from "react"
import { Link } from "react-router"

interface MealResult {
    idMeal: string
    strMeal: string
    strMealThumb: string
}

interface AreaResult {
    strArea: string
}

interface CategoryResult {
    strCategory: string
}

type SearchType = 'meal' | 'area' | 'category' | 'ingredient'

const SearchComponent: React.FC = () => {
    const [query, setQuery] = useState<string>('')
    const [searchType, setSearchType] = useState<SearchType>('meal')
    const [mealResults, setMealResults] = useState<MealResult[]>([])
    const [areaResults, setAreaResults] = useState<AreaResult[]>([])
    const [categoryResults, setCategoryResults] = useState<CategoryResult[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string>('')

    const handleSearch = async () => {
        if (query.trim().length === 0) return

        setLoading(true)
        setError(null)
        setMessage('')
        setMealResults([])
        setAreaResults([])
        setCategoryResults([])

        try {
            let hasResults = false

            if (searchType === 'meal') {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
                const data: { meals: MealResult[] | null } = await response.json()
                if (data.meals) {
                    setMealResults(data.meals)
                    hasResults = true
                }

            } else if (searchType === 'ingredient') {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`)
                const data: { meals: MealResult[] | null } = await response.json()
                if (data.meals) {
                    setMealResults(data.meals)
                    hasResults = true
                }

            } else if (searchType === 'area') {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
                const data: { meals: AreaResult[] } = await response.json()
                const filtered = data.meals.filter((a) =>
                    a.strArea.toLowerCase().startsWith(query.toLowerCase())
                )
                setAreaResults(filtered)
                if (filtered.length > 0) hasResults = true

            } else if (searchType === 'category') {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
                const data: { meals: CategoryResult[] } = await response.json()
                const filtered = data.meals.filter((c) =>
                    c.strCategory.toLowerCase().startsWith(query.toLowerCase())
                )
                setCategoryResults(filtered)
                if (filtered.length > 0) hasResults = true
            }

            if (!hasResults) {
                setMessage('No results found for "' + query + '".')
            }
        } catch (err) {
            console.error('Search error:', err)
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto px-4">
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={`Search by ${searchType}...`}
                    className="flex-1 border border-gray-300 rounded-xl px-5 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white shadow-sm transition"
                />
                <button
                    onClick={handleSearch}
                    className="bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                    Search
                </button>
            </div>

            <div className="flex gap-2 mb-8 justify-center">
                <button
                    onClick={() => setSearchType('meal')}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${searchType === 'meal' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-500'}`}
                >
                    Meal
                </button>
                <button
                    onClick={() => setSearchType('area')}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${searchType === 'area' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-500'}`}
                >
                    Area
                </button>
                <button
                    onClick={() => setSearchType('category')}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${searchType === 'category' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-500'}`}
                >
                    Category
                </button>
                <button
                    onClick={() => setSearchType('ingredient')}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${searchType === 'ingredient' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-500'}`}
                >
                    Ingredient
                </button>
            </div>

            {loading && <p className="text-gray-400 text-sm text-center">Searching...</p>}
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            {message && <p className="text-gray-400 text-sm text-center">{message}</p>}

            {mealResults.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xs font-semibold text-gray-400 uppercase mb-4">Meals</h2>
                    <ul className="grid grid-cols-3 gap-4">
                        {mealResults.map((meal) => (
                            <Link to={`/recipe/${meal.idMeal}`} key={meal.idMeal}>
                                <li className="rounded-2xl shadow-sm border border-gray-100 cursor-pointer">
                                    <img src={meal.strMealThumb} className="w-full object-cover" />
                                    <p className="text-sm font-medium text-gray-800 p-3">{meal.strMeal}</p>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            )}

            {areaResults.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xs font-semibold text-gray-400 uppercase mb-4">Areas</h2>
                    <ul className="grid grid-cols-3 gap-4">
                        {areaResults.map((area) => (
                            <Link to={`/area/${area.strArea}`} key={area.strArea}>
                                <li className="rounded-2xl border border-gray-100 p-4 text-sm font-medium text-gray-800 cursor-pointer shadow-sm">
                                    {area.strArea}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            )}

            {categoryResults.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xs font-semibold text-gray-400 uppercase mb-4">Categories</h2>
                    <ul className="grid grid-cols-3 gap-4">
                        {categoryResults.map((cat) => (
                            <Link to={`/category/${cat.strCategory}`} key={cat.strCategory}>
                                <li className="rounded-2xl border border-gray-100 p-4 text-sm font-medium text-gray-800 cursor-pointer shadow-sm">
                                    {cat.strCategory}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default SearchComponent
