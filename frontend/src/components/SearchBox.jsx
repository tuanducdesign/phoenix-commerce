import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import Style from './Search.Module.css'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <div className={Style.search}>
        <label htmlFor='' className={Style.labelForm}>
          <input
            className={Style.inputForm}
            type='text'
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search Products'
          />
          <i
            className={`fa fa-search ${Style.iconSearch}`}
            aria-hidden='true'
          ></i>
        </label>
        {/* <Button type='submit' className='p-2 cartBtn'>
          Search
        </Button> */}
      </div>
    </Form>
  )
}

export default SearchBox
