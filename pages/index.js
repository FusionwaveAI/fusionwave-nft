import { useEffect, useState, useRef } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

import { Banner, CreatorCard, NFTCard } from '../components';
import images from '../assets';
import { makeid } from '../utils/makeId';

const Home = () => {
  const [hideButtons, setHideButtons] = useState(false);
  const parentRef = useRef(null);
  const scrollRef = useRef(null);

  const { theme } = useTheme();

  const handleScroll = (direction) => {
    const { current } = scrollRef;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  // check if scrollRef container is overfilling its parentRef container
  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (current?.scrollWidth >= parent?.offsetWidth) return setHideButtons(false);
    return setHideButtons(true);
  };

  // if window is resized
  useEffect(() => {
    isScrollable();
    window.addEventListener('resize', isScrollable);

    return () => {
      window.removeEventListener('resize', isScrollable);
    };
  });

  return (

    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">

        <Banner
          name={(<>GenerativeAI enabled NFT Marketplace <br />Create AI Magic </>)}
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
          parentStyle="justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          handleClick={() => window.open('https://labs.openai.com')}
        />

        <div className="mt-16">
          <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
            <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1
                text-2xl minlg:text-4xl font-semibold sm:mb-4"
            >
              Top NFTs
            </h1>
            <div className="flex-2 sm:w-full flex flex-row sm:flex-col">
              Search Bar
            </div>
          </div>
          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <NFTCard
                key={`nft-${i}`}
                nft={{
                  i,
                  name: `Nifty NFT ${i}`,
                  price: (10 - i * 0.534).toFixed(2),
                  seller: `0x${makeid(3)}...${makeid(4)}`,
                  owner: `0x${makeid(3)}...${makeid(4)}`,
                  description: 'NFT on Sale',
                }}
              />
            ))}
          </div>
        </div>
        <div className="mt-10">
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl
          font-semibold ml-4 xs:ml-0"
          >
            Top Creators
          </h1>

          <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
            <div
              className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
              ref={scrollRef}
            >

              {[6, 7, 8, 9, 10].map((i) => (
                <CreatorCard
                  key={`creator-${i}`}
                  rank={i}
                  creatorImage={images[`creator${i}`]}
                  creatorName={`0x${makeid(3)}...${makeid(4)}`}
                  creatorEths={10 - i * 0.534}
                />
              ))}
              {!hideButtons && (
              <>
                <div
                  onClick={() => handleScroll('left')}
                  className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0"
                >
                  <Image
                    src={images.left}
                    layout="fill"
                    objectFit="contain"
                    alt="left_arrow"
                    className={theme === 'light' ? 'filter invert' : undefined}
                  />
                </div>
                <div
                  onClick={() => handleScroll('right')}
                  className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
                >
                  <Image
                    src={images.right}
                    layout="fill"
                    objectFit="contain"
                    alt="left_arrow"
                    className={theme === 'light' ? 'filter invert' : undefined}
                  />
                </div>
              </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
