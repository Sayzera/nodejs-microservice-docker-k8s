const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()

app.use(cors())
app.use(express.json())

const posts = {}

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data
    posts[id] = { id, title, comments: [] }
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data
    const post = posts[postId]
    post.comments.push({ id, content: content, status })
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data
    const post = posts[postId]
    const comment = post.comments.find((comment) => comment.id === id)
    comment.status = status
    comment.content = content
  }
}

app.get('/posts', async (req, res) => {
  res.send(posts)
})

app.post('/events', async (req, res) => {
  const { type, data } = req.body

  handleEvent(type, data)
  return res.send({})
})

app.listen(4002, async () => {
  /**
   * servis eğer bir şekilde kapandıysa, servis yeniden başladığında ilgili eventleri alır ve çalıştırır
   */
  console.log('Listening on 4002')

  const { data } = await axios.get('http://event-bus-srv:4005/events')
  for (let event of data) {
    console.log('Processing event:', event.type)
    handleEvent(event.type, event.data)
  }
})
