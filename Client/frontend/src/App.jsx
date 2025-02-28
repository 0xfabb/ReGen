import axios from 'axios'
import './App.css'

function App() {

  const handleClick = async () => { 
    axios.get('http://localhost:3000/users')
    .then((Response) => console.log(Response.data.users[0].name))
  }
  return (
    <>
      <h1>App</h1>
      <button 
       onClick={handleClick}
       className='bg-green-600 p-2 m-2 fixed top-1/2 text-center left-1/2 rounded-lg'>Get Users</button>
    </>
  )
}

export default App
