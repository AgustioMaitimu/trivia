import Background from '@/components/Background';
import LoginCard from '@/components/Login';
import Scroll from '@/components/Scroll';
import { Lato } from 'next/font/google';
import Image from 'next/image';
const lato = Lato({ subsets: ['latin'], weight: '400' });

export default function Home() {
  return (
    <main
      className={`${lato.className} flex flex-col items-center justify-center bg-[#FCFBFA] text-[#30281C]`}
    >
      <Background />
      <div className="h-screen w-screen bg-transparent"></div>
      <LoginCard />
      <Scroll />
    </main>
  );
}
