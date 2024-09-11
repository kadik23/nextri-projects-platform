"use client"; 

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const HomePage: React.FC = (): null => {
  const router = useRouter();

  useEffect(() => {
   
    router.push('/auth');
  }, [router]);

  return null;
}

export default HomePage;
