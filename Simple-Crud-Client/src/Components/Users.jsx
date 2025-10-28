import React, { use, useState } from "react";
import { Link } from "react-router";

const Users = ({ usersPromise }) => {
  const initialUsers = use(usersPromise);
  const [users, setUsers] = useState(initialUsers);

  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log(name, email);
    const newUser = { name, email };

    // Save this user data to databse (via server to database -- Client to Server then DataBase)

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("After Saving User", data);
        if (data.insertedId) {
          newUser._id = data.insertedId;
          const newUsers = [...users, newUser];
          setUsers(newUsers);
          alert("Users added Successfully");
          e.target.reset();
        }
      });
  };

  const handleDeleteUser = (id) => {
    console.log("Users Deleted", id);

    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("After Deleted", data);
        if (data.deletedCount) {
          alert("Deleted Successfully");
          const remaining = users.filter((user) => user._id !== id);
          setUsers(remaining);
        }
      });
  };

  return (
    <div>
      <h3>Users: {users.length}</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="Add User" />
      </form>
      <p>-----------------</p>
      <div>
        {users.map((user) => (
          <p key={user._id}>
            {user.name} :{user.email}
            <Link to={`/users/${user._id}`}>Details</Link>
            <Link to={`/update/${user._id}`}>Edit</Link>
            <button onClick={() => handleDeleteUser(user._id)}>X</button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
