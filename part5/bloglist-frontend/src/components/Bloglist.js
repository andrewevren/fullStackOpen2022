import Blog from './Blog'
import Blogform from './Blogform'

const Bloglist = ({blogs, user, handleLogout, ...formProps}) => (
    <div>
        <h2>blogs</h2>
        <p>
            {user.name} logged in 
            <button onClick={handleLogout}>logout</button>
        </p>
        <h2>create new</h2>
        <Blogform {...formProps}/>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
    </div>
)

export default Bloglist