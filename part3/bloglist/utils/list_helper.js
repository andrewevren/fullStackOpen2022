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

const mostLikes = blogs => {
    const groupedByAuthor = _.groupBy(blogs, 'author')
    let likesByAuthor = []

    for (let a in groupedByAuthor) {
        const totalLikes = _.sumBy(groupedByAuthor[a], function(o) { return o.likes })
        likesByAuthor.push({ author: a, likes: totalLikes })
        }
    
    likeArray = likesByAuthor.map(obj => {
        return obj.likes
    })

    return likeArray === 0
        ? undefined
        : likesByAuthor.find(author => author.likes === Math.max(...likeArray))
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}