import { createContext, useState } from 'react'

interface CategoryData {
    idCategory: string
    strCategory: string
    strCategoryThumb: string
    strCategoryDescription: string
}

interface CategoriesContextType {
    categories: CategoryData[]
    fetchCategories: () => void
}

export const CategoriesContext = createContext<CategoriesContextType>({
    categories: [],
    fetchCategories: () => { }
})

const CategoriesContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [categories, setCategories] = useState<CategoryData[]>([])

    const fetchCategories = async () => {
        if (categories.length > 0) return

        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
            const data: { categories: CategoryData[] } = await response.json()
            setCategories(data.categories)
        } catch (error) {
            console.error('Error fetching categories:', error)
        }
    }

    return (
        <CategoriesContext.Provider value={{ categories, fetchCategories }}>
            {children}
        </CategoriesContext.Provider>
    )
}

export default CategoriesContextProvider
