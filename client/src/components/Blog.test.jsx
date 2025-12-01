import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog/>', () => {
  let container

  const mockHandleLike = vi.fn()
  const mockHandleDelete = vi.fn()

  const blog = {
    title: 'Title that renders nicely',
    author: 'Harold',
    url: 'http://www.notrendered.com',
    likes: 0,
    user: {
      username: 'tom27',
      name: 'Tom',
      id: '68173fb9b3f32a93cfbd9310',
    },
    comments: [
      {
        body: 'A nice comment',
        id: '684fad8cdda260cc72ab0d51',
      },
      {
        body: 'Some nasty comment',
        id: '684fbb2fdda260cc72ab0d79',
      },
    ],
    id: '6825f87516873ca5e15279e9',
  }

  const user = {
    username: 'tom27',
    name: 'Tom',
    blogs: [
      {
        title: 'An interesting blog title',
        author: 'Tom Snow',
        url: 'www.blogs.com/blogs/25',
        likes: 0,
        id: '681ee8d6b5bdaee3a062e887',
      },
      {
        title: 'Title that renders nicely',
        author: 'Harold',
        url: 'http://www.notrendered.com',
        likes: 0,
        id: '6825f87516873ca5e15279e9',
      },
    ],
    id: '68173fb9b3f32a93cfbd9310',
  }

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        processLike={mockHandleLike}
        processDelete={mockHandleDelete}
        user={user}
      />
    ).container
  })

  test('Renders Blog Title and Author and not URL or Likes', () => {
    const title = screen.queryByText(blog.title, { exact: false })
    const author = screen.queryByText(blog.author, { exact: false })
    const url = screen.queryByText(blog.url, { exact: false })
    const likes = screen.queryByText('Likes 0', { exact: false })

    expect(title).not.toHaveStyle('display:none')
    expect(author).not.toHaveStyle('display:none')
    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()
  })

  test('When View Button clicked URL and Likes are shown', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const title = screen.queryByText('Title that renders nicely', {
      exact: false,
    })
    const author = screen.queryByText('Harold', { exact: false })
    const url = screen.queryByText('http://www.notrendered.com', {
      exact: false,
    })
    const likes = screen.queryByText('Likes 0', { exact: false })

    expect(title).not.toHaveStyle('display:none')
    expect(author).not.toHaveStyle('display:none')
    expect(url).not.toHaveStyle('display:none')
    expect(likes).not.toHaveStyle('display:none')
  })

  test('When Like Button is clicked twice event handler function is called twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('View')
    await user.click(viewButton)
    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    const title = screen.queryByText('Title that renders nicely', {
      exact: false,
    })
    const author = screen.queryByText('Harold', { exact: false })
    const url = screen.queryByText('http://www.notrendered.com', {
      exact: false,
    })
    const likes = screen.queryByText('Likes 0', { exact: false })

    expect(title).not.toHaveStyle('display:none')
    expect(author).not.toHaveStyle('display:none')
    expect(url).not.toHaveStyle('display:none')
    expect(likes).not.toHaveStyle('display:none')
    expect(mockHandleLike.mock.calls).toHaveLength(2)
  })
})
