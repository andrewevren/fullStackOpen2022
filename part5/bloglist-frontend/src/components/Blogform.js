const Blogform = props => {

    return(
        <form onSubmit={props.submitPost}>
            <div>
                Title:
                <input 
                    type="text"
                    value={props.title}
                    name="Title"
                    onChange={({target}) => props.setTitle(target.value)}
                />
            </div>
            <div>
                Author:
                <input 
                    type="text"
                    value={props.author}
                    name="Author"
                    onChange={({target}) => props.setAuthor(target.value)}
                />
            </div>
            <div>
                Url:
                <input 
                    type="text"
                    value={props.url}
                    name="Url"
                    onChange={({target}) => props.setUrl(target.value)}
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default Blogform