import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const RiderRoute = ({ Children }) => {
  const { loading, user } = useAuth();

  const { role, roleLoading } = useRole();
  if (loading || !user || roleLoading) {
    return (
      <div>
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  if (role !== "rider") {
    return <Forbidden></Forbidden>;
  }

  return Children;
};

export default RiderRoute;
