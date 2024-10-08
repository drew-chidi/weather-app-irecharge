import { CityListCard } from '@/components/CityListCard';
import CurrentSection from '@/components/CurrentSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CITIES } from '@/constant/cities';
import useFavorites from '@/hook/useFavorites';
import useFetchWeatherData, { WeatherData } from '@/hook/useWeatherData';
import {
  useGetCurrentWeatherByCityQuery,
  useGetWeatherByCoordsQuery,
} from '@/redux/services/weatherApi';
import { Heart, LocateFixedIcon, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const HomePage = () => {
  const [topCities, setTopCities] = useState(CITIES);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { weatherData: topCitiesResponse, loading: isLoadingTopCities } =
    useFetchWeatherData(topCities);
  const {
    favoriteWeatherData,
    loading: isLoadingFavorites,
    removeFavoriteCity,
  } = useFavorites();

  const [activateSearch, setActivateSearch] = useState(false);

  const {
    data: searchResponse,
    error: searchError,
    isLoading: isSearchingCityWeather,
  } = useGetCurrentWeatherByCityQuery(searchQuery, {
    skip: !activateSearch,
  });

  const handleRemoveCity = (city: string) => {
    setTopCities((prev) => prev.filter((c) => c !== city));
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
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

  useEffect(() => {
    handleLocationClick();
  }, []);

  const { data: currentLocationResponse } = useGetWeatherByCoordsQuery(
    { lat: location?.lat, lon: location?.lon },
    { skip: !location }
  );

  useEffect(() => {
    if (currentLocationResponse && !currentLocationResponse?.success) {
      toast.error(`${currentLocationResponse?.error?.info}`);
    }
  }, [currentLocationResponse]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery) {
      setActivateSearch(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  useEffect(() => {
    if (searchQuery?.trim().length === 0) {
      setActivateSearch(false);
    }
  }, [searchQuery]);

  return (
    <div className='p-8 lg:px-16 lg:py-10'>
      <div className='flex items-center gap-4 w-full justify-between mb-12'>
        <div className='relative flex items-center w-full max-w-[12.5rem]'>
          <Input
            className='px-4 pr-12 py-2 rounded-xl'
            type='text'
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder='Search for a city by pressing enter...'
          />
          <Search
            className='absolute right-2 text-muted-foreground cursor-pointer'
            onClick={handleSearchSubmit}
          />
        </div>
        <Button
          className='bg-[#4CBB17] hover:bg-[#4CBB17]/80'
          onClick={handleLocationClick}
        >
          <LocateFixedIcon className='text-black mr-2' /> Current Location
        </Button>
      </div>

      {/* Search Result Section */}
      {searchQuery?.trim().length > 0 && (
        <div className='mb-10'>
          {searchResponse ? (
            <CurrentSection data={searchResponse} hasFavorite />
          ) : (
            <p>No data found for this search input</p>
          )}
          <hr className='mt-14 mb-20 border botder-border' />
        </div>
      )}

      {/* Favorites */}
      <div>
        <h2 className='mb-3.5 font-bold text-[#333] flex items-center gap-2'>
          Favourite Cities <Heart fill='red' className='animate-pulse' />
        </h2>
        {isLoadingFavorites ? (
          <p>Loading weather data...</p>
        ) : favoriteWeatherData && favoriteWeatherData.length > 0 ? (
          <div className='flex gap-6 flex-wrap flex-grow'>
            {favoriteWeatherData.map(
              ({ city, temperature, condition, icon }: WeatherData) => (
                <CityListCard
                  key={city}
                  onDelete={removeFavoriteCity}
                  // onDelete={() => dispatch(removeFavorite(city))}
                  city={city}
                  temperature={temperature}
                  condition={condition}
                  icon={icon}
                />
              )
            )}
          </div>
        ) : (
          <div>
            <p>No Favorite added yet</p>
          </div>
        )}
        <hr className='mt-14 mb-20 border botder-border' />
      </div>

      {/* Current Location Weather */}
      <div className='mb-10'>
        <CurrentSection data={currentLocationResponse} />
        <hr className='mt-14 mb-20 border botder-border' />
      </div>

      {/* Top Cities */}
      <div className='cursor-pointer'>
        <h2 className='mb-3.5 font-bold text-[#333]'>Top Cities</h2>
        {isLoadingTopCities ? (
          <p>Loading weather data...</p>
        ) : topCitiesResponse &&
          Array.isArray(topCitiesResponse) &&
          topCitiesResponse.length > 0 ? (
          <div className='flex gap-6 flex-wrap flex-grow'>
            {topCitiesResponse.map(
              ({ city, temperature, condition, icon }: WeatherData) => (
                <CityListCard
                  key={city}
                  onDelete={handleRemoveCity}
                  city={city}
                  temperature={temperature}
                  condition={condition}
                  icon={icon}
                />
              )
            )}
          </div>
        ) : (
          <p>No data available for the cities.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
