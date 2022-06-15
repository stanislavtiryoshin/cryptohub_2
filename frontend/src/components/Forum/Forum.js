import React, {useState, useEffect} from 'react'
import api from '../../api/coins'
import './Forum.css'
import ForumCard from './ForumCard'
import { v4 as uuidv4 } from 'uuid'

const Forum = ({ coinTag }) => {
  const [postsArr, setPostsArr] = useState([])
  const [initialPosts, setInitialPosts] = useState([])

  const retrievePosts = async () => {
    const response = await api.get("/posts")
    return response.data
  }

  useEffect(() => {
    const getPosts = async () => {
      const allPosts = await retrievePosts()
      if (allPosts) {setPostsArr(allPosts); setInitialPosts(allPosts)}
    }
    getPosts()
  }, [])

  const [tag, setTag] = useState('')
  const [text, setText] = useState('')

  const handleTagChange = (e) => {
    setTag(e.target.value.toUpperCase())
  }

  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const submit = async (e) => {
    e.preventDefault()
    await api.post("/posts", {
      id: uuidv4(),
      tag: tag,
      text: text
    })
    const newPosts = await api.get("/posts")
    setPostsArr(newPosts.data)
    setTag('')
    setText('')
  }

  const [searchTag, setSearchTag] = useState('')

  const getSearchTag = (tag) => {
    setSearchTag(tag)
    console.log(searchTag)
  }

  useEffect(() => {
    const filteredPosts = postsArr.filter(post => post.tag.includes(searchTag))
    setPostsArr(filteredPosts)
    console.log(postsArr)
  }, [searchTag])

  const clearSearchTag = () => {
    setSearchTag('')
    setPostsArr(initialPosts)
    console.log(searchTag)
  }

  return (
    <section className={coinTag ? "posts-section simple" : "posts-section"}>
      {!coinTag && 
        <div className="posts-input">
          <form onSubmit={submit}>
            <input 
              type="text" 
              placeholder='tag'
              name='tag'
              value={tag}
              onChange={handleTagChange}
            />
            <input 
              id='text-input'
              type="text" 
              placeholder='text'
              name='tag'
              value={text}
              onChange={handleTextChange}
            />
            <input type="submit" value="Submit" className='btn-pink-solid'/>
          </form>
          <button onClick={() => clearSearchTag()} className='btn-pink-solid' id='btn-clear'>Clear</button>
        </div>
      }
      {coinTag && 
        <h2>Forum on ${coinTag}</h2>
      }
      <div className="posts-box">
        {coinTag && 
          postsArr?.filter(post => post.tag.includes(coinTag)).map(post => {
            return (
              <div className="posts-card-wrap">
              <ForumCard getSearchTag={getSearchTag} tag={post.tag} text={post.text} />
              </div>
            )
          })
        }
        {!coinTag && 
          postsArr?.map(post => {
            return (
              <div className="posts-card-wrap">
                <ForumCard getSearchTag={getSearchTag} tag={post.tag} text={post.text} />
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default Forum