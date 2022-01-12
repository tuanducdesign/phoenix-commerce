import React from 'react'
import { Helmet } from 'react-helmet'

const Desc = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Desc.defaultProps = {
  title: 'Welcome to Phoenix Store',
  description: 'Your best online digital store ...',
  keywords:
    'gadgets, electronics, cheap electronics, installments, backorder, back order',
}

export default Desc
