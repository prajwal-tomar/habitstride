'use client'

import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Bell, LogOut, User } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  const router = useRouter();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      router.push('/');
    }
  }

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-teal-600">HabitStride</div>
          <nav className="space-x-4">
          <Link href={"/dashboard"}> <Button variant="ghost">Dashboard</Button></Link>
          <Link href={"/checkin"}> <Button variant="ghost">Checkin</Button></Link>
            <Link href={"/insights"}> <Button variant="ghost">Insights</Button></Link>
            <Link href={"/settings"}> <Button variant="ghost">Settings</Button></Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon"><Bell size={20} /></Button>
            <Button variant="ghost" size="icon"><User size={20} /></Button>
            <Button onClick={handleLogout} variant="ghost" size="icon"><LogOut size={20} /></Button>
          </div>
        </header>
  );
}