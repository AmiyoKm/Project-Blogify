import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { login } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowRightIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

export const loginSchema = z.object({
  email : z.string().email({
    message : "Invalid email address"
  }),
  password : z.string()
})


function RouteComponent() {
 const navigate = useNavigate()
  const  form = useForm<z.infer<typeof loginSchema>>({
    resolver : zodResolver(loginSchema),
    defaultValues : {
      email : "",
      password : ""
    }
  })
 const {mutate , isError , error} = useMutation({
    mutationKey : ['login'],
    mutationFn : login,
    onError : (error)=> {
      console.log(error)
    } ,
    onSuccess : ()=>
      navigate({
        to : '/',
        replace : true
      })

  })
  const onSubmit = async (data : z.infer<typeof loginSchema>) => {
    console.log(data);
    mutate(data)
  }
  return <div className='flex flex-col justify-center items-center h-screen'>
    {isError && <div className='bg-red-500 text-white p-4 rounded-lg mb-4'>{error?.message}</div>}
    <h1 className='font-semibold text-2xl'>Login</h1>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w-1/3 shadow-lg p-4 rounded-lg'>
        <FormField
        control={form.control}
        name='email'
        render={({field})=>(
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input className='w-full' placeholder='email...' {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name='password'
        render={({field})=>(
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type='password' className='w-full' placeholder='password...' {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <Button effect='expandIcon'  icon={ArrowRightIcon} iconPlacement="right" type='submit'>Login</Button>
      </form>

    </Form>
  </div>
}
