import { createContext, useState } from 'react'

interface AreaData {
    strArea: string
}

interface AreasContextType {
    areas: AreaData[]
    fetchAreas: () => void
}

export const AreasContext = createContext<AreasContextType>({
    areas: [],
    fetchAreas: () => { }
})

const AreasContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [areas, setAreas] = useState<AreaData[]>([])

    const fetchAreas = async () => {
        if (areas.length > 0) return

        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
            const data: { meals: AreaData[] } = await response.json()
            setAreas(data.meals)
        } catch (error) {
            console.error('Error fetching areas:', error)
        }
    }

    return (
        <AreasContext.Provider value={{ areas, fetchAreas }}>
            {children}
        </AreasContext.Provider>
    )
}

export default AreasContextProvider
