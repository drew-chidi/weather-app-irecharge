import WeatherInfoCard from '@/components/detailsCard/WeatherInfoCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetCurrentWeatherByCityQuery } from '@/redux/services/weatherApi';
import { formatLocalTime } from '@/utilities/helpers/formatLocalTime';
import { HomeIcon, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const CityDetailsPage = () => {
  const { city } = useParams<{ city: string }>();
  const { data, isLoading } = useGetCurrentWeatherByCityQuery(city, {
    skip: !city,
  });

  const localtime = data?.location?.localtime;
  const { time, formattedDate } = localtime
    ? formatLocalTime(localtime)
    : { time: '', formattedDate: '' };

  const [notes, setNotes] = useState<string>(() => {
    const storedNotes = localStorage.getItem(`weather-notes-${city}`);
    return storedNotes ? storedNotes : '';
  });

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleSaveNote = () => {
    localStorage.setItem(`weather-notes-${city}`, notes);
  };

  const handleDeleteNote = () => {
    setNotes('');
    localStorage.removeItem(`weather-notes-${city}`);
  };

  useEffect(() => {
    const storedNotes = localStorage.getItem(`weather-notes-${city}`);
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, [city]);

  return (
    <div className='max-w-[80rem] mx-auto'>
      <div className=' px-8 sm:px-14 lg:px-20 py-10'>
        <Link to='/'>
          <HomeIcon className='w-14 h-14' />
        </Link>
      </div>
      <div className='flex gap-14 flex-wrap px-8 sm:px-14 lg:px-20 py-14'>
        <div>
          <Card className='w-[350px]'>
            <CardHeader>
              <div className='flex items-center justify-center'>
                <CardTitle className='font-bold'>{city}</CardTitle>
              </div>
            </CardHeader>
            {isLoading ? (
              <Loader2 className='animate-spin w-14 h-14 mx-auto' />
            ) : (
              <CardContent>
                <>
                  <div className='flex items-center gap-1 flex-col'>
                    <p className='text-4xl font-bold lg:text-7xl'>
                      {time ?? '--'}
                    </p>
                    <p>{formattedDate ?? '--'}</p>
                  </div>
                </>
              </CardContent>
            )}
          </Card>
        </div>
        <div>
          <WeatherInfoCard current={data?.current} loading={isLoading} />
        </div>
        {/* Notes Section */}
        <div className='w-full'>
          <Card>
            <CardHeader>
              <CardTitle>Weather Notes for {city}</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={notes}
                onChange={handleNoteChange}
                placeholder='Add your notes here...'
                className='w-full p-2 border rounded'
                rows={4}
              />
              <div className='flex gap-4 mt-4'>
                <button
                  onClick={handleSaveNote}
                  className='bg-green-500 text-white px-4 py-2 rounded'
                >
                  Save Note
                </button>
                <button
                  onClick={handleDeleteNote}
                  className='bg-red-500 text-white px-4 py-2 rounded'
                >
                  Delete Note
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CityDetailsPage;
