import { useEffect, useState } from "react"
import { useParams, Link } from "react-router"

interface MealData {
    idMeal: string
    strMeal: string
    strMealThumb: string
}

const CategoryDetailPage: React.FC = () => {
    const { category_id } = useParams()
    const [meals, setMeals] = useState<MealData[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchMealsByCategory = async () => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category_id}`)
            const data: { meals: MealData[] } = await response.json()
            setMeals(data.meals)
        } catch (error) {
            console.error('Error fetching meals by category:', error)
            setError('Failed to load meals')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMealsByCategory()
    }, [category_id])

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-8">{category_id} Recipes</h1>
            {loading && <p className="text-gray-400 text-sm">Loading...</p>}
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <ul className="grid grid-cols-3 gap-5">
                {meals.map((meal) => (
                    <Link to={`/recipe/${meal.idMeal}`} key={meal.idMeal}>
                        <li className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm cursor-pointer">
                            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full object-cover" />
                            <p className="text-sm font-medium text-gray-800 p-4">{meal.strMeal}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default CategoryDetailPage
