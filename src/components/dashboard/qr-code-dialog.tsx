
"use client";

import QRCode from "qrcode.react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface QrCodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  qrValue: string;
}

export function QrCodeDialog({
  isOpen,
  onClose,
  eventTitle,
  qrValue,
}: QrCodeDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary">{eventTitle}</DialogTitle>
          <DialogDescription>
            Present this QR code at the event entrance for check-in. Do not
            share it with others.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center p-4 bg-white rounded-lg">
          <QRCode
            value={qrValue}
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            viewBox={`0 0 256 256`}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
