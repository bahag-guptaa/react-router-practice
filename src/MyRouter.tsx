import { Routes, Route, Link } from 'react-router'
import App from './App'
import Contact from './components/Contact'
import NavBar from './components/NavBar'
import Users from './components/Users'
import User from './components/User'



const MyRouter = () => {
    return (
        <>
            <NavBar />
            {/* <ul style={{display:"flex", justifyContent: 'space-between'}}>
                <li><Link to='/' >Home</Link></li>
                <li><Link to='/contact' >Contact</Link></li>
                <li><Link to='/users' >Users</Link></li>
            </ul> */}
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/users' element={<Users />} />
                <Route path='/user/:id' element={<User />} />
                <Route path='*' element={<h1>Page not found</h1>} />
            </Routes>

        </>
    )
}


export default MyRouter

