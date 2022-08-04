import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('blog display', () => {
  let container

  beforeAll(() => {
    const blog = {
      title: 'Fake Blog',
      author: 'Fake Author',
      likes: 2,
      url: 'google.com'
    }

    container = render(<Blog blog={blog} />).container
  })

  test('blog renders only blog title and author by default', () => {

    const title = container.querySelector('.title')
    const author = container.querySelector('.author')
    const likes = container.querySelector('.likes')
    const url = container.querySelector('.url')

    expect(title).not.toHaveStyle( 'display: none' )
    expect(author).not.toHaveStyle( 'display: none' )
    expect(likes).toHaveStyle( 'display: none' )
    expect(url).toHaveStyle( 'display: none' )
  })
})

