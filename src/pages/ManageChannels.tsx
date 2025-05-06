
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { channels } from '@/data/mockData';
import { Channel } from '@/types';
import { toast } from 'sonner';
import { Trash, Edit, Plus } from 'lucide-react';

const ManageChannels: React.FC = () => {
  const [availableChannels, setAvailableChannels] = useState<Channel[]>(channels as Channel[]);
  const [newChannel, setNewChannel] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAddChannel = () => {
    if (!newChannel.trim()) {
      toast.error('Channel name cannot be empty');
      return;
    }
    
    const formattedChannel = newChannel.trim().toLowerCase() as Channel;
    
    if (availableChannels.includes(formattedChannel)) {
      toast.error('This channel already exists');
      return;
    }
    
    setAvailableChannels([...availableChannels, formattedChannel]);
    setNewChannel('');
    toast.success('Channel added successfully');
  };

  const handleDeleteChannel = (index: number) => {
    const updatedChannels = [...availableChannels];
    updatedChannels.splice(index, 1);
    setAvailableChannels(updatedChannels);
    toast.success('Channel deleted successfully');
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditValue(availableChannels[index]);
  };

  const handleEditChannel = (index: number) => {
    if (!editValue.trim()) {
      toast.error('Channel name cannot be empty');
      return;
    }

    const formattedChannel = editValue.trim().toLowerCase() as Channel;
    
    if (availableChannels.includes(formattedChannel) && formattedChannel !== availableChannels[index]) {
      toast.error('This channel already exists');
      return;
    }

    const updatedChannels = [...availableChannels];
    updatedChannels[index] = formattedChannel;
    setAvailableChannels(updatedChannels);
    setEditingIndex(null);
    setEditValue('');
    toast.success('Channel updated successfully');
  };

  return (
    <MainLayout showBackButton>
      <div className="container mx-auto pt-8 pb-10">
        <Card className="max-w-4xl mx-auto shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-agency-950">Media Channels</CardTitle>
            <CardDescription>
              Create and manage the channels available for media plans
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Add new channel */}
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="Add new channel" 
                  className="flex-grow"
                  value={newChannel}
                  onChange={(e) => setNewChannel(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddChannel()}
                />
                <Button onClick={handleAddChannel}>
                  <Plus className="mr-1" />
                  Add
                </Button>
              </div>

              {/* List of channels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableChannels.map((channel, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-md bg-white">
                    {editingIndex === index ? (
                      <div className="flex items-center gap-2 w-full">
                        <Input 
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleEditChannel(index)}
                          autoFocus
                        />
                        <Button size="sm" onClick={() => handleEditChannel(index)}>Save</Button>
                      </div>
                    ) : (
                      <>
                        <span className="capitalize">
                          {channel.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" onClick={() => startEditing(index)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDeleteChannel(index)}>
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ManageChannels;
