import { Button } from "@/components/ui/button";

export default function QuickAction({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Button variant="secondary" className="rounded-2xl justify-start gap-2">
      {icon}
      {label}
    </Button>
  );
}
