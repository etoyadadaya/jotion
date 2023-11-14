import Image from 'next/image';

export const Heroes = () => {
  return (
    <div className='flex max-w-5xl flex-col items-center justify-center'>
      <div className='flex items-center'>
        <div className='md:w=[400px] relative h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] md:h-[400px]'>
          <Image
            className='object-contain dark:hidden'
            src='/documents.png'
            alt='Documents'
            fill
          />
          <Image
            className='hidden object-contain dark:block'
            src='/documents-dark.png'
            alt='Documents'
            fill
          />
        </div>
        <div className='relative hidden h-[400px] w-[400px] md:block'>
          <Image
            className='object-contain dark:hidden'
            src='/reading.png'
            alt='Reading'
            fill
          />
          <Image
            className='hidden object-contain dark:block'
            src='/reading-dark.png'
            alt='Reading'
            fill
          />
        </div>
      </div>
    </div>
  );
};
