import React, { useState } from "react";
import VerDots from "../../assets/ver-dots.svg";
import Eye from "../../assets/eye.svg";
import Check from "../../assets/check.svg";
import X from "../../assets/x.svg";
import CheckGreenCricle from "../../assets/check_green_circle.svg";
import CloseButtoX from "../../assets/Close_Button_X.svg";
import CancelIcon from "../../assets/CancelBtn.svg";
import OutsideClickHandler from "react-outside-click-handler";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useEditSolutionMutation } from "../../slices/solutionApiSlice";

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
  
  const [editSolution,{isLoading, isError}] = useEditSolutionMutation();

  const showModalHandler = () => {
    setShowPublish(true)
  }
  const modalCloseHandler = () =>{
    setShowPublish(false)
  }

  const showDraftModalHandler = () => {
    setShowDraft(true)
  }

  const modalCloseHandlerDraft = () => {
    setShowDraft(false)
  }

  const resourceEditHandler = async (status) => {
    const data = {
      status,
      id:resource._id
    }

    try {
      const editedSolutionRes = await editSolution(data).unwrap();
      console.log("edited", editedSolutionRes)
      setShowDraft(false);
      setShowPublish(false);
      toast.success("Operation successful!")
    } catch (error) {
      console.log("Error", error)
      toast.error("Something went wrong, please try again!")
    }

    

  }

  return (
    <div className="grow basis-0 relative w-full">
      <OutsideClickHandler onOutsideClick={outSideClickHandler}>
        <span
          onClick={optionClickHandler}
          className="user_options_wrap w-full relative block"
        >
          <img className="cursor-pointer" src={VerDots} alt="" />
        </span>
      </OutsideClickHandler>

      {showOptions && (
        <div className="min-w-[180px] user_options absolute p-4 rounded-md left-8 top-2 z-10 flex flex-col gap-4">
          <Link to={`/admin/resources/${resource.slug}`}>
            <div className="option_modal flex gap-2 cursor-pointer">
              <img src={Eye} alt="" /> View Details
            </div>
          </Link>
          <div onClick={showModalHandler} className="option_modal flex gap-2 cursor-pointer" >
            <img src={Check} alt="" /> Publish Solution
          </div>

          <div onClick={showDraftModalHandler} className="option_modal flex gap-2 cursor-pointer" >
            <img src={X} alt="" /> Draft Solution
          </div>
        </div>
      )}

      {showPublish && (
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
            <p className="text-lg font-semibold mb-1">Publish Resource?</p>
            <p className="text-[#B0B0B0] text-sm">
              Are you sure you want to to make this resource published?
            </p>
            <div className="flex gap-4 mt-8">
              <div
                onClick={modalCloseHandler}
                className="modal_button rounded-[100px] border border-white w-[352px]h-[44px]  flex justify-center items-center w-full cursor-pointer"
              >
                Cancel
              </div>
              <div
                onClick={() => resourceEditHandler("Published")}
                className="modal_button rounded-[100px] border border-primary-blue bg-primary-blue w-[352px] h-[44px] flex justify-center items-center w-full cursor-pointer"
              >
                Publish
              </div>
            </div>
          </div>
        </div>
      )}
      {showDraft && (
        <div className="accept_modal">
          <div className="accept_modal_content bg-[#333330] w-[400px] mx-auto p-6 rounded-md">
            <div className="modal_header flex justify-between">
              <img src={CancelIcon} alt="" />
              <img
                className="cursor-pointer"
                onClick={modalCloseHandlerDraft}
                src={CloseButtoX}
                alt=""
              />
            </div>
            <p className="text-lg font-semibold mb-1">Unpublish Resource?</p>
            <p className="text-[#B0B0B0] text-sm">
              Are you sure you want to make this resource Draft? 
            </p>
            <div className="flex gap-4 mt-8">
              <div
                onClick={modalCloseHandlerDraft}
                className="modal_button rounded-[100px] border border-white w-[352px]h-[44px]  flex justify-center items-center w-full cursor-pointer"
              >
                Cancel
              </div>
              <div onClick={() => resourceEditHandler("Draft")}
                className="modal_button rounded-[100px] border border-[#F04438] bg-[#F04438] w-[352px] h-[44px] flex justify-center items-center w-full cursor-pointer"
              >
                Draft
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResourceListOptions