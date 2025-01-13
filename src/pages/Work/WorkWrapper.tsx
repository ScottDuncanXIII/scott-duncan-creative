import { useParams } from "react-router";
import Work from "./Work";

export default function WorkWrapper() {
  const { workId } = useParams();
  return <Work key={workId} />;
}
