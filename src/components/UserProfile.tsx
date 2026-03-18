import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserProfile = () => {

  const [user, setUser] = useState<User | null>(null);  
  const [userID, setUserID] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true);

  console.log(userID)


  const fetchUser = async () => {
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}`)
    
        if(!response.ok){
             throw new Error('Failed request')
        }

        const data: User = await response.json()
        setUser(data)
    }
    catch(err){
        console.log(err)
    }
    finally{
        setLoading(false)
    }
  } 

  useEffect(() => {
    fetchUser()
  }, [])



  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user found</p>;

  return (
    <div>
      <input type="number" onChange={(e) => setUserID(parseInt(e.target.value))} />
      <button onClick={() => fetchUser()}>
        Fetch user
      </button>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};


export default UserProfile