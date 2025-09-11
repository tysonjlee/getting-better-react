import { Button } from "@/components/ui/button";
import { RiPushpin2Fill } from "react-icons/ri";

function PinButton() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button className="rounded-full" size="icon">
        <RiPushpin2Fill />
      </Button>
    </div>
  )
}

export default PinButton;
