import Button from './Button';
import { Star, Heart, PlusCircle, Trash2, Download, Upload } from 'lucide-react';

const ButtonShowcase: React.FC = () => (
  <div className="p-8 space-y-8">
    <h2 className="text-xl font-bold mb-4 text-white">Enhanced Button with Icons (Dev Only)</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Button icon={<Star />} variant="primary">Starred Button</Button>
      <Button icon={<Heart />} iconPosition="right" variant="outline">Liked Button</Button>
      <Button icon={<PlusCircle />} iconSize="lg" variant="secondary">Add New</Button>
      <Button icon={<Trash2 />} variant="danger" iconSize="sm">Delete</Button>
      <Button icon={<Download />} variant="ghost">Download</Button>
      <Button icon={<Upload />} iconPosition="right" variant="primary">Upload File</Button>
    </div>
  </div>
);

export default ButtonShowcase; 