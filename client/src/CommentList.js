import React, { useState } from 'react'
import axios from 'axios'

export default function CommentList({ comments }) {
  const renderedComments = comments?.map((comment) => (
    <li key={comment.id}>{comment.content}</li>
  ))

  return (
    <div>
      <ul>{renderedComments}</ul>
    </div>
  )
}
