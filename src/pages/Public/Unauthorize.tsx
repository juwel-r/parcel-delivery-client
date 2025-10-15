import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Unauthorize() {
  return (
    <div>
      This is Unauthorize Component
      <br />
      <Button>
        <Link to="/">Home</Link>
      </Button>
    </div>
  );
}
