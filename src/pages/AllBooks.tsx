"use client"

import { Card } from '@/components/ui/card';
import { useDeleteBookMutation, useGetAllBookQuery } from '@/redux/api/bookApi';
import { Link } from 'react-router'
import BorrowBookDialog from '@/features/home/BorrowBookDialog';



export default function AllBooks() {
  const [deleteBook] = useDeleteBookMutation(undefined)

  const handleDeleteBook = async (id: string) => {
    console.log("id", id)
    await deleteBook(id)
  }
  const { data, isLoading } = useGetAllBookQuery(undefined);
  if (isLoading) return <div>Loading...</div>;



  return (
    <>
      <section className="grid grid-cols-3 gap-4 p-16 bg-teal">
        {data.data.map((book: any) => {
          return (
            <Card
              key={book._id}
              className="p-4 w-96"
            >
              <Link to={`/books/${book._id}`}>
                <div className="cursor-pointer">
                  <img className="w-96" src="/images/book.png" alt="" />
                  <h3 className="text-2xl">{book.title}</h3>
                  <p>{book.description}</p>
                  <div className="flex items-center justify-between">
                    <p>Genre: {book.genre}</p>
                    <p>Copies: {book.copies}</p>
                  </div>
                </div>
              </Link>
              <div className="flex items-center justify-between">
                <p onClick={() => handleDeleteBook(book._id)} className="text-red-500 outline px-2 py-1 rounded-sm">
                  Delete
                </p>
                <Link to={`/edit-book/${book._id}`}>
                  Edit
                </Link>
                <div>
                  <BorrowBookDialog book={book} />
                </div>
              </div>
            </Card>

          );
        })}

      </section>
    </>
  )
}
