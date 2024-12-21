export interface CardProps {
  imageUrl: string;
  photographerName: string;
  photographerLink: string;
  description?: string;
  onClose?: () => void | Promise<void>;
}
