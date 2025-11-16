'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { updateProfileAction } from "@/app/actions";
import { useTransition, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useUser } from "@/hooks/use-user";

export default function SettingsPage() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { name, email, setUser } = useUser();

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const handleThemeChange = (checked: boolean) => {
    setIsDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };
  
  const handleProfileUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    startTransition(async () => {
      const result = await updateProfileAction({ name, email });
      if (result.success) {
        setUser({ name, email });
        toast({
          title: "Success",
          description: result.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.message,
        });
      }
    });
  };

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-headline font-semibold">Settings</h1>
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Profile</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" defaultValue={name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" defaultValue={email} />
                </div>
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="animate-spin" />}
                  {isPending ? "Updating..." : "Update Profile"}
                  </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
                    </div>
                    <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={handleThemeChange} />
                </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Notifications</CardTitle>
              <CardDescription>Manage how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email for important events.</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked/>
                </div>
                <div className="rounded-lg border p-4 space-y-4">
                    <Label className="font-medium">Notify me when...</Label>
                     <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                            <Switch id="notify-assignment" defaultChecked/>
                            <Label htmlFor="notify-assignment" className="font-normal">A new query is assigned to me</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="notify-escalation" defaultChecked/>
                            <Label htmlFor="notify-escalation" className="font-normal">A query is escalated to my team</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="notify-mention"/>
                            <Label htmlFor="notify-mention" className="font-normal">I am mentioned in a query history</Label>
                        </div>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
