import { InfoIcon } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { CurrentLocationWeatherType } from '@/types/weather.type';

type Props = { data: CurrentLocationWeatherType };

function CurrentWeather({ data }: Props) {
  useEffect(() => {
    if (data?.success) return;
    if (!data?.success) {
      toast.error(`${data?.error?.info}`);
    }
  }, [data]);

  return (
    <div>
      {!data || !data?.location || !data?.current ? (
        <p className='text-xs w-[10.5625rem] flex gap-1.5 tracking-tighter'>
          <InfoIcon className='text-red-500 w-6 h-6' />
          Couldn't get weather info for current location
        </p>
      ) : (
        <div>
          <p className='mb-1 font-bold text-[#333] text-sm'>{`${
            data?.location?.name ?? ''
          }, ${data?.location?.region ?? ''}, ${
            data?.location?.country ?? ''
          }`}</p>

          <div>
            <p className='text-xs'>{data?.location?.localtime ?? '-- : --'}</p>
          </div>
          <div className='mt-2 flex items-center gap-5'>
            <img
              src={data?.current?.weather_icons[0]}
              alt='weather icon'
              className='rounded-md w-[1.5rem] h-[1.5rem] '
            />
            <span className=' font-medium col-span-1'>
              {data?.current?.temperature}
              <sup>o</sup>C
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentWeather;
