import { createContext, useState } from 'react'

export interface RecipeData {
    idMeal: string
    strMeal: string
    strCategory: string
    strArea: string
    strInstructions: string
    strMealThumb: string
    strYoutube: string
    strIngredient1: string
    strIngredient2: string
    strIngredient3: string
    strIngredient4: string
    strIngredient5: string
    strIngredient6: string
    strIngredient7: string
    strIngredient8: string
    strIngredient9: string
    strIngredient10: string
    strIngredient11: string
    strIngredient12: string
    strIngredient13: string
    strIngredient14: string
    strIngredient15: string
    strIngredient16: string
    strIngredient17: string
    strIngredient18: string
    strIngredient19: string
    strIngredient20: string
    strMeasure1: string
    strMeasure2: string
    strMeasure3: string
    strMeasure4: string
    strMeasure5: string
    strMeasure6: string
    strMeasure7: string
    strMeasure8: string
    strMeasure9: string
    strMeasure10: string
    strMeasure11: string
    strMeasure12: string
    strMeasure13: string
    strMeasure14: string
    strMeasure15: string
    strMeasure16: string
    strMeasure17: string
    strMeasure18: string
    strMeasure19: string
    strMeasure20: string
}

interface RecipeDetailContextType {
    fetchRecipe: (id: string) => Promise<RecipeData | null>
}

export const RecipeDetailContext = createContext<RecipeDetailContextType>({
    fetchRecipe: async () => null,
})

const RecipeDetailContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [cache, setCache] = useState<Record<string, RecipeData>>({})

    const fetchRecipe = async (id: string): Promise<RecipeData | null> => {
        if (cache[id]) return cache[id]

        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            const data: { meals: RecipeData[] | null } = await response.json()
            const recipe = data.meals !== null ? data.meals[0] : null
            if (recipe) {
                setCache((prev) => ({ ...prev, [id]: recipe }))
            }
            return recipe
        } catch (error) {
            console.error('Error fetching recipe:', error)
            return null
        }
    }

    return (
        <RecipeDetailContext.Provider value={{ fetchRecipe }}>
            {children}
        </RecipeDetailContext.Provider>
    )
}

export default RecipeDetailContextProvider
