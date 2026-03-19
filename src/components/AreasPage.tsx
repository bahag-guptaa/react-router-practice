import { useEffect, useState, useContext } from "react"
import { Link } from "react-router"
import { AreasContext } from "../context/AreasContext"

const AreasPage: React.FC = () => {
    const { areas, fetchAreas } = useContext(AreasContext)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadAreas = async () => {
            try {
                await fetchAreas()
            } catch (err) {
                setError('Failed to load areas')
            } finally {
                setLoading(false)
            }
        }
        loadAreas()
    }, [])

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-semibold text-gray-900 mb-8">Areas</h1>
            {loading && <p className="text-gray-400 text-sm">Loading...</p>}
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <ul className="grid lg:grid-cols-5 sm:grid-cols-1 gap-5">
                {areas.map((area) => (
                    <Link to={`/area/${area.strArea}`} key={area.strArea}>
                        <li className="rounded-2xl border border-gray-100 shadow-sm p-5 text-sm font-medium text-gray-800 cursor-pointer">
                            {area.strArea}
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default AreasPage
