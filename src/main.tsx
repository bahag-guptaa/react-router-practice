import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import MyRouter from './MyRouter.tsx'
import AreasContextProvider from './context/AreasContext.tsx'
import CategoriesContextProvider from './context/CategoriesContext.tsx'
import MealsContextProvider from './context/MealsContext.tsx'
import RecipeDetailContextProvider from './context/RecipeDetailContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <MealsContextProvider>
        <CategoriesContextProvider>
          <AreasContextProvider>
            <RecipeDetailContextProvider>
              <MyRouter />
            </RecipeDetailContextProvider>
          </AreasContextProvider>
        </CategoriesContextProvider>
      </MealsContextProvider>
    </StrictMode>
  </BrowserRouter>,
)
