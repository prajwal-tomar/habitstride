import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DialogProps {
  onClose: () => void;
  children: ReactNode;
}

export function Dialog({ onClose, children }: DialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        {children}
      </div>
    </div>
  );
}

interface DialogContentProps {
  children: ReactNode;
}

export function DialogContent({ children }: DialogContentProps) {
  return <div className="p-4">{children}</div>;
}

interface DialogHeaderProps {
  children: ReactNode;
}

export function DialogHeader({ children }: DialogHeaderProps) {
  return <div className="border-b p-4">{children}</div>;
}

interface DialogTitleProps {
  children: ReactNode;
}

export function DialogTitle({ children }: DialogTitleProps) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

interface DialogCloseProps {
  onClick: () => void;
}

export function DialogClose({ onClick }: DialogCloseProps) {
  return (
    <button
      onClick={onClick}
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
    >
      &times;
    </button>
  );
}