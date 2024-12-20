import { Button } from '@/components/ui/button'
import { createFileRoute, Link, useSearch } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/')({
  component: RouteComponent,
  validateSearch : (search)=>{
    return {
      q : search.q as String || ''
    }
  },
  loaderDeps : ({search : {q}}) => ({q}),
  loader: async({deps : {q} })=>{
    const posts = [{
      id: "1",
      title: 'Post 1',
      content: 'This is post 1',
    }, {
      id: "2",
      title: 'Post 2',
      content: 'This is post 2',
    },
    {
      id: "3",
      title: 'Post 3',
      content: 'This is post 3',
    }]
    return {
      posts : posts.filter(post => post.id == q) 
    }
  }

})

function RouteComponent() {
  const {posts} = Route.useLoaderData()
  const {q} = Route.useSearch()
  console.log(q);
  
  return <div className='space-y-2 pl-4'>
    {posts.map(post => (
      <div  key={post.id}>
        <Link to='/posts/$postId' params={{
          postId: String(post.id),
        }}><Button>{post.title}</Button></Link> 
      </div>
    ))}
  </div>
}
