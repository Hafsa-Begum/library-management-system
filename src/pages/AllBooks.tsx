"use client"
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from "lucide-react"
import { cn } from '@/lib/utils';
import { useGetAllBookQuery } from '@/redux/api/bookApi';
import { Link } from 'react-router'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { format } from "date-fns"

const FormSchema = z.object({
  quantity: z.number({
    required_error: "Quantity is required.",
  })
    .min(1, { message: "At least one quantity is required." }),
  dueDate: z.date({
    required_error: "A due date is required.",
  }),
})

export default function AllBooks() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
    console.log("borrow data", data)
  }

  const { data, isLoading } = useGetAllBookQuery(undefined);

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
              <div className="flex items-center justify-between">
                <p>Genre: {book.genre}</p>
                <p>Copies: {book.copies}</p>
                <p>Available: {book.available}</p>
              </div>
              <div className="flex items-center justify-between">
                <Link to={`/books/${book._id}`}>
                  See Details
                </Link>
                <Link to={`/edit-book/${book._id}`}>
                  Edit
                </Link>
                <div>
                  <Dialog className="bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-100">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogTrigger asChild>
                          <Button variant="outline">Borrow Book</Button>
                        </DialogTrigger>
                        <DialogContent className="bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-100">
                          <DialogHeader>
                            <DialogTitle>Borrow Book</DialogTitle>
                            <DialogDescription>
                              Title: {book.title}.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4">
                            <div className="grid gap-3">
                              <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Quantity</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        placeholder="quantity"
                                        value={field.value}
                                        onChange={(e) => field.onChange(+e.target.value)} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="grid gap-3">
                              <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                  <FormItem className="flex flex-col">
                                    <FormLabel>Due Date</FormLabel>
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <FormControl>
                                          <Button
                                            variant={"outline"}
                                            className={cn(
                                              "w-[240px] pl-3 text-left font-normal",
                                              !field.value && "text-muted-foreground"
                                            )}
                                          >
                                            {field.value ? (
                                              format(field.value, "PPP")
                                            ) : (
                                              <span>Due Date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                          </Button>
                                        </FormControl>
                                      </PopoverTrigger>
                                      <PopoverContent className="bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-100 w-auto p-0" align="start">
                                        <Calendar
                                          mode="single"
                                          selected={field.value}
                                          onSelect={field.onChange}
                                          disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                          }
                                          captionLayout="dropdown"
                                        />
                                      </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
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
                    </Form>
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
