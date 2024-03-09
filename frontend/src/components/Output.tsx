import { useSearchParams } from "react-router-dom";

export const Output = () => {
    const [searchParams] = useSearchParams();
    const assignmentId = searchParams.get('assignmentId') ?? '';
    const INSTANCE_URI = `http://${assignmentId}.box.upraised.in`;

    return <div style={{height: "40vh", background: "white"}}>
        <iframe width={"100%"} height={"100%"} src={`${INSTANCE_URI}`} />
    </div>
}
