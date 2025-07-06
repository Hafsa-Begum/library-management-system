import { Card } from "@/components/ui/card";
import BorrowBookDialog from "@/features/home/BorrowBookDialog";
import { useGetSingleBookQuery } from "@/redux/api/bookApi";
import { useParams } from "react-router";

export default function SingleBook() {
    let { id } = useParams();
    const { data, isLoading } = useGetSingleBookQuery(id);
    const book = data?.data;
    if (isLoading) return <div>Loading...</div>;
    return (
        <div className="flex flex-col items-center justify-center w-2xl py-8 mx-auto">
            <Card
              key={book._id}
              className="cursor-pointer p-4 w-80 mb-8"
            >
              <img className="w-72 h-80" src="/images/book-2.png" alt="" />
              <h3 className="text-2xl">{book.title}</h3>
              <p>{book.description}</p>
              {/* <div className="flex items-center justify-between"> */}
                <p>Genre: {book.genre}</p>
                <p>{book.available ? `👉 Available copies of this book is ${book.copies}` : '❌ Not available for borrowing'}</p>
              {/* </div> */}
            </Card>
            {book.available ? <BorrowBookDialog book={book}/> : ""}
            
        </div>
    )
}
