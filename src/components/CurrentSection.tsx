import { CurrentLocationWeatherType } from '@/types/weather.type';
import { SendIcon } from 'lucide-react';

type Props = {
  data: CurrentLocationWeatherType;
};

const CurrentSection = ({ data }: Props) => {
  console.log({ data });
  const cloudCover =
    data?.current && data?.current?.cloudcover > 50
      ? ' The skies will be mostly cloudly.'
      : 'The skies will be mostly clear';
  return (
    <section className=''>
      <h1 className='mb-3.5 font-bold text-[#333]'>{`${
        data?.location?.name ?? ''
      }, ${data?.location?.region ?? ''}, ${
        data?.location?.country ?? ''
      }`}</h1>

      <div className='bg-transparent/60 p-4 rounded-md text-white'>
        <h2 className='font-semibold text-sm'>Current weather</h2>
        <p className='text-xs'>{data?.location?.localtime ?? '-- : --'}</p>
        <div className='mt-6 flex items-center gap-5'>
          {/* Weather Icon */}
          <img
            src={data?.current?.weather_icons[0]}
            alt='weather icon'
            className='rounded-md w-[3.75rem] h-[3.75rem] '
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
        <div className='flex items-center gap-7 text-wrap'>
          <div>
            <p className='text-sm'>Wind</p>
            <p className='flex items-center gap-1.5'>
              {data?.current?.wind_speed} {data?.current?.wind_dir}
              <SendIcon size={14} />
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
