import { UserNav } from '@/components/user-nav';

export function DashboardHeader() {
  return (
    <header className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Your Dashboard</h1>
      <UserNav />
    </header>
  );
}