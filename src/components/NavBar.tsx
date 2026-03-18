import { Link } from 'react-router'

const Navbar = () => {
    return (
        <nav className='bg-white/80 backdrop-blur-md border-b border-gray-200 sticky z-50 px-10 py-4 flex items-center justify-between'>

            <Link to='/' className='text-xl font-semibold text-gray-900'>
                🍽️ Recipe App
            </Link>

            <ul className='flex gap-8'>
                <li>
                    <Link to='/categories' className='text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200'>
                        Categories
                    </Link>
                </li>
                <li>
                    <Link to='/recipes' className='text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200'>
                        Recipes
                    </Link>
                </li>
                <li>
                    <Link to='/areas' className='text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200'>
                        Areas
                    </Link>
                </li>
            </ul>

        </nav>
    )
}

export default Navbar
