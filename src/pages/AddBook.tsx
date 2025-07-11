"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAddBookMutation, useGetSingleBookQuery, useUpdateBookMutation } from "@/redux/api/bookApi"
import { useNavigate, useParams } from 'react-router';
import { useEffect } from "react"

const FormSchema = z.object({
    title: z.string({
        message: "Title is required.",
    }),
    author: z.string({
        message: "Author name is required.",
    }),
    isbn: z.string({
        message: "ISBN is required.",
    }),
    copies: z.number({
        required_error: "Available book copies number is required.",
    })
    .min(1, { message: "At least one copy is required." }),
    description: z.string({
        message: "Please provide description.",
    }),
    genre: z.string({
        message: "Please provide genre.",
    }),
})

export default function AddBook() {
    const { id } = useParams()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      author: "",
      isbn: "",
      copies: 1,
      description: "",
      genre: "",
    },
  })

  const [addBook] = useAddBookMutation()
  const [updateBook] = useUpdateBookMutation()
  const { data, isLoading } = useGetSingleBookQuery(id, {
    skip: !id,
  })

  // Populate form in edit mode
  useEffect(() => {
    if (data?.data) {
      const book = data.data
      form.reset({
        title: book.title || "",
        author: book.author || "",
        isbn: book.isbn || "",
        copies: book.copies || 1,
        description: book.description || "",
        genre: book.genre || "",
      })
    }
  }, [data, form])

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    try {
      if (id) {
        await updateBook( {id, body: formData} )
        toast.success("Book updated successfully")
        navigate(`/books/${id}`)
      } else {
        const bookData = { ...formData, available: true }
        await addBook(bookData)
        toast.success("Book added successfully")
        navigate('/books')
      }
    } catch (error) {
      toast.error("Something went wrong")
      console.error(error)
    }
  }

  if (id && isLoading) return <div>Loading...</div>

    

    return (
    <>
        <div className="flex flex-col items-center justify-center w-2xl py-8 mx-auto">
            <h1 className="text-2xl my-8">{ id ? 'Update book' : 'Add a new book'}</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                    //  value={id ? data?.data.title : field.value} 
                                     placeholder="Title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Author</FormLabel>
                                <FormControl>
                                    <Input placeholder="Author" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="isbn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ISBN</FormLabel>
                                <FormControl>
                                    <Input placeholder="ISBN" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="copies"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Copies Available</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Copies" 
                                        value={field.value}
                                        onChange={(e) => field.onChange(+e.target.value)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Description of book"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="genre"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Genre</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={id ? data?.data.genre : field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Genre" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-blue-100 mt-8">
                                        <SelectItem value="FICTION">Fiction</SelectItem>
                                        <SelectItem value="NON_FICTION">Non-fiction</SelectItem>
                                        <SelectItem value="SCIENCE">Science</SelectItem>
                                        <SelectItem value="HISTORY">History</SelectItem>
                                        <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                                        <SelectItem value="FANTASY">Fantasy</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <Button variant="outline" type="submit">Submit</Button>
                </form>
            </Form>
        </div>
        </>
    )
}
