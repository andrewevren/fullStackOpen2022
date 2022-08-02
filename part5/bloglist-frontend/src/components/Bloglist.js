import Blog from './Blog'
import Blogform from './Blogform'


const Bloglist = ({blogs, user, handleLogout, submitPost, removeBlog}) => {
    const blogsByLikes = blogs.sort((a,b)=> a.likes - b.likes)
    
    return (
        <div>
            <h2>blogs</h2>
            <p>
                {user.name} logged in 
                <button onClick={handleLogout}>logout</button>
            </p>
            <h2>create new</h2>
                <Blogform submitPost={submitPost}/>
            {blogsByLikes.map(blog =>
                <Blog key={blog.id} blog={blog} user={user} removeBlog={removeBlog}/>
            )}
        </div>
)}

export default Bloglist