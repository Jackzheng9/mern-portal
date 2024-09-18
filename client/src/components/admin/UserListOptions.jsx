import React, { useState } from "react";
import VerDots from "../../assets/ver-dots.svg";
import Eye from "../../assets/eye.svg";
import Check from "../../assets/check.svg";
import X from "../../assets/x.svg";
import CheckGreenCricle from "../../assets/check_green_circle.svg";
import CloseButtoX from "../../assets/Close_Button_X.svg";
import CancelIcon from "../../assets/CancelBtn.svg";
import OutsideClickHandler from "react-outside-click-handler";
import { useEditUserAdminMutation } from "../../slices/userApiSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const UserListOptions = ({ user, changeUserStatus }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const showConfirmOptionsHandler = () => {
    setShowConfirm(true);
  };

  const showRejectOptionsHandler = () => {
    setShowCancel(true);
  };

  const contentClickHandler = (e) => {
    setShowOptions(!showOptions);
  };

  const outSideClickHandler = (e) => {
    if (e.target.classList.contains("option_modal")) {
    } else {
      setShowOptions(false);
    }
  };

  const modalCloseHandler = () => {
    setShowConfirm(false);
  };
  const modalCloseHandlerReject = () => {
    setShowCancel(false);
  };

  const [
    editUserAdmin,
    { isLoading, isError, isSuccess, error, status: IsStatus },
  ] = useEditUserAdminMutation();

  const userEditHandler = async (status) => {
    const editApiCall = await editUserAdmin({
      email: user.email,
      status,
    }).unwrap();
    console.log(editApiCall);
    console.log("api status", editApiCall.status);
    if (editApiCall.success) {
      toast.success("User role changed successfully!");
      setShowConfirm(false);
      setShowCancel(false);
      changeUserStatus(editApiCall.status);
    } else {
      toast.error("Something went wrong!");
    }

    if (isError) {
      console.log(error.message);
    }
  };

  const linkClickHandler = () => {
    console.log("Link clicked!");
  };

  return (
    <div className=" relative w-full">
      <OutsideClickHandler onOutsideClick={outSideClickHandler}>
        <span
          onClick={contentClickHandler}
          className="user_options_wrap w-full relative block"
        >
          <img className="cursor-pointer" src={VerDots} alt="" />
        </span>
      </OutsideClickHandler>

      {showOptions && (
        <div className="user_options absolute p-4 rounded-md left-8 top-2 z-10 flex flex-col gap-4">
          <Link to={`/admin/user/${user._id}`}>
            <div className="option_modal flex gap-2 cursor-pointer">
              <img src={Eye} alt="" /> View Details
            </div>
          </Link>
          {/* <div
            onClick={showConfirmOptionsHandler}
            className="userlink flex gap-2 cursor-pointer"
          >
            <img src={Eye} alt="" /> View Details
          </div> */}


          <div
            className="option_modal flex gap-2 cursor-pointer"
            onClick={showConfirmOptionsHandler}
          >
            <img src={Check} alt="" /> Accept Request
          </div>

          <div
            className="option_modal flex gap-2 cursor-pointer"
            onClick={showRejectOptionsHandler}
          >
            <img src={X} alt="" />
            Reject Request
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="accept_modal">
          <div className="accept_modal_content bg-[#333330] w-[400px] mx-auto p-6 rounded-md">
            <div className="modal_header flex justify-between">
              <img src={CheckGreenCricle} alt="" />
              <img
                className="cursor-pointer"
                onClick={modalCloseHandler}
                src={CloseButtoX}
                alt=""
              />
            </div>
            <p className="text-lg font-semibold mb-1">Accept request</p>
            <p className="text-[#B0B0B0] text-sm">
              Are you sure you want to to accept this request? This action
              cannot be undone.
            </p>
            <div className="flex gap-4 mt-8">
              <div
                onClick={modalCloseHandler}
                className="modal_button rounded-[100px] border border-white w-[352px]h-[44px]  flex justify-center items-center w-full cursor-pointer"
              >
                Cancel
              </div>
              <div
                onClick={() => userEditHandler("Accepted")}
                className="modal_button rounded-[100px] border border-primary-blue bg-primary-blue w-[352px] h-[44px] flex justify-center items-center w-full cursor-pointer"
              >
                Accept
              </div>
            </div>
          </div>
        </div>
      )}
      {showCancel && (
        <div className="accept_modal">
          <div className="accept_modal_content bg-[#333330] w-[400px] mx-auto p-6 rounded-md">
            <div className="modal_header flex justify-between">
              <img src={CancelIcon} alt="" />
              <img
                className="cursor-pointer"
                onClick={modalCloseHandlerReject}
                src={CloseButtoX}
                alt=""
              />
            </div>
            <p className="text-lg font-semibold mb-1">Reject request</p>
            <p className="text-[#B0B0B0] text-sm">
              Are you sure you want to reject this request? This action cannot
              be undone.
            </p>
            <div className="flex gap-4 mt-8">
              <div
                onClick={modalCloseHandlerReject}
                className="modal_button rounded-[100px] border border-white w-[352px]h-[44px]  flex justify-center items-center w-full cursor-pointer"
              >
                Cancel
              </div>
              <div
                onClick={() => userEditHandler("Rejected")}
                className="modal_button rounded-[100px] border border-[#F04438] bg-[#F04438] w-[352px] h-[44px] flex justify-center items-center w-full cursor-pointer"
              >
                Reject
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListOptions;
