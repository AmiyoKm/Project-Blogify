import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import '@/index.css'
export const Route = createRootRoute({
  component: () => (
    <>
      {/* <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        {' '}
        <Link to="/posts" search={{
            q: '1'
        }} className="[&.active]:font-bold">
          Posts
        </Link>
      </div> */}
      <hr />
      <div className='w-full h-full'>
      <Outlet />

      </div>
       <TanStackRouterDevtools />
      <ReactQueryDevtools buttonPosition='bottom-right' />
    </>
  ),
})