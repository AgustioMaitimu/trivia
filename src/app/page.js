import Background from '@/components/home/Background';
import Circle from '@/components/home/Circle';
import Login from '@/components/home/Login';
import Scroll from '@/components/home/Scroll';
import { Lato } from 'next/font/google';
const lato = Lato({ subsets: ['latin'], weight: '400' });

export default function Home() {
  return (
    <main
      className={`${lato.className} flex flex-col items-center justify-center bg-[#F7F6F4] text-[#30281C]`}
    >
      <Circle />
      <Background />
      <div className="h-screen w-screen bg-transparent"></div>
      <Login />
      <Scroll />
    </main>
  );
}
