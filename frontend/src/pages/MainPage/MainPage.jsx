import './MainPage.scss'
import Nav from '../../components/Nav/Nav';
import Search from '../../components/Search/Search';

import CardsGrid from '../../components/CardsGrid/CardsGrid';


const MainPage = () => {

  return (
    <div className='flex h-[200dvh]'>
      <div className="z-10 w-full h-full flex">
        <div className='w-1/12 shadow-[inset_0_0_2rem_rgba(0,0,0,0.9)] bg-[#4E3524] max-md:hidden'>
        </div>
        <Nav/>
        <div className="shadow-[inset_0_0_4rem_rgba(0,0,0,0.9)] blob blob-reverse mx-auto flex aspect-[9/16] flex-col max-md:justify-start max-h-[full] w-3/4 items-start overflow-hidden bg-[#4E3524] p-16 py-16 transition-[background] before:absolute before:top-[25%] before:left-[75%] before:z-0 before:h-[20%] before:w-[20%] before:origin-[60%] before:rounded-[30rem] before:bg-gradient-to-br before:from-[#161010] before:via-[#382121] before:to-[#763636] before:blur-[85px] before:brightness-150 after:absolute after:top-[25%] after:left-[20%] after:z-0 after:h-[20%] after:w-[20%] after:origin-[60%] after:rounded-[30rem] after:bg-gradient-to-br after:from-[#763636] after:via-[#382121] after:to-[#161010] after:blur-[85px] after:brightness-150 max-md:before:h-[35%] max-md:before:w-[100%] max-md:after:h-[35%] max-md:after:w-[100%] max-md:before:rounded-2xl max-md:after:rounded-2xl max-md:before:top-[5%] max-md:after-top-[5%] max-md:w-full max-md:h-[675dvh]">
          <div className="flex z-20 w-full h-full gap-16 flex-col">
             <Search/>
             <CardsGrid/>
          </div>
        </div>
        
      </div>
    </div>
     );
};

export default MainPage;
