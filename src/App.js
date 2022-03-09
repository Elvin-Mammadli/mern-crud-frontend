import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [users, setUsers] = useState([]);

  const addUser = e => {
    e.preventDefault();
    axios.post('https://elvin-mern-app.herokuapp.com/createUser', { name, age })
      .then(res => setUsers(prev => {
        return [res.data, ...prev.reverse()]
      }));
    setName('');
    setAge('');
  }

  const getData = () => {
    axios.get('https://elvin-mern-app.herokuapp.com/getUsers')
      .then(res => setUsers(res.data.reverse()))
  }

  const editUser = e => {
    const id = e.target.id;
    const newName = prompt("Yeni adı daxil edin");
    const newAge = prompt("Yeni yaşı daxil edin");
    axios.put('https://elvin-mern-app.herokuapp.com/updateUser', { id: id, name: newName, age: newAge });
    const index = users.findIndex(obj => obj._id === id);
    let updated = [...users];
    updated[index].name = newName;
    updated[index].age = newAge;
    setUsers(updated)
  }

  const deleteUser = e => {
    const id = e.target.id;
    axios.delete('https://elvin-mern-app.herokuapp.com/deleteUser', { data: { id: id } });
    const index = users.findIndex(obj => obj._id === id);
    let updated = [...users];
    updated.splice(index, 1)
    setUsers(updated)
  }

  useEffect(() => {
    getData();
  }, [])


  return (
    <div className="App">
      <form className="up" onSubmit={addUser}>
        <h1>Dostlar</h1>
        <input className='name' type="text" name='name' placeholder='Adı' required
          value={name} onChange={e => setName(e.target.value)}
        />
        <input className='age' type="number" name='age' placeholder='Yaşı' required
          value={age} onChange={e => setAge(e.target.value)}
        />
        <button className='add'>Add</button>
      </form>
      <div className="down">
        {users.map((user, index) => (
          <div key={index} className="card">
            <p className="data">
              <b>Name:</b> {user.name}, <b>Age:</b> {user.age}
            </p>
            <div className="buttons">
              <button className='cardbtn update' id={user._id} onClick={editUser}>Update</button>
              <button className='cardbtn delete' id={user._id} onClick={deleteUser}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
