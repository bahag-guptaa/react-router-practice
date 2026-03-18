import { Routes, Route } from 'react-router'
import App from './App'
import Navbar from './components/Navbar'
import CategoriesPage from './components/CategoriesPage'
import RecipesPage from './components/RecipesPage'
import AreasPage from './components/AreasPage'
import AreaDetailPage from './components/AreaDetailPage'
import CategoryDetailPage from './components/CategoryDetailPage'
import RecipeDetailPage from './components/RecipeDetailPage'

const MyRouter = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/categories' element={<CategoriesPage />} />
                <Route path='/recipes' element={<RecipesPage />} />
                <Route path='/areas' element={<AreasPage />} />
                <Route path='/area/:area_id' element={<AreaDetailPage />} />
                <Route path='/category/:category_id' element={<CategoryDetailPage />} />
                <Route path='/recipe/:recipe_id' element={<RecipeDetailPage />} />
                <Route path='*' element={<h1>Page not found</h1>} />
            </Routes>

        </>
    )
}


export default MyRouter

