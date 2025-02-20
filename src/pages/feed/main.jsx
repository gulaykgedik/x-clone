import Form from "../../components/feed-form";
import List from "./list";

const Main = ({ user }) => {
  return (
    <main className="border border-tw-gray ">
      <header className="border border-tw-gray p-4 font-bold tracking-wider text-xl">
        Anasayfa
      </header>

      <Form user={user} />

      <List />
    </main>
  );
};

export default Main;
