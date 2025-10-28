import React, { use, useState } from "react";

const Users = ({ usersPromise }) => {
  const initialUsers = use(usersPromise);
  console.log(initialUsers);
  const [users, setUsers] = useState(initialUsers);

  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log(name, email);
    const newUser = { name, email };
    //send data to the server
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("After Post", data);
        const newUsers = [...users, data];
        setUsers(newUsers);
        e.target.reset();
      });
  };

  return (
    <div>
      <div>
        <h3>Add a user</h3>
        <form onSubmit={handleAddUser}>
          <input name="name" type="text" />
          <br />
          <input type="email" name="email" id="" />
          <br />
          <button>Add User</button>
        </form>
      </div>
      <div>
        {users.map((users) => (
          <p key={users.id}>
            {users.name} : Email:{users.email}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;

/**
 * have to send request object to the server
 *
 * 1.Mention Method : Post
 * 2.Mention Header : about json data in property of content-type : application/json
 * 3.Body : JSON.stringify(newUser)
 *
 * ......................................
 *
 * on the server side use json as middlewere
 * app.use(express.json())
 * using the express  JS the given  
 */
