"use client"; 

import { Button } from '@/components/ui/button';
export default function DashboardPage() {

  // this  route should be protected
  return (
    <div>
      <h1>Welcome</h1>
      <Button >Logout</Button>
    </div>
  );
}
