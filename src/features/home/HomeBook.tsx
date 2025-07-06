"use client"

import { Card } from '@/components/ui/card';
import { useGetAllBookQuery } from '@/redux/api/bookApi';
import { Link } from 'react-router'
import BorrowBookDialog from './BorrowBookDialog';



export default function HomeBook() {
    const { data, isLoading } = useGetAllBookQuery(undefined);
    if (isLoading) return <div>Loading...</div>;


    return (
        <>
            <section className="grid grid-cols-4 gap-4 p-4 my-8">
                {data.data.slice(0, 4).map((book: any) => {
                    return (
                        // <Link to={`/books/${book._id}`}>
                        <Card
                            key={book._id}
                            className="cursor-pointer p-4 w-80"
                        >
                            <div className="cursor-pointer">
                                <img className="w-72 h-72" src="/images/book-2.png" alt="" />
                                <h3 className="text-2xl">{book.title}</h3>
                                <p>{book.description}</p>
                                <div className="flex items-center justify-between">
                                    <p>Genre: {book.genre}</p>
                                    <p>Copies: {book.copies}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <p onClick={() => handleDeleteBook(book._id)} className="text-red-500 outline px-2 py-1 rounded-sm">
                                    Delete
                                </p>
                                <Link to={`/edit-book/${book._id}`}>
                                    Edit
                                </Link>
                                {book.available ? <div>
                                    <BorrowBookDialog book={book} />
                                </div>
                                : "Not Available"}
                            </div>
                        </Card>
                        // </Link>
                    );
                })}

            </section>
            <div className="flex align-center justify-center">
                <Link className="bg-sky-500 py-2 px-8 rounded" to="/books">Explore More Books</Link>
            </div>


        </>
    )
}
