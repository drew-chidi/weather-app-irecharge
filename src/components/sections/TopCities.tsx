import { ListWeatherData } from '@/types/weather.type';
import { CityListCard } from '../detailsCard/CityListCard';
import { RefreshCwIcon } from 'lucide-react';

type Props = {
  data: ListWeatherData[];
  isLoading: boolean;
  onDelete: (e: string) => void;
  onRefresh: () => void;
};
const TopCities = ({ data, isLoading, onDelete, onRefresh }: Props) => {
  return (
    <section>
      {' '}
      <div className=''>
        <h2 className='mb-3.5 font-bold text-[#333] lg:text-2xl flex items-center justify-between'>
          Top Cities{' '}
          <RefreshCwIcon
            className={`h-4 w-4 ${isLoading && 'animate-spin'}`}
            onClick={() => onRefresh()}
          />
        </h2>
        {isLoading ? (
          <p>Loading weather data...</p>
        ) : data && data?.length > 0 ? (
          <div className='flex gap-6 flex-wrap flex-grow'>
            {data.map(({ city, temperature, icon }: ListWeatherData) => (
              <CityListCard
                key={city}
                onDelete={onDelete}
                city={city}
                temperature={temperature}
                icon={icon}
              />
            ))}
          </div>
        ) : (
          <p>No data available for the cities.</p>
        )}
      </div>
    </section>
  );
};

export default TopCities;
