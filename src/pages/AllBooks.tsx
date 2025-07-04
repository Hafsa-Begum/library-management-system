import { Card } from '@/components/ui/card';
import { useGetAllBookQuery } from '@/redux/api/bookApi';
import {Link} from 'react-router'


export default function AllBooks() {
  
  const { data, isLoading } = useGetAllBookQuery(undefined);
  console.log("env", import.meta.env.VITE_BACKEND_URL)
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
    <section className="grid grid-cols-3 gap-4 p-16">
      {data.data.map((book) => {
        return (
          <Link to={`/books/${book._id}`}>
            <Card
              key={book._id}
              className="cursor-pointer p-4"
            >
              <h3>{book.title}</h3>
              <p>{book.description}</p>
            </Card>
          </Link>
        );
      })}
      
    </section>
    <div>All Books</div>
    </>
  )
}
