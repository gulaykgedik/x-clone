import React from "react";

const UserAvatar = ({ photo, name, designs }) => {
  return (
    <div>
      <img
        src={photo}
        alt={name}
        className={`size-[35px] md:size-[45px] rounded-full ${designs}`}
      />
    </div>
  );
};

export default React.memo(UserAvatar);
