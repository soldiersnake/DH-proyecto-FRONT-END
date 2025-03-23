import { useAuth } from "../hooks/AuthContext";
import { Login } from "./Login";

export const Home = () => {
  const { user } = useAuth();

  if (!user) return <Login />;
  return (
    <>
      <h2>Home</h2>
      {user && <p> {user.name} </p>}
    </>
  );
};
