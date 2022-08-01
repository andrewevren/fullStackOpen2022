import { useState } from 'react'
import Toggleable from './Toggleable'
import { useRef } from 'react'

const Blogform = props => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const blogFormRef = useRef()

    const newPost = (event) => {
        event.preventDefault()
        const blog = {title,author,url}
        props.submitPost(blog)
        setTitle('')
        setAuthor('')
        setUrl('')
        blogFormRef.current.toggleVisibility()
    }

    return(
        <Toggleable buttonLabel="new blog" ref={blogFormRef}>
            <form onSubmit={newPost}>
                <div>
                    Title:
                    <input 
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({target}) => setTitle(target.value)}
                    />
                </div>
                <div>
                    Author:
                    <input 
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({target}) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    Url:
                    <input 
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({target}) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </Toggleable>
    )
}

export default Blogform