import {
  ArrowsClockwiseIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr";

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

interface BlueBadgeDialogProps {
  verifyDate: string;
  updateDate: string;
  createdDate: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BlueBadgeDialog = ({
  verifyDate,
  updateDate,
  createdDate,
  open,
  onOpenChange,
}: BlueBadgeDialogProps) => {
  // const convertedVerifyDate = verifyDate ? new Date(verifyDate).toLocaleDateString('FA') : ''
  const convertedUpdateDate = updateDate
    ? new Date(updateDate).toLocaleDateString("FA")
    : "";
  const convertedCreateDate = createdDate
    ? new Date(createdDate).toLocaleDateString("FA")
    : "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <ShieldCheckIcon
              size={32}
              className="ml-2 text-sky-600"
              weight="duotone"
            />
            تـیـک آبـی
          </DialogTitle>
          <DialogDescription>
            <p className="pt-4">
              این واحد صنفی از تاریخ {convertedCreateDate} در راهنمای مشاغل
              کـوچـا حضور دارد و محتوای این صفحه توسط مالک آن مدیریت می‌شود.
            </p>
            <p className="flex items-center pt-2 pb-4 text-gray-500">
              <ArrowsClockwiseIcon size={14} className="ml-1" />
              بروزرسانی شده در {convertedUpdateDate}
            </p>
            <div className="flex items-center rounded-md border border-yellow-300 bg-yellow-50 p-[10px] text-[15px] font-medium">
              <p className="text-center text-yellow-800">
                کـوچـا، هیچگونه مسئولیتی در قبال خدمات این واحد صنفی ندارد.
              </p>
            </div>
          </DialogDescription>
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
