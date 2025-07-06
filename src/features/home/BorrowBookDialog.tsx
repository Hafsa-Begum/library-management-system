import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useEffect } from 'react'
import { useBorrowBookMutation } from '@/redux/api/borrowApi'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import {useNavigate} from "react-router"

type BorrowBook = { book: string; quantity: number; dueDate: Date; }

const FormSchema = z.object<BorrowBook>({
    book: z.string({
        required_error: "Book id is must needed."
    }),
    quantity: z.number({
        required_error: "Quantity is required.",
    })
        .min(1, { message: "At least one quantity is required." }),
    dueDate: z.date({
        required_error: "A due date is required.",
    }),
})

export default function BorrowBookDialog(book: any) {

    useEffect(() => {
        console.log("book", book.book)
    }, [])
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            book: book.book._id,
            quantity: 1,
            dueDate: Date
        }
    })
    const navigate = useNavigate()
    const [borrwBook] = useBorrowBookMutation();
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log("borrow data", data)
        await borrwBook(data);
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
                                Title: {book.book.title}.
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
                                                    placeholder="quantity"
                                                    // value={field.value}
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
                                                            {field.value instanceof Date ? (
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
                                                        disabled={(date:Date) =>
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
