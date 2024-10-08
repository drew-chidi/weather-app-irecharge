import { CurrentWeatherType } from '@/types/weather.type';
import { Card, CardContent } from '../ui/card';
import { Humidity, Wind, Pressure, UV } from '@/assets/images';
import { Loader2 } from 'lucide-react';

type Props = {
  current: CurrentWeatherType;
  loading: boolean;
};

const WeatherInfoCard = ({ current, loading }: Props) => {
  return (
    <Card className=''>
      {loading ? (
        <Loader2 className='animate-spin w-14 h-14' />
      ) : (
        <CardContent className='flex py-6 gap-10'>
          <div className='flex flex-col'>
            <div>
              <p className='text-4xl font-bold lg:text-6xl mb-4'>
                {current?.temperature}
                <sup>o</sup>C
              </p>
              <div className='flex items-center gap-1'>
                <span className='text-lg font-semibold'>Feels like: </span>{' '}
                <span className='text-3xl font-bold'>
                  {current?.feelslike}
                  <sup>o</sup>C
                </span>
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <img
              src={current?.weather_icons[0]}
              alt='sunny'
              className='w-24 h-auto lg:w-[13.5rem] mb-8 rounded-3xl '
            />
            <h3 className='text-3xl font-bold'>
              {current?.weather_descriptions[0]}
            </h3>
          </div>
          <div className='grid grid-cols-2 gap-8'>
            <div className='flex flex-col justify-between items-center'>
              <img
                src={Humidity}
                alt='humidity'
                className='w-[3.75rem] h-[3.75rem]'
              />
              <p className='text-xl font-semibold'>{current?.humidity}%</p>
              <p className='font-medium'>Humidity</p>
            </div>
            <div className='flex flex-col justify-between items-center'>
              <img src={Wind} alt='Wind' className='w-[3.75rem] h-auto' />
              <p className='text-xl font-semibold'>
                {current?.wind_speed} {current?.wind_degree}
                <sup>o</sup> {current?.wind_dir}
              </p>
              <p className='font-medium'>Wind Speed</p>
            </div>
            <div className='flex flex-col justify-between items-center'>
              <img
                src={Pressure}
                alt='Pressure'
                className='w-[3.75rem] h-auto'
              />
              <p className='text-xl font-semibold'>{current?.pressure}hPa</p>
              <p className='font-medium'>Pressure</p>
            </div>
            <div className='flex flex-col justify-between items-center'>
              <img src={UV} alt='UV' className='w-[3.75rem] h-auto' />
              <p className='text-xl font-semibold'>{current?.uv_index}</p>
              <p className='font-medium'>UV</p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default WeatherInfoCard;
