import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

export default function PostList() {
  const [posts, setPosts] = useState({})

  const fetchPosts = async () => {
    const { data } = await axios.get('http://posts.com/posts')
    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const renderedPosts = Object.values(posts).map((post) => (
    <div
      className="card"
      style={{ width: '30%', marginBottom: '20px' }}
      key={post.id}
    >
      <div className="card-body">
        deneme221
        <h3>{post.title}</h3>
        <CommentList postId={post.id} comments={post.comments} />
        <CommentCreate postId={post.id} />
      </div>
    </div>
  ))

  return <div className="row">{renderedPosts}</div>
}
