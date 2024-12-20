import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  component: RouteComponent,
  loader: async ({params}) => {
    return {
      postId: params.postId,
    }
  },
})

function RouteComponent() {
  const {postId} = Route.useParams()
  return <div>Hello  Post {postId}!</div>
}