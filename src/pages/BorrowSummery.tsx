import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useGetBorrowSummeryQuery } from "@/redux/api/borrowApi";

export default function BorrowSummery() {
  const { data, isLoading } = useGetBorrowSummeryQuery(undefined);
  // console.log("data", data.data)
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col items-center justify-center">
      <Table className="w-100">
        <TableCaption>A list of Borrowed Book Summery.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Book Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Total Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((summery:any) => (
            <TableRow key={summery._id}>
              <TableCell className="font-medium">{summery.book.title}</TableCell>
              <TableCell>{summery.book.isbn}</TableCell>
              <TableCell>{summery.totalQuantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>

        </TableFooter>
      </Table>
    </div>
  )
}
