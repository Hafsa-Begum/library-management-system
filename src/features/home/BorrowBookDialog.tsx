import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useBorrowBookMutation } from '@/redux/api/borrowApi'
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useNavigate } from "react-router"

type BorrowBook = { book: string; quantity: number; dueDate: Date; }
type Book = {
    _id: string,
    title: string,
    author: string,
    description?: string,
    genre: string, 
    isbn: string,
    copies: number,
    available: boolean
}


export default function BorrowBookDialog(book:any) {
    const bookData:Book = book.book;

    // useEffect(() => {
    //     console.log("book", book.book)
    // }, [])
    const form = useForm<BorrowBook>({
        defaultValues: {
            book: bookData._id,
                quantity: 1,
                dueDate: undefined
        }
    })
    const navigate = useNavigate()
    const [borrwBook] = useBorrowBookMutation();
    async function onSubmit(formData: BorrowBook) {
        console.log("borrow data", formData)
        await borrwBook(formData);
        toast("Book borrowed successfully.")
        navigate("/borrow-summery")

    }
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Borrow Book</Button>
            </DialogTrigger>

            <DialogContent className="bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-100">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Borrow Book</DialogTitle>
                            <DialogDescription>
                                Title: {bookData.title}.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="book"
                                    render={() => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="hidden"
                                                    value={bookData._id}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="quantity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Quantity</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    value={field.value ?? ""} // keep number or empty string
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        field.onChange(value === "" ? undefined : +value); // convert to number
                                                    }}
                                                    placeholder="Quantity"
                                                />
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
                                                        // selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date: Date) =>
                                                            date <= new Date()
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
                            {/* <Link to="/borrow-summery"> */}
                            <Button type="submit">Borrow</Button>
                            {/* </Link> */}
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
