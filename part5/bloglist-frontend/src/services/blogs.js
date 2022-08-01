import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl,newBlog,config)
  return response.data
}

const update = async (updatedBlog, id) => {
  const docUrl = `${baseUrl}/${id}`
  await axios.put(docUrl,updatedBlog)
  return
}

export default { setToken, getAll, create, update }