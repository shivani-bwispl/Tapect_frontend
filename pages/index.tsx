import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import router, { useRouter } from 'next/router';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { setPageTitle } from '../store/themeConfigSlice';
import PLUS from '../public/assets/images/icons/PLUS.svg';
import Image from 'next/image';
import { ImageProvider } from '../components/ImageContext';
import Cards from './Cards';
const Index = ({ card }) => {
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cardCount, setCardCount] = useState(1); // New state variable for card count
    const [cards, setCards] = useState([
        {
            id: 1,
            name: 'Manav Sheth',
            designation: 'Full Stack Developer',
            isPrimary: true,
        },
    ]);
    const removeCard = (cardId) => {
        setCards(cards.filter((card) => card.id !== cardId));
    };
    let CardList = cards;
    const createNewCard = () => {
        const newCard = {
            id: cards.length + 1,
            name: '',
            designation: '',
            isPrimary: false,
        };
        let CardList = [...cards, newCard];
        setCards(CardList);
    };
    const togglePrimaryStatus = (cardId) => {
        setCards((prevCards) => prevCards.map((card) => (card.id === cardId ? { ...card, isPrimary: !card.isPrimary } : { ...card, isPrimary: false })));
    };
    console.log('CardList', CardList);

    useEffect(() => {
        dispatch(setPageTitle('home'));
        // Check if the user is authenticated
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('localtoken');
        console.log(token);
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            // Redirect to the login page if not authenticated
            router.push('/Login');
        }
    }, [dispatch]);
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    return (
        <>
            <ImageProvider>
                {/* <div className="mt-3  grid   gap-8 p-6   md:grid-cols-2  xl:grid-cols-3"> */}
                    <div className='grid 2xl:grid-cols-4 p-6  mt-2 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>

                    {/* <Cards /> */}
                    {CardList.map((card, i) => (
                        <Cards
                            key={card.id}
                            id={card.id}
                            name={card.name}
                            designation={card.designation}
                            isPrimary={card.isPrimary}
                            onTogglePrimary={togglePrimaryStatus}
                            onRemoveCard={removeCard}
                            isSingleCard={cards.length === 1 && i === 0}
                        />
                    ))}
                    {/* Card Template */}
                    <div className=" drop-shadow-themeShadow-3xl flex  h-[400px] w-[370px]    items-center justify-center rounded-md border border-zinc-200 bg-white max-lg:mx-4  max-lg:w-[350px]">
                        <div className="  flex  flex-col items-center   justify-center  gap-3 border-white-light" onClick={createNewCard}>
                            <div className=" h-[60px] w-[60px] rounded-full border border-solid border-white bg-purple-Light">
                                <Image src={PLUS} alt="plus" className=" h-[100%] w-[100%] min-w-fit rounded-full object-cover"></Image>
                            </div>
                            <div>
                                <h1 className=" text-xl font-bold tracking-wide ">Create another Card </h1>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="mt-3  grid   gap-8 p-6  max-lg:mx-[50px]   md:grid-cols-2  xl:grid-cols-3"> */}
                    {/* <Cards /> */}
                    {/* {CardList.map((card, i) => (
                        <Cards
                            key={card.id}
                            id={card.id}
                            name={card.name}
                            designation={card.designation}
                            isPrimary={card.isPrimary}
                            onTogglePrimary={togglePrimaryStatus}
                            onRemoveCard={removeCard}
                            isSingleCard={cards.length === 1 && i === 0}
                        />
                    ))} */}
                    {/* Card Template */}
                    {/* <div className=" drop-shadow-themeShadow-3xl flex h-[320px] w-[370px]    items-center justify-center rounded-md border border-zinc-200 bg-white max-lg:mx-4  max-lg:w-[350px]">
                        <div className="  flex  flex-col items-center   justify-center  gap-3 border-white-light" onClick={createNewCard}>
                            <div className=" h-[60px] w-[60px] rounded-full border border-solid border-white bg-purple-Light">
                                <Image src={PLUS} alt="plus" className=" h-[100%] w-[100%] min-w-fit rounded-full object-cover"></Image>
                            </div>
                            <div>
                                <h1 className=" text-xl font-bold tracking-wide ">Create another Card </h1>
                            </div>
                        </div>
                    </div>
                </div> */}
            </ImageProvider>
        </>
    );
};
export default Index;
