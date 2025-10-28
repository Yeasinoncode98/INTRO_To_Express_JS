import "./App.css";
import Users from "./Components/Users";

const usersPromise = fetch("http://localhost:3000/users").then((res) =>
  res.json()
);

function App() {
  return (
    <>
      <h1>Simple Crud Client</h1>
      <Users usersPromise={usersPromise}></Users>
    </>
  );
}

export default App;
