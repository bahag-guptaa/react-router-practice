import { useEffect, useState } from "react"
import { Link } from "react-router"

interface CategoryData {
    idCategory: string,
    strCategory: string,
    strCategoryThumb: string,
    strCategoryDescription: string
}

const CategoriesPage: React.FC = () => {
    const [categories, setCategories] = useState<CategoryData[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
            const data: { categories: CategoryData[] } = await response.json()
            setCategories(data.categories)
        } catch (error) {
            console.error('Error fetching categories:', error)
            setError('Failed to load categories')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])
    
    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-8">Categories</h1>
            {loading && <p className="text-gray-400 text-sm">Loading...</p>}
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <ul className="grid grid-cols-3 gap-5">
                {categories.map((category) => (
                    <Link to={`/category/${category.strCategory}`} key={category.idCategory}>
                        <li className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
                            <img src={category.strCategoryThumb} alt={category.strCategory} className="w-full object-cover" />
                            <p className="text-sm font-medium text-gray-800 p-4">{category.strCategory}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default CategoriesPage