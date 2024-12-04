import React, { useState } from "react";
import VerDots from "../../assets/ver-dots.svg";
import Eye from "../../assets/eye.svg";
import Check from "../../assets/check.svg";
import X from "../../assets/x.svg";
import CheckGreenCricle from "../../assets/check_green_circle.svg";
import CloseButtoX from "../../assets/CloseWhite.svg";
import CancelIcon from "../../assets/CancelBtn.svg";
import DeleteIconWhite from "../../assets/DeleteIconWhite.svg";
import RedCloseCircledIcon from "../../assets/RedCloseCircledIcon.svg";
import OutsideClickHandler from "react-outside-click-handler";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDeleteResourceMutation } from "../../slices/resourcesApiSlice";

const ResourceListOptions = ({resource}) => {
  
  const [showOptions, setShowOptions] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const [showDraft, setShowDraft] = useState(false);


  const optionClickHandler = (e) => {
    setShowOptions(!showOptions);
  };

  const outSideClickHandler = (e) => {
    if (e.target.classList.contains("option_modal")) {
    } else {
      setShowOptions(false);
    }
  };
  
  const [deleteResource,{isLoading, isError}] = useDeleteResourceMutation();

  const showModalHandler = () => {
    setShowPublish(true)
  }
  const modalCloseHandler = () =>{
    setShowPublish(false)
  }


  const resourceDeleteHandler = async () => {
    const data = {
      id:resource._id
    }
    // console.log("data", data)

    
    try {
      const deletedResource = await deleteResource(data).unwrap();
      setShowPublish(false);
      toast.success("Resource deleted successfully!")
    } catch (error) {
      console.log("Error", error)
      toast.error("Something went wrong, please try again!")
    }
    
    

  }

  return (
    <div className="grow basis-0 relative w-full max-w-[97px] flex justify-center">
      <OutsideClickHandler onOutsideClick={outSideClickHandler}>
        <span
          onClick={optionClickHandler}
          className="user_options_wrap w-full relative block"
        >
          <img className="cursor-pointer" src={VerDots} alt="" />
        </span>
      </OutsideClickHandler>

      {showOptions && (
        <div className="min-w-[180px]  absolute p-4 rounded-md right-20 top-2 z-10 flex flex-col gap-4 bg-[#1B1B1F]">
          <Link to={`/admin/resources/${resource.slug}`}>
            <div className="option_modal flex gap-2 cursor-pointer">
              <img src={Eye} alt="" /> View Content
            </div>
          </Link>
          <div onClick={showModalHandler} className="option_modal flex gap-2 cursor-pointer" >
            <img src={DeleteIconWhite} alt="" /> Delete Content
          </div>
        </div>
      )}

      {showPublish && (
        <div className="accept_modal">
          <div className="accept_modal_content bg-[#333330] w-[400px] mx-auto p-6 rounded-md">
            <div className="modal_header flex justify-between">
              <img src={RedCloseCircledIcon} alt="" />
              <img
                className="cursor-pointer"
                onClick={modalCloseHandler}
                src={CloseButtoX}
                alt=""
              />
            </div>
            <p className="text-lg font-semibold mb-1">Delete Content</p>
            <p className="text-[#B0B0B0] text-sm">Are you sure you want to delete the uploaded? This action cannot be undone.</p>
            <div className="flex gap-4 mt-8">
              <div
                onClick={modalCloseHandler}
                className="modal_button rounded-[100px] border border-white w-[352px]h-[44px]  flex justify-center items-center w-full cursor-pointer"
              >
                Cancel
              </div>
              <div onClick={resourceDeleteHandler}
                className="modal_button rounded-[100px] bg-[#F04438]  h-[44px] flex justify-center items-center w-full cursor-pointer"> Delete
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default ResourceListOptions