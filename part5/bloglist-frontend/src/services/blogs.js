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

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const docUrl = `${baseUrl}/${id}`
  await axios.delete(docUrl,config)
  return
}

const blogService = { setToken, getAll, create, update, remove }

export default blogService