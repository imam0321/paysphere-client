export default function TxRow({
  label,
  amount,
}: {
  label: string;
  amount: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="truncate">{label}</div>
      <div className="font-medium">{amount}</div>
    </div>
  );
}
