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

  return (
    <>
      <div className="flex  mt-2 mb-2 relative">
        <div className='grow-[2] flex gap-2 items-center w-[409px]'>
          <div className=""><img className='max-w-[76px]' src={item.image} alt="" /></div>
          <div className="t">
            <p className="font-medium mb-2">{item.title}</p>
            <p className="text-[#B0B0B0] text-xs">{item.description}</p>
          </div> 
        </div>
        <div className='grow-[1]'>
              {item.active && (<div className="button inline">
                <p className='text-[#027A48] border border-[#027A48] rounded-[100px] h-6 inline-flex items-center px-2 justify-center'>Active</p>
              </div>) }
              
              {!item.active && <div className="button">
                <p className='text-[#F79009] border border-[#F79009] rounded-[100px] h-6 inline-flex items-center px-2 justify-center'>Inactive</p>
              </div> }          
        </div>
        <div className='grow-[1]'>{item.postType}</div>
        <div className='grow-[1]'>{formatDate(item.createdAt)}</div>
        <div className='grow-[1]'>

        <OutsideClickHandler onOutsideClick={outSideClickHandler}>
              <img onClick={optionsToggleHandler} className='min-h-3.5 cursor-pointer' src={VerDots} alt="" />
              {showOptions && (

                <div className="min-w-[180px] dive_options absolute p-4 rounded-md right-32 top-2 z-10 flex flex-col gap-4 bg-black">
                  <Link to={``}>
                    <div onClick={handleEdit} className="option_modal flex gap-2 cursor-pointe text-[#B0B0B0] hover:text-white">
                    Edit Content
                    </div>
                  </Link>
                  <div onClick={() => deleteClickHandler(item._id)}  className="option_modal flex gap-2 cursor-pointer text-[#B0B0B0] hover:text-white" >
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
