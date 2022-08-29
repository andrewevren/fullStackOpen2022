import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blogform from './Blogform'

test('calls submitPost correctly when form submitted', async () => {
  const mockHandler = jest.fn()
  const user = userEvent.setup()

  render(<Blogform submitPost={mockHandler} />)

  const newButton = screen.getByText('new blog')
  await user.click(newButton)

  const title = screen.getByPlaceholderText('Blog title...')
  const author = screen.getByPlaceholderText('Blog author...')
  const url = screen.getByPlaceholderText('Blog url...')
  const submit = screen.getByText('create')

  await user.type(title, 'Fake Blog')
  await user.type(author, 'Fake Author')
  await user.type(url, 'google.com')
  await user.click(submit)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]).toEqual({ title: 'Fake Blog', author: 'Fake Author', url: 'google.com' })
})