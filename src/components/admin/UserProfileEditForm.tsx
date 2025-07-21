
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { EnhancedProfile, UserPreferences } from '@/types/userProfiles';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { useUpdatePreferences } from '@/hooks/useUserPreferences';
import { Save, X } from 'lucide-react';

interface UserProfileEditFormProps {
  profile: EnhancedProfile;
  preferences?: UserPreferences | null;
  onCancel: () => void;
  onSave: () => void;
}

const UserProfileEditForm: React.FC<UserProfileEditFormProps> = ({
  profile,
  preferences,
  onCancel,
  onSave
}) => {
  const { toast } = useToast();
  const updateProfile = useUpdateProfile();
  const updatePreferences = useUpdatePreferences();
  
  const [formData, setFormData] = useState({
    full_name: profile.full_name || '',
    phone: profile.phone || '',
    bio: profile.bio || '',
    department: profile.department || '',
    location: profile.location || '',
    role: profile.role,
    status: profile.status || 'active',
  });

  const [preferencesData, setPreferencesData] = useState({
    notification_email: preferences?.notification_email ?? true,
    notification_sms: preferences?.notification_sms ?? false,
    language: preferences?.language || 'en',
    timezone: preferences?.timezone || 'UTC',
    theme: preferences?.theme || 'light',
  });

  const handleSave = async () => {
    try {
      console.log('Updating profile with data:', { id: profile.id, ...formData });
      
      // Update profile - ensure we're passing the ID correctly
      await updateProfile.mutateAsync({
        id: profile.id,
        full_name: formData.full_name,
        phone: formData.phone,
        bio: formData.bio,
        department: formData.department,
        location: formData.location,
        role: formData.role,
        status: formData.status,
      });

      console.log('Profile updated successfully, now updating preferences');

      // Update preferences
      await updatePreferences.mutateAsync({
        user_id: profile.id,
        notification_email: preferencesData.notification_email,
        notification_sms: preferencesData.notification_sms,
        language: preferencesData.language,
        timezone: preferencesData.timezone,
        theme: preferencesData.theme,
      });

      toast({
        title: "Profile Updated",
        description: "User profile has been successfully updated.",
      });

      onSave();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell us about yourself..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={(value: any) => setFormData(prev => ({ ...prev, role: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="generator">Generator</SelectItem>
                  <SelectItem value="controller">Controller</SelectItem>
                  <SelectItem value="driver">Driver</SelectItem>
                  <SelectItem value="recycler">Recycler</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-gray-500">Receive notifications via email</p>
              </div>
              <Switch
                id="email-notifications"
                checked={preferencesData.notification_email}
                onCheckedChange={(checked) => setPreferencesData(prev => ({ ...prev, notification_email: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <p className="text-sm text-gray-500">Receive notifications via SMS</p>
              </div>
              <Switch
                id="sms-notifications"
                checked={preferencesData.notification_sms}
                onCheckedChange={(checked) => setPreferencesData(prev => ({ ...prev, notification_sms: checked }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="language">Language</Label>
              <Select value={preferencesData.language} onValueChange={(value) => setPreferencesData(prev => ({ ...prev, language: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="ar">Arabic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={preferencesData.timezone} onValueChange={(value) => setPreferencesData(prev => ({ ...prev, timezone: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                  <SelectItem value="America/Chicago">Central Time</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  <SelectItem value="Europe/London">London</SelectItem>
                  <SelectItem value="Europe/Paris">Paris</SelectItem>
                  <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="theme">Theme</Label>
              <Select value={preferencesData.theme} onValueChange={(value) => setPreferencesData(prev => ({ ...prev, theme: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button 
          onClick={handleSave}
          disabled={updateProfile.isPending || updatePreferences.isPending}
        >
          <Save className="w-4 h-4 mr-2" />
          {updateProfile.isPending || updatePreferences.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export default UserProfileEditForm;
