import { Loader2 } from 'lucide-react';

export default function Spinner({ size = 'w-6 h-6', className = '' }) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Loader2 className={`${size} animate-spin text-blue-600`} />
    </div>
  );
}