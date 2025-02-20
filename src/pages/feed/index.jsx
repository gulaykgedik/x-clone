import { useOutletContext } from "react-router-dom";
import Nav from "./nav";
import Main from "./main";
import Aside from "./aside";

const Feed = () => {
  const user = useOutletContext();
  return (
    <div className="h-screen bg-primary overflow-auto text-secondary grid grid-cols-[1fr_minmax(300px,600px)_1fr]">
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </div>
  );
};

export default Feed;
