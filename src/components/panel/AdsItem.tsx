import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui";
import { Card, CardContent, CardHeader } from "../ui/card";

interface AdsItemProps {
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  className?: string;
}

export const AdsItem = ({
  title,
  description,
  image,
  category,
  date,
  className,
}: AdsItemProps) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center gap-3 space-y-0 p-5 pb-2.5">
        <Avatar className="size-11">
          <AvatarImage src={image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-[15px] font-medium">{title}</h2>
          <p className="text-muted-foreground text-[13px]">
            {date} در دسته {category}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <p className="line-clamp-2 text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};
