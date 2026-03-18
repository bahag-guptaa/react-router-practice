import SearchComponent from "./components/SearchComponent"

const App = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="text-center min-h-screen py-24 px-6 bg-linear-to-br from-gray-50 to-white">
                <h1 className="text-5xl font-semibold text-gray-900 mb-4">
                    Discover Recipes
                </h1>
                <p className="text-lg text-gray-500 pb-4">
                    Search by meal, area, category, or ingredient.
                </p>
                <SearchComponent />
            </div>

        </div>
    )
}

export default App
