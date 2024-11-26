import React, { useState } from "react";
import VerDots from "../../assets/ver-dots.svg";
import Eye from "../../assets/eye.svg";
import Check from "../../assets/check.svg";
import X from "../../assets/x.svg";
import CloseCircledBlack from "../../assets/CloseCircledBlack.svg";
import CheckGreenCricle from "../../assets/check_green_circle.svg";
import CloseButtoX from "../../assets/CloseWhite.svg";
import CancelIcon from "../../assets/CancelBtn.svg";
import OutsideClickHandler from "react-outside-click-handler";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useEditSolutionMutation, useDeleteSolutionMutation } from "../../slices/solutionApiSlice";

const SolutionListOptions = ({solution}) => {
  
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
  
  const [deleteSolution,{isLoading, isError}] = useDeleteSolutionMutation();

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



  const solutionDeleteHandler = async () => {
    const data = {
      id: solution._id
    }

    try {
      const apiRes = await deleteSolution(data).unwrap()
      toast.success("Solution deleted successfully!")
    } catch (error) {
      console.log("Error", error)
      toast.error("Something went wrong!")
    }
    
  }

  return (
    <div className="grow basis-0 w-full max-w-[97px]">
      <OutsideClickHandler onOutsideClick={outSideClickHandler}>
        <span
          onClick={optionClickHandler}
          className="user_options_wrap w-full relative block"
        >
          <img className="cursor-pointer" src={VerDots} alt="" />
        </span>
      </OutsideClickHandler>

      {showOptions && (
        <div className="min-w-[180px] user_options absolute p-4 rounded-md right-20 top-2 z-10 flex flex-col gap-4">
          <Link to={`/admin/solutions/${solution.slug}`}>
            <div className="option_modal flex gap-2 cursor-pointer py-2.5">
              View Solution
            </div>
          </Link>
          <div onClick={showModalHandler} className="option_modal flex gap-2 cursor-pointer py-2.5" >
             Delete Solution
          </div>

          
        </div>
      )}

      {showPublish && (
        <div className="accept_modal">
          <div className="accept_modal_content bg-[#333330] w-[400px] mx-auto p-6 rounded-md">
            <div className="modal_header flex justify-between mb-4">
              <img src={CloseCircledBlack} alt="" />
              <img
                className="cursor-pointer"
                onClick={modalCloseHandler}
                src={CloseButtoX}
                alt=""
              />
            </div>
            <p className="text-lg font-semibold mb-1">Delete Content</p>
            <p className="text-[#B0B0B0] text-sm">Are you sure you want to delete the uploaded? This action cannot be undone. </p>
            <div className="flex gap-4 mt-8">
              <div
                onClick={modalCloseHandler}
                className="modal_button rounded-[100px] border border-white w-[352px]h-[44px]  flex justify-center items-center w-full cursor-pointer"
              >
                Cancel
              </div>
              <div
                onClick={solutionDeleteHandler}
                className="modal_button rounded-[100px] border border-primary-blue bg-[#F04438] w-[352px] h-[44px] flex justify-center items-center cursor-pointer"
              >
                Delete
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default SolutionListOptions