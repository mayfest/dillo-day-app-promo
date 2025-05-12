import './App.css';
import FerrisWheel from './components/hero/ferris-wheel';
import HeroDownloadBanner from './components/hero/hero-download-banner';

function App() {
  return (
    <div className='flex w-full min-h-screen'>
      <div className='w-2/4 pl-6 pr-0 flex items-center justify-end -mr-12'>
        <div className='w-full max-w-2xl'>
          <HeroDownloadBanner />
        </div>
      </div>
      <div className='w-3/4 relative overflow-hidden'>
        <div
          className='absolute -right-3/12 top-1/2 transform -translate-y-1/2 mt-8'
          style={{ width: '135%' }}
        >
          <FerrisWheel />
        </div>
        ªªªªªª
      </div>
    </div>
  );
}

export default App;
