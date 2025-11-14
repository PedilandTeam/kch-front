import { cn } from "@/lib/utils";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import {
  ArrowsClockwiseIcon,
  CrownIcon,
  SealCheckIcon,
  WarningIcon,
} from "@phosphor-icons/react/dist/ssr";

interface BadgeBlueDialogProps {
  verifyDate: string;
  updateDate: string;
  createdDate: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSpecial: boolean;
}

export const BadgeBlueDialog = ({
  updateDate,
  createdDate,
  open,
  onOpenChange,
  isSpecial,
}: BadgeBlueDialogProps) => {
  const convertedUpdateDate = updateDate
    ? new Date(updateDate).toLocaleDateString("FA")
    : "";
  const convertedCreateDate = createdDate
    ? new Date(createdDate).toLocaleDateString("FA")
    : "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle
            className={cn(
              "flex items-center gap-2",
              isSpecial ? "text-yellow-500" : "text-blue-500",
            )}
          >
            {isSpecial ? (
              <CrownIcon size={28} weight="duotone" />
            ) : (
              <SealCheckIcon size={28} weight="duotone" />
            )}
            <span>تـایـیـد شـده</span>
            {isSpecial && "(ویـژه)"}
          </DialogTitle>
          <div className="space-y-4">
            <div className="space-y-2 text-[15px]">
              <p>
                این واحد صنفی از تاریخ {convertedCreateDate} در راهنمای مشاغل
                کـوچـا حضور دارد و محتوای این صفحه توسط مالک آن تایید شده است.{" "}
                {isSpecial &&
                  "همچنین از سرویس ادزکـلاب برای معرفی خدمات خود به جامعه ایرانیان مهاجر استفاده می‌کند."}
              </p>
              <div className="text-muted-foreground flex items-center gap-1">
                <ArrowsClockwiseIcon size={14} />
                بروز شده در {convertedUpdateDate}
              </div>
            </div>
            <div className="border-secondary/60 rounded-md border bg-yellow-50 px-3 py-2 text-sm text-yellow-700/90">
              <div className="flex items-center gap-1 font-semibold">
                <WarningIcon size={16} weight="duotone" />
                تـوجـه!
              </div>
              <div>
                کـوچـا، هیچگونه مسئولیتی در قبال خدمات ارائه شده توسط این صفحه
                ندارد.
              </div>
            </div>
          </div>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>متوجه شدم</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
