import { Card } from '@/components/ui/card';
import { useGetAllBookQuery } from '@/redux/api/bookApi';


export default function AllBooks() {
  
  const { data, isLoading } = useGetAllBookQuery(undefined);
  // console.log("data", data.data)
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
    <section className="grid grid-cols-3 gap-4 p-16">
      {data.data.map((quiz) => {
        return (
          <Card
            key={quiz._id}
            className="cursor-pointer p-4"
            onClick={() => handleSetQuiz(quiz)}
          >
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
          </Card>
        );
      })}
      
    </section>
    <div>All Books</div>
    </>
  )
}
