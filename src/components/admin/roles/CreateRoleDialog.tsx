
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface CreateRoleDialogProps {
  onCreateRole: (roleName: string) => void;
}

const CreateRoleDialog: React.FC<CreateRoleDialogProps> = ({ onCreateRole }) => {
  const [newRoleName, setNewRoleName] = useState('');
  const [createRoleDialogOpen, setCreateRoleDialogOpen] = useState(false);

  const handleCreateRole = () => {
    if (newRoleName.trim()) {
      onCreateRole(newRoleName);
      setNewRoleName('');
      setCreateRoleDialogOpen(false);
    }
  };

  return (
    <Dialog open={createRoleDialogOpen} onOpenChange={setCreateRoleDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Role
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Role</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Role name"
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
          />
          <Button onClick={handleCreateRole} className="w-full">
            Create Role
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoleDialog;
