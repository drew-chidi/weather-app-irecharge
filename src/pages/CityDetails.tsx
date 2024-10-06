import DaysForecastCard from '@/components/detailsCard/DaysForecastCard';
import HourlyForecastCard from '@/components/detailsCard/HourlyForecast';
import WeatherInfoCard from '@/components/detailsCard/WeatherInfoCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

type Props = {};

const CityDetailsPage = (props: Props) => {
  return (
    <div className='flex gap-14 flex-wrap px-8 sm:px-14 lg:px-20 py-14'>
      <div>
        <Card className='w-[350px]'>
          <CardHeader>
            <div className='flex items-center justify-center'>
              <CardTitle className='font-bold'>Athens</CardTitle>
            </div>
            {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
          </CardHeader>
          <CardContent>
            <>
              <div className='flex items-center gap-1 flex-col'>
                <p className='text-4xl font-bold'>09:03</p>
                <p>Thursday, 31 Aug</p>
              </div>
            </>
          </CardContent>
        </Card>
      </div>
      <div>
        <WeatherInfoCard />
      </div>
      <DaysForecastCard />
      <HourlyForecastCard />
    </div>
  );
};

export default CityDetailsPage;
