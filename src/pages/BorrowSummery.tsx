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
  
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]
  
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
          {data.data.map((summery) => (
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
  