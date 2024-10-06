import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const HourlyForecastCard = () => {
  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle className='text-center text-3xl font-bold'>
          Hourly Forecast:
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='inline-flex flex-col justify-between gap-5 items-center border-border border rounded-3xl px-6 py-[1.125rem]'>
          <p>12:00</p>
          {/* Icon */}
          <p className='text-4xl font-bold'>
            24<sup>o</sup>C
          </p>
          {/* Arrow Icon Here */}
          <p>3km/h</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyForecastCard;
