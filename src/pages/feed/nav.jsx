import { signOut } from "firebase/auth";
import { navSections } from "../../utils/constants";
import { getUserName } from "../../utils/helpers";
import { auth } from "../../firebase";
import { RiDoorOpenFill as Door } from "react-icons/ri";

const Nav = ({ user }) => {
  return (
    <nav className="flex flex-col justify-between items-end px-2 py-4">
      {/* links */}
      <div>
        <img src="logo.webp" alt="x" className="w-14 mb-4" />

        {navSections.map((item, key) => (
          <div
            key={key}
            className="flex items-center gap-3 text-2xl md:text-xl p-3 cursor-pointer rounded-lg transition hover:bg-tw-gray max-md:justify-center"
          >
            {item.icon}
            <span className="whitespace-nowrap max-md:hidden">
              {item.title}
            </span>
          </div>
        ))}
      </div>

      {/* user */}
      <div>
        <div className="flex max-md:flex-col gap-4 justify-between max-md:items-center">
          <div className="flex gap-2 text-sm">
            <img
              src={user?.photoURL}
              alt={user.displayName}
              className="rounded-full max-w-[45px] "
            />

            <div>
              <p className="max-md:hidden">{user.displayName}</p>
              <p className="max-md:hidden text-zinc-400">
                {getUserName(user.displayName)}
              </p>
            </div>
          </div>

          <button
            onClick={() => signOut(auth)}
            className="text-2xl cursor-pointer"
            title="Çıkış Yap"
          >
            <Door />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
