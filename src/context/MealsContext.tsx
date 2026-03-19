import { createContext, useState } from 'react'

interface MealData {
    idMeal: string
    strMeal: string
    strMealThumb: string
}

interface MealsContextType {
    fetchMeals: (url: string) => Promise<MealData[]>
}

export const MealsContext = createContext<MealsContextType>({
    fetchMeals: async () => [],
})

const MealsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [cache, setCache] = useState<Record<string, MealData[]>>({})

    const fetchMeals = async (url: string) => {
        if (cache[url]) return cache[url]

        const response = await fetch(url)
        const data: { meals: MealData[] | null } = await response.json()
        const meals = data.meals !== null ? data.meals : []
        setCache((prev) => ({ ...prev, [url]: meals }))
        return meals
    }

    return (
        <MealsContext.Provider value={{ fetchMeals }}>
            {children}
        </MealsContext.Provider>
    )
}

export default MealsContextProvider

