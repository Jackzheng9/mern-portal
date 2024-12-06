import React, { useState } from 'react'
import Plus from '../../assets/Plus.svg'
import Minus from '../../assets/Minus.svg'




const SingleQuestion = ({faq}) => {
  const [showAnswer, setShowAnswer] = useState(false)
  return (
    <div className="py-8 px-14 mb-6 border border-[#3D3D3D] rounded-2xl">
      <div onClick={() => setShowAnswer(!showAnswer)} className="question flex justify-between items-center cursor-pointer">
        <p className="font-medium text-3xl">{faq.question}</p>
        {!showAnswer && <img className='w-[70px] h-[70px]' src={Plus} alt="" />}
        {showAnswer && <img className='w-[70px] h-[70px]' src={Minus} alt="" />}
        
      </div>
      
      {showAnswer && <p className="text-xl">{faq.answer}</p>}
      
    </div>
  )
}

export default SingleQuestion