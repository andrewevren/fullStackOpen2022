import Blog from './Blog'

const Bloglist = ({blogs, user, handleLogout}) => (
    <div>
        <h2>blogs</h2>
        <p>
            {user.name} logged in 
            <button onClick={handleLogout}>logout</button>
        </p>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
    </div>
)

export default Bloglist