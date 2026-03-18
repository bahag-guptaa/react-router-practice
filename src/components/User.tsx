import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from './Spinner'


interface UserDetails {
    name: string,
    email: string,
    website: string
}

const User = () => {
    const { id } = useParams()
    const [userData, setUserData] = useState<UserDetails | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    console.log(typeof id)

    const fetchData = async () => {
        setLoading(true)
        if (!id || parseInt(id) > 10) {
            setError('The id must be contain between 1 and 10')
        }
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            const data: UserDetails = response.data
            setUserData(data)
        }
        catch (err: any) {
            setError(err.message)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (error) return <h1>{error}</h1>
    if (loading) return <Spinner />

    return (
        <>
            <>Hello I am the User component</>
            {!loading && userData && (
                <>
                    <h1>{userData?.name}</h1>
                    <p>{userData?.email}</p>
                    <p>{userData?.website}</p>
                </>
            )}

        </>
    )
}


export default User