import { CityListCard } from '@/components/CityListCard';
import CurrentSection from '@/components/CurrentSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CITIES } from '@/constant/cities';
import { useGetWeatherByCoordsQuery } from '@/redux/services/weatherApi';
import { Heart, LocateFixedIcon, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
// import { useNavigation } from 'react-router-dom';
import { toast } from 'sonner';

const HomePage = () => {
  // const navigate = useNavigation;
  const [topCities, setTopCities] = useState(CITIES);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const cityQueryString = topCities.join(';');
  const [weatherData, setWeatherData] = useState<Record<string, any>>({});

  // const {
  //   data: weatherData,
  //   error: weatherError,
  //   isLoading: isGettingCityWeather,
  // } = useGetCurrentWeatherByCityQuery(cityQueryString);

  const handleRemoveCity = (city: string) => {
    setTopCities((prev) => prev.filter((c) => c !== city));
  };

  console.log({ weatherData, error });

  // const handleAddFavorite = (city: string) => {
  //   if (!favorites.includes(city)) {
  //     setFavorites((prev) => [...prev, city].sort());
  //   }
  // };

  // const handleCityClick = (cityName: string) => {
  //   navigate(`/city/${cityName}`);
  // };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Log the coordinates
          console.log('Latitude:', latitude, 'Longitude:', longitude);

          // Set the location state to be used later
          setLocation({ lat: latitude, lon: longitude });
        },
        (error) => {
          setError(
            `Location access denied. Please allow location access. ${error}`
          );
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  const {
    data: currentLocationResponse,
    error: currentLocationWeatherError,
    // isLoading: isGettingCurrentLocationData,
  } = useGetWeatherByCoordsQuery(
    { lat: location?.lat, lon: location?.lon },
    { skip: !location }
  );

  useEffect(() => {
    if (currentLocationResponse && !currentLocationResponse?.success) {
      toast.error(`${currentLocationResponse?.error?.info}`);
    }
  }, [currentLocationResponse]);

  console.log({
    currentLocationResponse,
    location,
    currentLocationWeatherError,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='p-8 lg:px-16 lg:py-10'>
      <div className='flex items-center gap-4 w-full justify-between mb-12'>
        {/* <SearchInput /> */}
        <div className='relative flex items-center'>
          <Search className='absolute left-2 text-muted-foreground' />
          <Input
            className='pl-12 pr-4 py-2 rounded-xl'
            type='text'
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder='Search for a city...'
          />
        </div>
        <Button
          className='bg-[#4CBB17] hover:bg-[#4CBB17]/80'
          onClick={handleLocationClick}
        >
          <LocateFixedIcon className='text-black mr-2' /> Current Location
        </Button>
      </div>
      {/* Favourites */}
      <div>
        <h2 className='mb-3.5 font-bold text-[#333] flex items-center gap-2'>
          Favourite Cities <Heart fill='red' className='animate-pulse' />
        </h2>
      </div>
      {/* Current Location Weather */}
      <div className='mb-10'>
        <CurrentSection data={currentLocationResponse} />
      </div>
      {/* Top Cities */}
      <div
        // onClick={() => handleCityClick('New York')}
        className='cursor-pointer'
      >
        <h2 className='mb-3.5 font-bold text-[#333]'>Top Cities</h2>

        {/* {isGettingCityWeather ? (
          <p>Loading weather data...</p>
        ) : (
          <div>
            <CityListCard
              onDelete={handleRemoveCity}
              // city={city}
              weather={weatherData}
            />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default HomePage;
