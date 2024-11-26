import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { useLazyGetUserByIdQuery } from '../../slices/userApiSlice';
import ChevronRight from '../../assets/chevron-right.svg'
import ArrowLeft from '../../assets/arrow-narrow-left.svg'
import SearchIcon from '../../assets/searchIcon.svg'
import XWhite from '../../assets/xwhite.svg'
import CheckWhite from '../../assets/checkwhite.svg'
import CheckGreenCricle from "../../assets/check_green_circle.svg";
import CloseButtoX from "../../assets/Close_Button_X.svg";
import CancelIcon from "../../assets/CancelBtn.svg";
import { Link } from 'react-router-dom';
import { useEditUserAdminMutation } from "../../slices/userApiSlice";
import { toast } from "react-toastify";

const AdminUserDetails =  () => {
  let { id } = useParams();
  const [user, setUser] = useState({})
  const [onBoardingFound, setOnBoardingFound] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [userStatus, setUserStatus] = useState('')

  const showConfirmOptionsHandler = () => {
    setShowConfirm(true);
  };

  const showRejectOptionsHandler = () => {
    setShowCancel(true);
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
      toast.success("User status changed successfully!");
      setShowConfirm(false);
      setShowCancel(false);
      //changeUserStatus(editApiCall.status);
      setUserStatus(editApiCall.status)
    } else {
      toast.error("Something went wrong!");
    }

    if (isError) {
      console.log(error.message);
    }
  };




  const [trigger]= useLazyGetUserByIdQuery({id})
  useEffect(()=>{
    console.log("Use effect called !")
    const fetchData = async () => {
      const data = await trigger({id}).unwrap();
      const userData = data.user;
      console.log(userData)
      setUser(userData)
      setUserStatus(userData.status)
      if(userData.achieveArea || userData.employee || userData.goal || userData.improveArea || userData.industry || userData.mainIssue || userData.manualWorks || userData.workflow ){
        setOnBoardingFound(true)
      }

      

    }

    fetchData()
  },[])


  return (
    <>
      <div className="admin_breadcrumb flex items-center gap-3 mb-4">
        <Link to="/admin/dashboard" className="text-gray-300">Dashboard</Link>
        <p className=""><img src={ChevronRight} alt="" /></p>
        <Link to="/admin/dashboard" className="text-gray-300">Access Requests</Link>
        <p className=""><img src={ChevronRight} alt="" /></p>
        <p className="text-primary-blue">Company detail's</p>
      </div>

      <div className="flex justify-between">

        <Link to="/admin/dashboard" className="backBtn flex gap-2"><img src={ArrowLeft} alt="" /> <p className="text-white text-2xl">Company details</p></Link>

        <div className="flex gap-2">
          <p className="text-base font-raleway font-semibold" >Status</p>   
          <span className="w-full flex"> <span className={`status_text border rounded-2xl text-xs font-medium h-[22px] flex items-center px-[6px] py-[8px] ${userStatus == 'Accepted' ? 'border-[#027A48] text-[#027A48]' : ""} ${userStatus == 'Rejected' ? 'border-[#F04438] text-[#F04438]' : ""} ${userStatus == 'Pending' ? 'border-[#F79009] text-[#F79009]' : ""}`}>{userStatus}</span> </span>


        </div>
      </div>

      <div className="flex justify-between gap-4 mt-6">
        <div className="flex flex-col gap-2 w-full">
          <p className="text-gray-300">First Name <br/></p>
          <p className="">{user.firstName}</p>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <p className="text-[#B0B0B0]">Last Name <br/></p>
          <p className="">{user.lastName}</p>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <p className="text-gray-300">Company Name <br/></p>
          <p className="">{user.company}</p>
        </div>




      </div>      
      <div className="flex justify-between gap-4 mt-5">

        <div className="flex flex-col gap-2 w-full">
          <p className="text-gray-300">Email <br/></p>
          <p className="">{user.email}</p>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <p className="text-gray-300">Website <br/></p>
          <p className="">{user?.companyDetails?.website}</p>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <p className="text-gray-300">Phone Number <br/></p>
          <p className="">{user.phone}</p>
        </div>



      </div>

      <div className="h-[1px] w-full bg-[#222227] mt-5 mb-6"></div>

      <p className="text-xl text-white my-6">Onboarding Data</p>

      {!onBoardingFound ? (
        <>
          <div className='flex mx-auto justify-center items-center flex-col '>
            <img className='w-12 mb-4' src={SearchIcon} alt="" />
            <p className="text-white font-raleway font-semibold mb-1">No data found</p>
            <p className="text-[#D1D1D1] font-raleway text-sm">No data found!  information is unavailable or nonexistent.</p>
            

          </div>
        </>
      ) : ""}

      {onBoardingFound ? (
        <div className="text-gray-300">

          <div className="info_row flex gap-4 mb-5">
            <div className="info w-full">
              <p className="mb-2">1- What industry does your company operate in?</p>
              <p className="text-white">{user.industry}</p>
            </div>

            <div className="info w-full">
              <p className="mb-2">2- How many employees does your company have?</p>
              <p className="text-white">{user.employee}</p>
            </div>
          </div>

          <div className="info_row flex gap-4 mb-5">
            <div className="info w-full">
              <p className="mb-2">3- What are the main goals and objectives of your company?</p>
              <p className="text-white">{user.goal}</p>
            </div>

            <div className="info w-full">
              <p className="mb-2">4- Can you describe your current workflow?</p>
              <p className="text-white">{user.workflow}</p>
            </div>
          </div>

          <div className="info_row flex gap-4 mb-5">
            <div className="info w-full">
              <p className="mb-2">5- Which processes in your workflow are currently done manually?</p>
              <p className="text-white">{user.manualWorks}</p>
            </div>

            <div className="info w-full">
              <p className="mb-2">6- What are the main issues or challenges you face with your current workflow?</p>
              <p className="text-white">{user.mainIssue}</p>
            </div>
          </div>

          <div className="info_row flex gap-4 mb-5">
            <div className="info w-full">
              <p className="mb-2">7- Have you identified any areas where you think automation could improve your workflow?</p>
              <p className="text-white">{user.improveArea}</p>
            </div>

            <div className="info w-full">
              <p className="mb-2">8- What do you want to achieve through your DATU experience?</p>
              <p className="text-white">{user.achieveArea}</p>
            </div>
          </div>



        </div>

      ) : ""}

      {userStatus == 'Pending' ?  (
        <div className="flex justify-end gap-4">
          <div onClick={showRejectOptionsHandler} className='cursor-pointer flex gap-2 border rounded-[100px] px-5 h-10 items-center'><img src={XWhite} alt="" /><p className="text-white font-raleway font-medium">Reject</p></div>
          <div onClick={showConfirmOptionsHandler} className='cursor-pointer flex gap-2 border-primary-blue rounded-[100px] px-5 h-10 items-center bg-primary-blue'><img src={CheckWhite} alt="" /><p className="text-white font-raleway font-medium">Accept</p></div>
        </div>


      ) : ""}


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

      
    </>
  )

}

export default AdminUserDetails