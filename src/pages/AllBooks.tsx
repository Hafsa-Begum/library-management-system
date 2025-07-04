import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetAllBookQuery } from '@/redux/api/bookApi';
import { Link } from 'react-router'


export default function AllBooks() {

  const { data, isLoading } = useGetAllBookQuery(undefined);
  console.log("env", import.meta.env.VITE_BACKEND_URL)
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <section className="grid grid-cols-3 gap-4 p-16 bg-teal-100">
        {data.data.map((book: any) => {
          return (
            <Card
              key={book._id}
              className="cursor-pointer p-4"
            >
              <h3>{book.title}</h3>
              <p>{book.description}</p>
              <div>
                <Link to={`/books/${book._id}`}>
                  See Details
                </Link>
                <div>
                  <Dialog>
                    <form>
                      <DialogTrigger asChild>
                        <Button variant="outline">Borrow Book</Button>
                      </DialogTrigger>
                      <DialogContent className="bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-100">
                        <DialogHeader>
                          <DialogTitle>Borrow Book</DialogTitle>
                          <DialogDescription>
                            Add some information before borrowing book.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                          <div className="grid gap-3">
                            <Label htmlFor="name-1">Quantity</Label>
                            <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="username-1">Due Date</Label>
                            <Input id="username-1" name="username" defaultValue="@peduarte" />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="submit">Borrow</Button>
                        </DialogFooter>
                      </DialogContent>
                    </form>
                  </Dialog>
                </div>
              </div>
            </Card>
          );
        })}

      </section>
      <div>All Books</div>
    </>
  )
}
