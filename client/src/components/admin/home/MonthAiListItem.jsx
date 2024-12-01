import React,{useState} from 'react'
import dayjs from 'dayjs'
import VerDots from '../../../assets/ver-dots.svg'
import OutsideClickHandler from "react-outside-click-handler";
import { Link } from 'react-router-dom';
import { useEditItem } from '../../../context/editItemContext';




export const MonthAiListItem = ({item, deleteHandler}) => {
  
  // console.log("Item", item)
  const [showOptions, setShowOptions] = useState(false)

  const formatDate = (userDate) => {
    let formattedDate = dayjs(userDate).format("MM/DD/YYYY");
    return formattedDate;
  };

  const optionsToggleHandler = () => {
    setShowOptions(!showOptions)
  }

  const outSideClickHandler = (e) => {
    if (e.target.classList.contains("dive_options")) {
    } else {
      setShowOptions(false);
    }
  };

  const editItemHandler = useEditItem();
  const handleEdit = () => {
    editItemHandler("monthai", item);
  };

  const deleteClickHandler = (id) =>{
    deleteHandler('monthly',id)
  }

  const truncateDescription = (description) => {
    const words = description.split(' ');
    return words.length > 6 ? words.slice(0, 6).join(' ') + '...' : description;
  };
  const truncateTitle = (description) => {
    const words = description.split(' ');
    return words.length > 3 ? words.slice(0, 3).join(' ') + '...' : description;
  };

  return (
    <>
      <div className="flex  mt-2 mb-2 relative p-1.5 pl-6 h-[72px] items-center justify-between">
        <div className='grow-[2] flex gap-2 items-center w-full max-w-[409px]'>
          <div className=""><img className='w-[76px] h-[55px]' src={item.image} alt="" /></div>
          <div className="t">
            <p className="font-medium mb-2">{truncateTitle(item.title)}</p>
            <p className="text-[#B0B0B0] text-xs">{truncateDescription(item.description)}</p>
          </div> 
        </div>
        <div className='grow flex-1'>
              {item.active && (<div className="button inline">
                <p className='text-[#027A48] border border-[#027A48] rounded-[100px] h-6 inline-flex items-center px-2 justify-center'>Active</p>
              </div>) }
              
              {!item.active && <div className="button">
                <p className='text-[#F79009] border border-[#F79009] rounded-[100px] h-6 inline-flex items-center px-2 justify-center'>Inactive</p>
              </div> }          
        </div>
        <div className='grow flex-1 basis-0'>{item.postType}</div>
        <div className='grow flex-1 basis-0'>{formatDate(item.createdAt)}</div>
        <div className='grow flex-1 basis-0 max-w-[94px]'>

          <OutsideClickHandler onOutsideClick={outSideClickHandler}>
              <img onClick={optionsToggleHandler} className='min-h-3.5 cursor-pointer' src={VerDots} alt="" />
              {showOptions && (

                <div className="min-w-[180px] dive_options absolute p-4 rounded-md right-32 top-2 z-10 flex flex-col bg-black ">
                  
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
    </>
  )
}
