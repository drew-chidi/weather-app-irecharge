import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const DaysForecastCard = () => {
  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle className='text-center text-3xl font-bold'>
          5 Days Forecast:
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className=''>
          <div className='grid grid-cols-5 gap-2'>
            {/* Icon */}
            <div className='col-span-1'></div>
            <p className='text-2xl font-bold col-span-1'>
              24<sup>o</sup>C
            </p>
            <p className='text-xl font-bold col-span-3 justify-self-center'>
              Friday, 1 Sep
            </p>
          </div>
          <div className='grid grid-cols-5 gap-x-4'>
            {/* Icon */}
            <div className='col-span-1'></div>
            <p className='text-2xl font-bold col-span-1'>
              24<sup>o</sup>C
            </p>
            <p className='text-xl font-bold col-span-3 justify-self-center'>
              Friday, 1 Sep
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DaysForecastCard;
