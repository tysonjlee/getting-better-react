import { Button } from "@/components/ui/button";
import { MdDeleteOutline } from "react-icons/md";

function DeleteButton() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button className="rounded-full" size="icon">
        <MdDeleteOutline />
      </Button>
    </div>
  )
}

export default DeleteButton;
