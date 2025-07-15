import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

export default function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-24">
      <h2 className="h3 text-black">{title}</h2>
      <Button variant="ghost" size="sm" onClick={onClose} className="p-8">
        <X className="w-20 h-20" />
      </Button>
    </div>
  );
}
