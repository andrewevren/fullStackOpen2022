import { useState } from 'react'
import blogService from '../services/blogs'

const Blogform = props => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const submitPost = () => {
        blogService.create({title,author,url})
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return(
        <form onSubmit={submitPost}>
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
    )
}

export default Blogform