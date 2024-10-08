import { CityListCard } from '../detailsCard/CityListCard';
import { ListWeatherData } from '@/types/weather.type';
import { Heart, Loader2, RefreshCwIcon } from 'lucide-react';

type Props = {
  data: ListWeatherData[];
  isLoading: boolean;
  onRemove: (e: string) => void;
  onRefresh: () => void;
};

const Favourites = ({ data, isLoading, onRemove, onRefresh }: Props) => {
  return (
    <section>
      {' '}
      <div>
        <h2 className='mb-3.5 font-bold text-[#333] lg:text-2xl flex items-center justify-between'>
          <div className='flex items-center gap-2 '>
            Favourite Cities <Heart fill='#4CBB17' className='animate-pulse' />
          </div>
          <RefreshCwIcon
            className={`h-4 w-4 ${isLoading && 'animate-spin'}`}
            onClick={() => onRefresh()}
          />
        </h2>
        {isLoading ? (
          <p className='flex items-center gap-1.5 tracking-tight text-sm'>
            <Loader2 className='animate-spin h-4 w-4' /> Loading weather data...
          </p>
        ) : data && data?.length > 0 ? (
          <div className='flex gap-6 flex-wrap flex-grow'>
            {data.map(({ city, temperature, icon }: ListWeatherData) => (
              <CityListCard
                key={city}
                onDelete={onRemove}
                city={city}
                temperature={temperature}
                icon={icon}
              />
            ))}
          </div>
        ) : (
          <div>
            <p className='text-sm tracking-tight'>No Favorite added yet!</p>
          </div>
        )}
        <hr className='mt-14 mb-20 border botder-border' />
      </div>
    </section>
  );
};

export default Favourites;
