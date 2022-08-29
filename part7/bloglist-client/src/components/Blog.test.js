import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog display', () => {
  let container

  beforeEach(() => {
    const blog = {
      title: 'Fake Blog',
      author: 'Fake Author',
      likes: 2,
      url: 'google.com'
    }

    container = render(<Blog blog={blog} incrementLikes/>).container
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

  test('blog renders likes and url after button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likes = container.querySelector('.likes')
    const url = container.querySelector('.url')
    expect(likes).not.toHaveStyle( 'display: none' )
    expect(url).not.toHaveStyle( 'display: none' )
  })
})

test('incrementLikes is called each time like button is clicked', async () => {
  const blog = {
    title: 'Fake Blog',
    author: 'Fake Author',
    likes: 2,
    url: 'google.com'
  }

  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} incrementLikes={mockHandler}/>)

  const user = userEvent.setup()
  const button = container.querySelector('.likeButton')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

