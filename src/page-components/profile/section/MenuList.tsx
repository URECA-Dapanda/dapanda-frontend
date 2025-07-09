import { Card, CardContent } from "@/components/ui/card";
import MenuItem from "./MenuItem";

const menuList = [
  {
    title: "구매 내역",
    target: "",
  },
  {
    title: "판매 내역",
    target: "",
  },
  {
    title: "판다 도감",
    target: "",
  },
  {
    title: "신고하기",
    target: "",
  },
];

export default function MenuList() {
  return (
    <Card className="border-[#ffe8c6]">
      <CardContent className="p-0">
        <div className="divide-y divide-[#ffe8c6]">
          {menuList.map(({ title, target }, i) => (
            <MenuItem title={title} key={`${i}_${title}`} target={target} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
