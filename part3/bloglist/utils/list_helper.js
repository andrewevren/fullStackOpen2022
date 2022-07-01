const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    reducer = (a,b) => a+b

    return blogs.length === 0
        ? 0
        : blogs.map(blog => blog.likes).reduce(reducer, 0)
}

module.exports = {
    dummy,
    totalLikes
}