import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components";
import { SealWarningIcon, WarningIcon } from "@phosphor-icons/react/dist/ssr";

interface BadgeOrangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BadgeOrangeDialog = ({
  open,
  onOpenChange,
}: BadgeOrangeDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-orange-400">
            <SealWarningIcon size={28} weight="duotone" />
            تـایـیـد نـشـده
          </DialogTitle>
          <div className="space-y-4">
            <div className="space-y-2 text-[15px]">
              <p>
                اطلاعات این صفحه از اینترنت جمع‌آوری شده و در حال حاضر توسط
                ادمین کـوچـا مدیریت می‌شود. اگر شما مالک این واحد صنفی هستید،
                می‌توانید با احراز هویت خود تیک آبی دریافت کنید، مدیریت اطلاعات
                این صفحه رو به عهده بگیرید و از امکانات کـوچـا برای راهبری و
                توسعه کسب و کارتون استفاده کنید.
              </p>
              <div className="text-destructive">
                *** در صورت عدم احراز هویت مالک تا پایان آپریل 2026، اطلاعات این
                صفحه از راهنمای مشاغل کـوچـا حذف خواهد شد. ***
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
