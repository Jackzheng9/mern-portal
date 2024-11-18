import React from 'react'
import { SupportListItem } from './SupportListItem'

const SupportList = ({faqs}) => {
  // console.log("faqs", faqs)
  return (
    <>
      {faqs.map(faq => <SupportListItem key={faq._id} faq={faq} />)}
    </>
  )
}

export default SupportList