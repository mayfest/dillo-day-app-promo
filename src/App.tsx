import './App.css';
import FMOTicket from './components/fmo-stage-template';
import FerrisWheel from './components/hero/ferris-wheel';
import HeroDownloadBanner from './components/hero/hero-download-banner';
import MainStageTicket from './components/main-stage-template';

function App() {
  return (
    <div className='flex flex-col md:flex-row w-full min-h-screen relative overflow-hidden'>
      {/* LEFT SIDE (Stacked vertically on mobile) */}
      <div className='w-full md:w-1/2 p-4 flex items-center justify-center md:justify-end relative'>
        {/* Scattered Tickets - Top & Bottom */}
        <div className='absolute z-30 pointer-events-none w-full h-full hidden md:block'>
          {/* Top */}
          <div className='absolute top-4 left-2 rotate-[-12deg] scale-[0.6] md:scale-[1.2]'>
            <FMOTicket />
          </div>
          <div className='absolute top-12 left-[25%] rotate-[18deg] scale-[0.65] md:scale-[1.3]'>
            <MainStageTicket />
          </div>
          <div className='absolute top-[60px] left-[60%] rotate-[-15deg] scale-[0.6] md:scale-[1.1]'>
            <FMOTicket />
          </div>
          <div className='absolute top-20 right-[8%] rotate-[10deg] scale-[0.7] md:scale-[1.2]'>
            <MainStageTicket />
          </div>
          <div className='absolute top-[10%] left-[50%] rotate-[6deg] scale-[0.6] md:scale-[1.1]'>
            <FMOTicket />
          </div>
          <div className='absolute top-8 right-[30%] rotate-[-22deg] scale-[0.7] md:scale-[1.2]'>
            <FMOTicket />
          </div>
          <div className='absolute top-[90px] right-[12%] rotate-[14deg] scale-[0.65] md:scale-[1.15]'>
            <MainStageTicket />
          </div>

          {/* Bottom */}
          <div className='absolute bottom-[10%] left-3 rotate-[17deg] scale-[0.7] md:scale-[1.25]'>
            <MainStageTicket />
          </div>
          <div className='absolute bottom-[70px] right-[20%] rotate-[20deg] scale-[0.6] md:scale-[1.25]'>
            <FMOTicket />
          </div>
          <div className='absolute bottom-[80px] left-[20%] rotate-[-30deg] scale-[0.65] md:scale-[1.3]'>
            <FMOTicket />
          </div>
          <div className='absolute bottom-[20px] left-[60%] rotate-[15deg] scale-[0.6] md:scale-[1.2]'>
            <FMOTicket />
          </div>
          <div className='absolute bottom-[60px] right-[24px] rotate-[-18deg] scale-[0.65] md:scale-[1.2]'>
            <MainStageTicket />
          </div>
          <div className='absolute bottom-[45px] left-[45%] rotate-[3deg] scale-[0.6] md:scale-[1.1]'>
            <FMOTicket />
          </div>
          <div className='absolute bottom-[100px] right-[5%] rotate-[-10deg] scale-[0.7] md:scale-[1.3]'>
            <MainStageTicket />
          </div>
        </div>
        <div className='absolute top-0 bottom-0 left-0 z-10 w-0 pointer-events-none'>
          <div className='absolute top-0 left-[-120px] flex flex-col gap-y-12'>
            <FMOTicket className='scale-[0.9] -rotate-12' />
            <MainStageTicket className='scale-[0.9] rotate-6' />
            <FMOTicket className='scale-[0.9] rotate-12' />
            <MainStageTicket className='scale-[0.9] -rotate-3' />
            <FMOTicket className='scale-[0.9] rotate-9' />
          </div>
        </div>

        <div className='absolute top-0 bottom-0 right-0 z-10 w-0 pointer-events-none'>
          <div className='absolute top-0 right-[-80px] flex flex-col gap-y-12'>
            <MainStageTicket className='scale-[0.9] rotate-15' />
            <FMOTicket className='scale-[0.9] -rotate-10' />
            <MainStageTicket className='scale-[0.9] rotate-5' />
            <FMOTicket className='scale-[0.9] -rotate-8' />
            <MainStageTicket className='scale-[0.9] rotate-10' />
          </div>
        </div>

        {/* Hero Banner */}
        <div className='relative w-full max-w-md md:max-w-3xl z-10 py-24 md:py-0'>
          <HeroDownloadBanner />
        </div>
      </div>

      {/* RIGHT SIDE (Ferris Wheel) */}
      <div className='w-full md:w-1/2 relative overflow-hidden'>
        <div className='absolute right-[-20%] md:right-[-12%] top-1/2 transform -translate-y-1/2 w-[180%] md:w-[135%]'>
          <FerrisWheel />
        </div>
      </div>
    </div>
  );
}

export default App;
