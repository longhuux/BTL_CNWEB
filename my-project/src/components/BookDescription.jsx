import React from 'react'

const BookDescription = (props) => {
    
  return (
    <div className='bg-white rounded-md p-4 space-y-4'>
        <h4>Mô tả sản phẩm</h4>
        <img src="https://salt.tikicdn.com/ts/product/c9/e4/18/a9cfc425fa590c453f20307229804bb3.jpg" alt="" />
        <div dangerouslySetInnerHTML={{ __html: props.data.description }} />

    </div>
  )
}

export default BookDescription