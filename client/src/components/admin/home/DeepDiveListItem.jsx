import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import VerDots from "../../../assets/ver-dots.svg";

import OutsideClickHandler from "react-outside-click-handler";
import { useEditItem } from '../../../context/editItemContext';




const DeepDiveListItem = ({item, deleteHandler}) => {

  // console.log("Deep Dive Item", item)
  const [showOptions, setShowOptions] = useState(false)

  const optionsToggleHandler = () => {
    setShowOptions(!showOptions)
  }

  const outSideClickHandler = (e) => {
    // console.log("e",e)
    if (e.target.classList.contains("dive_options")) {
    } else {
      setShowOptions(false);
    }
  };

  const deleteClickHandler = (id) => {
    // console.log("Delete item: ", id)
    deleteHandler('monthly', id)
  }

  const editItemHandler = useEditItem();

  const handleEdit = () => {
    editItemHandler("deep dive", item);
  };


  return (
    <>
      <div className="item_wrap p-6 flex gap-3 mx-2.5 bg-[#1B1B1F] rounded-md">
        <div className="basis-0 grow-[2] shrink-0">
          <img className='min-w-[188px] max-h-[136px]' src={item.image} alt="" />
        </div>
        <div className="basis-0 grow-[3]">

          <div className="btn_row flex items-center justify-between mb-2 relative">
            <div className="btns">
              {item.active && (<div className="button">
                <p className='text-[#027A48] border border-[#027A48] rounded-[100px] h-6 flex items-center px-4'>Active</p>
              </div>) }
              
              {!item.active && <div className="button">
                <p className='text-[#F79009] border border-[#F79009] rounded-[100px] h-6 flex items-center px-4'>Inactive</p>
              </div> }
              

            </div>

            <div className="dots ">
            <OutsideClickHandler onOutsideClick={outSideClickHandler}>
              <img onClick={optionsToggleHandler} className='min-h-3.5 cursor-pointer' src={VerDots} alt="" />
              {showOptions && (

                <div className="min-w-[180px] dive_options absolute p-4 rounded-md right-7 top-2 z-10 flex flex-col bg-black">
                  
                  <div onClick={handleEdit} className="option_modal flex gap-2 cursor-pointer text-[#B0B0B0] hover:text-white border-b border-[#222227] py-2 px-4">
                    Edit Content
                  </div>
                  <div onClick={() => deleteClickHandler(item._id)}  className="option_modal flex gap-2 cursor-pointer text-[#B0B0B0] hover:text-white py-2 px-4" >
                  Delete Content
                  </div>


                </div>
              )}
            </OutsideClickHandler>

            </div>

          </div>

          <h2 className="title font-semibold leading-6 ">{item.title}</h2>
          <p className="text-[#B0B0B0]">{item.description}</p>



        </div>
        
        


      </div>
      {/* End item_wrap */}

      
      


    </>
  )
}

export default DeepDiveListItem