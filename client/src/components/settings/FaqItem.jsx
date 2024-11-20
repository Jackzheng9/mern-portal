import React, { useState } from 'react'
import Plus from '../../assets/PlusCircled.svg'
import Minus from '../../assets/MinusCircled.svg'

const FaqItem = ({faq}) => {
  //console.log('faq',faq)
  const[showAnswer, setShowAnswer] = useState(false)

  return (
    <div className='single-faq border border-[#282828] p-6 rounded-2xl bg-[#131514] mb-8'>
      <div onClick={() => setShowAnswer(!showAnswer)} className="question flex justify-between items-center cursor-pointer mb-4">{faq.question} <img src={ showAnswer ? Minus : Plus} alt="" /></div>
      {showAnswer && <div className="question">{faq.answer}</div> }
    </div>
  )
}

export default FaqItem