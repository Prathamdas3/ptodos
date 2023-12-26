import prisma from '@/libs/db'
import { addTodo } from '@/libs/actions'
import Link from 'next/link'
import Status from '@/components/status'

const deleteTodo = async (id: string) => {
  'use server'
  const headers = {
    'Content-Type': 'application/json',
  }
  const url = `http://localhost:3000/api/todos/${id}`
  try {
    const data = await fetch(url, { method: 'DELETE', headers: headers })
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

export default async function Page() {
  const todos = await prisma.todos.findMany()

  return (
    <section className="flex   gap-5">
      <div className="p-3">
        <h2 className="font-bold text-2xl p-3"> Add todo </h2>

        <form action={addTodo} className="flex flex-col gap-4 mt-2 p-3">
          <input
            type="text"
            name="title"
            placeholder="write todos here "
            className="rounded-lg bg-neutral-800 p-2 "
          />

          <button
            type="submit"
            className="bg-neutral-700 p-2 rounded-2xl font-bold text-2xl"
          >
            Add
          </button>
        </form>
      </div>
      <div className="w-60 p-3">
        <h2 className="font-bold text-2xl pb-2">Note List</h2>

        {todos.map(({ id, title }) => (
          <div
            className="flex justify-around  rounded-md pr-8 pl-2 py-1 "
            key={id}
          >
            <Status id={id} deleteTodo={deleteTodo} />
            <Link href={`/todos/${id}`}>
              <h4 className="font-medium text-lg hover:underline">{title}</h4>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
