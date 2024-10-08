import { addFavorite, removeFavorite } from '@/redux/features/citySlice';
import { RootState } from '@/redux/store';
import { CurrentLocationWeatherType } from '@/types/weather.type';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  data: CurrentLocationWeatherType;
  hasFavorite?: boolean;
};

const CurrentSection = ({ data, hasFavorite }: Props) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.city.favorites);
  const [favorite, setFavorite] = useState(
    favorites?.includes(data?.location?.region ?? '')
  );

  useEffect(() => {
    // Synchronize the favorite state with the redux store
    setFavorite(favorites?.includes(data?.location?.region ?? ''));
  }, [favorites, data?.location?.region]);

  const handleFavoriteClick = () => {
    const region = data?.location?.region ?? '';

    if (favorite) {
      // If already favorited, remove it
      dispatch(removeFavorite(region));
      localStorage.setItem(
        'favorites',
        JSON.stringify(favorites.filter((fav: string) => fav !== region))
      );
    } else {
      // Otherwise, add it
      dispatch(addFavorite(region));
      localStorage.setItem('favorites', JSON.stringify([...favorites, region]));
    }

    // Toggle the favorite state
    setFavorite((current: boolean) => !current);
  };

  const cloudCover =
    data?.current && data?.current?.cloudcover > 50
      ? ' The skies will be mostly cloudly.'
      : 'The skies will be mostly clear';

  return (
    <section className=''>
      <h1 className='mb-3.5 font-bold text-[#333]'>{`${
        hasFavorite ? 'Search result for ' : ''
      }${data?.location?.name ?? ''}, ${data?.location?.region ?? ''}, ${
        data?.location?.country ?? ''
      }`}</h1>

      <div className='bg-transparent/60 p-4 rounded-md text-white'>
        <div className='flex justify-between items-center'>
          <div>
            <h2 className='font-semibold text-sm'>Current weather</h2>
            <p className='text-xs'>{data?.location?.localtime ?? '-- : --'}</p>
          </div>
          {hasFavorite && (
            <Heart
              fill={`${favorite ? 'red' : ''}`}
              onClick={handleFavoriteClick}
            />
          )}
        </div>
        <div className='mt-6 flex items-center gap-5'>
          <img
            src={data?.current?.weather_icons[0]}
            alt='weather icon'
            className='rounded-md w-[3rem] h-[3rem] '
          />
          <span className='text-5xl font-medium col-span-1'>
            {data?.current?.temperature}
            <sup>
              <sup>o</sup>C
            </sup>
          </span>
          <div>
            <h3 className='font-semibold'>
              {data?.current?.weather_descriptions?.length
                ? data?.current?.weather_descriptions[0]
                : ''}
            </h3>
            <p>
              Feels like {data?.current?.feelslike} <sup>o</sup>
            </p>
          </div>
        </div>
        <p className='mt-5 mb-7 font-medium'>{cloudCover}</p>
        <div className='flex items-center gap-7 flex-wrap'>
          <div>
            <p className='text-sm'>Wind</p>
            <p className='flex items-center gap-1.5'>
              {data?.current?.wind_speed} {data?.current?.wind_dir}
            </p>
          </div>
          <div>
            <p className='text-sm'>Humidity</p>
            <p className='flex items-center gap-1.5'>
              {data?.current?.humidity}%
            </p>
          </div>
          <div>
            <p className='text-sm'>Visibility</p>
            <p className='flex items-center gap-1.5'>
              {data?.current?.visibility} mi
            </p>
          </div>
          <div>
            <p className='text-sm'>Pressure</p>
            <p>{data?.current?.pressure}</p>
          </div>
          <div>
            <p className='text-sm'>Dew point</p>
            <p>
              48<sup>o</sup>
            </p>
          </div>
          <div>
            <p className='text-sm'>Feels like</p>
            <p>
              {data?.current?.feelslike}
              <sup>o</sup>
            </p>
          </div>
          <div>
            <p className='text-sm'>UV index</p>
            <p>{data?.current?.uv_index}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentSection;
