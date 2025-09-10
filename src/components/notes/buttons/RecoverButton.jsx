import { Button } from "@/components/ui/button";
import { CiUndo } from "react-icons/ci";

function RecoverButton ({ id }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button className="rounded-full" size="icon">
        <CiUndo />
      </Button>
    </div>
  )
}

export default RecoverButton;
