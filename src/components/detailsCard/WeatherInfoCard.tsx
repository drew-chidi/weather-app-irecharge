import { Card, CardContent } from '../ui/card';
import {
  Sunset,
  Sunrise,
  Sunny,
  Humidity,
  Wind,
  Pressure,
  UV,
} from '@/assets/images';

const WeatherInfoCard = () => {
  return (
    <Card className=''>
      <CardContent className='flex py-6 gap-10'>
        <div className='flex flex-col'>
          <div>
            <p className='text-4xl font-bold lg:text-7xl'>
              24<sup>o</sup>C
            </p>
            <div className='flex items-center gap-1'>
              <span className='text-lg font-semibold'>Feels like:</span>{' '}
              <span className='text-3xl font-bold'>
                24<sup>o</sup>C
              </span>
            </div>
          </div>
          <div className='mt-[1.625rem]'>
            <div className='flex gap-4 mb-2.5'>
              {/* Icon here */}
              <img src={Sunrise} alt='sunrise' />
              <div>
                <p>Sunrise</p>
                <p>06:37 AM</p>
              </div>
            </div>
            <div className='flex gap-4'>
              <img src={Sunset} alt='sunset' />
              <div>
                <p className='font-bold'>Sunset</p>
                <p className='font-semibold'>20:37 AM</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <img
            src={Sunny}
            alt='sunny'
            className='w-24 h-auto lg:w-[13.5rem] -mt-14'
          />
          <h3 className='text-3xl font-bold'>Sunny</h3>
        </div>
        <div className='grid grid-cols-2 gap-8'>
          <div className='flex flex-col justify-between items-center'>
            <img
              src={Humidity}
              alt='humidity'
              className='w-[3.75rem] h-[3.75rem]'
            />
            <p className='text-xl font-semibold'>41%</p>
            <p className='font-medium'>Humidity</p>
          </div>
          <div className='flex flex-col justify-between items-center'>
            <img src={Wind} alt='Wind' className='w-[3.75rem] h-auto' />
            <p className='text-xl font-semibold'>41%</p>
            <p className='font-medium'>Wind Speed</p>
          </div>
          <div className='flex flex-col justify-between items-center'>
            <img src={Pressure} alt='Pressure' className='w-[3.75rem] h-auto' />
            <p className='text-xl font-semibold'>41%</p>
            <p className='font-medium'>Pressure</p>
          </div>
          <div className='flex flex-col justify-between items-center'>
            <img src={UV} alt='UV' className='w-[3.75rem] h-auto' />
            <p className='text-xl font-semibold'>41%</p>
            <p className='font-medium'>UV</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherInfoCard;
