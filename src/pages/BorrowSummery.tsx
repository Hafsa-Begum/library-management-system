import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
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
    <div className="flex items-center justify-center w-2xl py-8 mx-auto">
      <Table>
        <TableCaption className="text-2xl mb-32">A list of Borrowed Book Summery.</TableCaption>
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
      </Table>
    </div>
  )
}
