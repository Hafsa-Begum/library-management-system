import { Card } from "@/components/ui/card";
import { useGetSingleBookQuery } from "@/redux/api/bookApi";
import { useParams } from "react-router";

export default function SingleBook() {
    let { id } = useParams();
    const { data, isLoading } = useGetSingleBookQuery(id);
    if (isLoading) return <div>Loading...</div>;
    return (
        <div>{id}
            <Card
                className="cursor-pointer p-4 m-8"
            >
                <h3>{data.data.title}</h3>
                <p>{data.data.description}</p>
            </Card>
        </div>
    )
}
