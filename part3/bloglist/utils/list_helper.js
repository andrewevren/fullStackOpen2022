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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}