import React from 'react'

const ForumCard = ({ getSearchTag, tag, text }) => {
  return (
    <div className='posts-card'>
      <h2 className='posts-tag' onClick={() => getSearchTag(tag)} >${tag} </h2>
      <p className="posts-text">${tag} {text}</p>
    </div>
  )
}

export default ForumCard