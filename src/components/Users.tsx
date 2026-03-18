import { useState, useEffect } from "react";
import axios from 'axios'
import Spinner from "./Spinner";
import {Link, useNavigate} from 'react-router'

interface UserDetails {
    id: number,
    name: string
}


const Users = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState<UserDetails[] | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users`)
            const data: UserDetails[] = await response.data
            setUsers(data)
        }
        catch (err: any) {
            setError(err.message)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    if (loading) return <Spinner />
    if (error) return <h1>{error}</h1>

    return (
        <>
            {users && users.map(user => {
                console.log(user)
                return (
                    <div key={user.id}>
                        <h1><Link to={`/user/${user.id}`}>{user.name}</Link></h1>
                    </div>
                )
            })}
            <button onClick={() => navigate('/')}>
                Return Home
            </button>
        </>
    )
}


export default Users