import { MdEdit } from "react-icons/md";
import { getUserName } from "../../utils/helpers";
import moment from "moment";

const UserInfo = ({ tweet }) => {
  let date = tweet.createdAt?.toDate();

  date = moment(date).fromNow(true);
  return (
    <div className="flex gap-2 items-center whitespace-nowrap text-gray-400">
      <p className="text-white font-semibold">{tweet.user.name}</p>
      <p className="text-sm">{getUserName(tweet.user.name)}</p>
      <p className="text-sm">{date}</p>

      {tweet.isEdited && (
        <p>
          <MdEdit className="md:hidden" />
          <span className="max-md:hidden">* düzenlendi</span>
        </p>
      )}
    </div>
  );
};

export default UserInfo;
