const _ = require('lodash')

const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    reducer = (a,b) => a+b

    return blogs.length === 0
        ? 0
        : blogs.map(blog => blog.likes).reduce(reducer, 0)
}

const favoriteBlog = blogs => {
    const blogLikes = blogs.map(blog => blog.likes)
    const highestLikes = Math.max(...blogLikes)

    return blogs.find(blog => blog.likes === highestLikes)
}

const mostBlogs = blogs => {
    const totalsByAuthor = _.countBy(blogs, "author")

    let maxBlogs = {
        author: 'nobody',
        blogs: 0
    }

    for (let author in totalsByAuthor) {
        if (totalsByAuthor[author] > maxBlogs.blogs) {
            maxBlogs = {
                author: author,
                blogs: totalsByAuthor[author]
            }
        } 
    }

    return maxBlogs.blogs === 0
        ? undefined
        : maxBlogs
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}