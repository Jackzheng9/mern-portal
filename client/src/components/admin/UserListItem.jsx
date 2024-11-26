import React, { useState } from "react";
import dayjs from "dayjs";
import UserListOptions from "./UserListOptions";


const UserListItem = ({ user }) => {
  const [userStatus, setUserStatus] = useState(user.status)

  const formatDate = (userDate) => {
    let formattedDate = dayjs(userDate).format("MM/DD/YYYY");
    return formattedDate;
  };

  const changeUserStatus = (status) => {
    // console.log("status change called!")
    // console.log("New status", status)
    setUserStatus(status)
  }

  // console.log("User status",userStatus)
  

  return (
    <li className="flex justify-between items-center relative border-b border-[#222227]">
      <span className="w-full flex text-[#F6F6F6]">{user.company}</span>
      <span className="w-full flex text-[#B0B0B0]">{formatDate(user.createdAt)}</span>
      <span className="w-full flex"> <span className={`status_text border rounded-2xl text-xs font-medium h-[22px] flex items-center px-[6px] py-[8px] ${userStatus == 'Accepted' ? 'border-[#027A48] text-[#027A48]' : ""} ${userStatus == 'Rejected' ? 'border-[#F04438] text-[#F04438]' : ""} ${userStatus == 'Pending' ? 'border-[#F79009] text-[#F79009]' : ""}`}>{userStatus}</span> </span>
      <UserListOptions user={user} changeUserStatus={changeUserStatus} />
    </li>
  );
};

export default UserListItem;
