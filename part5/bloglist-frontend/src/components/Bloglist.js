import Blog from './Blog'
import Blogform from './Blogform'
import Toggleable from './Toggleable'

const Bloglist = ({blogs, user, handleLogout, ...formProps}) => (
    <div>
        <h2>blogs</h2>
        <p>
            {user.name} logged in 
            <button onClick={handleLogout}>logout</button>
        </p>
        <h2>create new</h2>
        <Toggleable buttonLabel="new blog">
            <Blogform {...formProps}/>
        </Toggleable>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
    </div>
)

export default Bloglist