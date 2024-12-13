import React,{useState} from 'react'
import SearchIcon from '../../../assets/searchLarge.svg'
import Plus from '../../../assets/PlusWhite.svg'
import X from '../../../assets/Close-dimmed.svg'
import Editor from 'react-simple-wysiwyg';
import { useCreateSupportMutation, useGetSupportQuery } from '../../../slices/supportApiSlice';
import Loader from '../../../components/Loader'
import {toast} from 'react-toastify'
import SupportList from './SupportList';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../../slices/faqSlice';
import LeftArrow from '../../../assets/page-arrow-left.svg'
import RightArrow from '../../../assets/page-arrow-right.svg'



const Support = () => {
  const [question, setQuestion] = useState('');
  const [html, setHtml] = useState('');
  const [showAddNew,setShowAddNew] = useState(false)
  const [checkBoxChecked,setCheckBoxChecked] = useState(true)

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  
  

  const dispatch = useDispatch();
  const searchTerm = useSelector(state => state.faq.searchTerm)

  function onChange(e) {
    setHtml(e.target.value);
    console.log("html", html)
  }

  const checkClick = (e) =>{
    setCheckBoxChecked(!checkBoxChecked)
  }

  const {data, isLoading:loadingSupport } = useGetSupportQuery()

  const [createSupport , {isLoading, isError}] = useCreateSupportMutation();
  if(isLoading || loadingSupport){
    return <Loader />
  }

  if(isError){
    return 'Something went wrong!'
  }


  const createFaqHandler = async (e) => {
    e.preventDefault();

    const data = {
      question,
      answer:html,
      active:checkBoxChecked
    }

    try {
      const apiRes = await createSupport(data).unwrap();
      setShowAddNew(false);
      toast.success("FAQ created successfully!");
      
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  console.log("data", data)
  const setSearchTextHandler = (e) => {
    dispatch(setSearchTerm(e.target.value))
  }

  const searchFilterHandler = (user) => {
    return user?.question?.toLowerCase()?.includes(searchTerm.toLowerCase());
  }

  const faqs = data.supports.filter(searchFilterHandler)
  // console.log("faqs",faqs)
  const totalPages = Math.ceil(faqs.length / itemsPerPage);
  const paginatedResources = faqs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getPaginationNumbers = () => {
    const paginationNumbers = [];
    const maxPagesToShow = 5; // Total number of page buttons to show
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - (maxPagesToShow - 1);
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationNumbers.push(i);
    }

    // Add ellipses if needed
    if (startPage > 1) {
      paginationNumbers.unshift('...');
      paginationNumbers.unshift(1);
    }
    if (endPage < totalPages) {
      paginationNumbers.push('...');
      paginationNumbers.push(totalPages);
    }

    return paginationNumbers;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='relative'>
      <h1 className="text-2xl font-medium mb-8">Support</h1>
      <div className="searchBar flex justify-between items-center">
        <form action="">
          <div className="search_input relative">
            <img className='absolute left-4 top-3' src={SearchIcon} alt="" />
            <input onChange={setSearchTextHandler} className='text-[#B0B0B0] bg-transparent pl-11 pr-2 h-11 rounded-lg border border-[#3D3D3D] w-80' type="text" placeholder='Search' />
          </div>
        </form>

        <button onClick={() => setShowAddNew(true)} className='flex items-center gap-2 h-11 rounded-[100px] px-6 bg-primary-blue'><img src={Plus} alt="" /> Add new</button>
      </div>

      <div className="faqs_header flex justify-between text-[#707070] mt-8 gap-11 pb-3 border-b border-[#222227]">
        <div className="content"><p className="">Content</p> </div>
        <div className="actions flex gap-12">
          <p className="">Actions</p>
          <p className="">Actions</p>
        </div>
      </div>

      <SupportList faqs={paginatedResources} />

      <div className="pagination text-[#5D5D5D] flex justify-between items-center mt-4">
          <button className='flex gap-3.5 items-center' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            <img src={LeftArrow} alt="" /> Previous
          </button>

          <div className="pageNumbers">
          {getPaginationNumbers().map((page, index) => (
            <button
              className={`px-4 py-2.5 ${currentPage == page ? 'bg-[#1B1B1F] text-[#454545]' : ''}`}
              key={index}
              onClick={() => typeof page === 'number' && handlePageChange(page)}
              disabled={currentPage === page}
            >
              {page}
            </button>
          ))}
          </div>

          <button className='flex gap-3.5 items-center' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
            <img src={RightArrow} alt="" />
          </button>
        </div>




      {showAddNew && (

        <div className="createFaq absolute w-full h-full min-h-[80vh] left-0 top-0 backdrop-blur flex justify-center ">
          <div className="create_support_content p-11 bg-[#1B1B1F] rounded-lg max-w-[80%] mx-auto">
            
            <div className="flex justify-between">
              <div className='max-w-[60%]'>
                <h1 className='font-medium text-lg'>Add New FAQ</h1>
                <p className="text-[#B0B0B0] text-xs]">Create a new Frequently Asked Question entry. Provide a clear and concise question and answer to help users find information quickly.</p>
              </div>
              <img onClick={() => setShowAddNew(false)} src={X} className='cursor-pointer' alt="" />
            </div>

            <div className="form_section mt-8">
              <form onSubmit={createFaqHandler}>

                <div className="input_group">
                  <label className='text-lg font-semibold block mb-1.5'  htmlFor="ques">Question</label>
                  <input value={question} onChange={(e) => setQuestion(e.target.value)} className='bg-transparent rounded-lg h-11 px-3 flex items-center border border-[#3D3D3D] w-full ' type="text" id="ques" placeholder='Question goes here...' />
                </div>

                <div className="input_group mt-5">
                  <label className='text-lg font-semibold block mb-1.5' htmlFor="que">Answer</label>
                  {/* <input className='bg-transparent rounded-lg h-11 px-3 flex items-center border border-[#3D3D3D] w-full ' type="text" id="ques" placeholder='Question goes here...' /> */}
                  <Editor value={html} onChange={onChange} />
                </div>

                <div className="publish_action mb-12 flex gap-2 items-center font-medium mt-[30px]">
                  <label className="switch" htmlFor='switch'>
                    <input onChange={checkClick} type="checkbox" id="switch" checked={checkBoxChecked} />
                    <span className="slider round"></span>
                  </label>
                  {checkBoxChecked && <p className="t">Active</p> }
                  {!checkBoxChecked && <p className="t">Inactive</p> }
                  
                </div>

                <div className="flex justify-end gap-4">
                  <div onClick={() => setShowAddNew(false)} className="flex h-11 items-center rounded-[100px] border px-6 cursor-pointer">Cancel</div>
                  <button className='flex h-11 items-center rounded-[100px] bg-primary-blue px-6'>Publish</button>
                </div>

              </form>
            </div>
          </div>
        </div>

      )}





    </div>
  )
}

export default Support