import { MdDelete, MdEdit } from "react-icons/md";
import { auth, db } from "../../firebase/index";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import EditModal from "../modal/edit-modal";

const Dropdown = ({ tweet }) => {
  const [isOpen, setIsOpen] = useState(false);

  const checkboxRef = useRef();
  const isOwn = tweet.user.id === auth.currentUser.uid;

  const handleDelete = () => {
    if (!confirm("Kaldırmak istediğinize emin misiniz?")) return;

    const docRef = doc(db, "tweets", tweet.id);

    deleteDoc(docRef).then(() => toast.info("Tweet akıştan kaldırıldı."));
  };

  return (
    isOwn && (
      <div>
        <label className="popup">
          <input type="checkbox" ref={checkboxRef} />
          <div className="burger" tabIndex="0">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav className="popup-window">
            <legend>Eylemler</legend>
            <ul>
              <hr />

              <li>
                <button
                  onClick={() => {
                    setIsOpen(true);
                    checkboxRef.current.checked = false;
                  }}
                >
                  <MdEdit className="text-blue-500 text-base" />

                  <span>Düzenle</span>
                </button>
              </li>
              <hr />
              <li>
                <button onClick={handleDelete}>
                  <MdDelete className="text-red-500 text-base" />
                  <span>Kaldır</span>
                </button>
              </li>
            </ul>
          </nav>
        </label>
        <EditModal
          isOpen={isOpen}
          tweet={tweet}
          close={() => setIsOpen(false)}
        />
      </div>
    )
  );
};

export default Dropdown;
