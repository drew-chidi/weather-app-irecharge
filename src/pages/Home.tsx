import { LocateIcon, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import CurrentWeather from '@/components/sections/CurrentWeather';
import Favourites from '@/components/sections/Favourites';
import TopCities from '@/components/sections/TopCities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CITIES } from '@/constant/cities';
import useFavorites from '@/hook/useFavorites';
import useFetchWeatherData from '@/hook/useWeatherData';
import {
  useGetCurrentWeatherByCityQuery,
  useGetWeatherByCoordsQuery,
} from '@/redux/services/weatherApi';
import SearchResultSection from '@/components/sections/SeachResult';

const HomePage = () => {
  const [topCities] = useState(CITIES);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const {
    weatherData: topCitiesResponse,
    loading: isLoadingTopCities,
    refreshData: fetchUpdatedTopCitiesData,
    removeCity,
  } = useFetchWeatherData(topCities);
  const {
    favoriteWeatherData,
    loading: isLoadingFavorites,
    removeFavoriteCity,
  } = useFavorites();

  const [activateSearch, setActivateSearch] = useState(false);

  const { data: searchResponse } = useGetCurrentWeatherByCityQuery(
    searchQuery,
    {
      skip: !activateSearch,
    }
  );

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
        },
        () => {
          toast.error(`Location access denied. Please allow location access.`);
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser.');
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
    <div className='p-8 lg:px-16 lg:py-10 max-w-[80rem] mx-auto'>
      <div className=' mb-12'>
        <div className='flex items-center gap-4 w-full justify-between'>
          <div>
            <div className='relative flex items-center w-full max-w-[12.5rem] sm:min-w-[20rem] sm:max-w-[30rem]'>
              <Input
                className='px-4 pr-12 py-2 rounded-xl w-full outline-0 z-20'
                type='text'
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                placeholder='Search for a city by pressing enter...'
              />
              <Search
                className='bg-[#4CBB17] p-1 rounded-md text-white absolute right-2 text-muted-foreground cursor-pointer z-30'
                onClick={handleSearchSubmit}
              />
            </div>
          </div>
          <Button
            className='bg-[#4CBB17] hover:bg-[#4CBB17]/80  rounded-xl'
            onClick={handleLocationClick}
          >
            <LocateIcon className='mr-2 text-white' /> Current Location
          </Button>
        </div>
        <div className='w-full flex justify-end mt-6'>
          <CurrentWeather data={currentLocationResponse} />
        </div>
      </div>
      {/* Search Result Here */}
      {searchQuery?.trim().length > 0 && (
        <div className='mb-10'>
          {searchResponse?.location || searchResponse?.current ? (
            <SearchResultSection data={searchResponse} hasFavorite />
          ) : (
            <p>No data found for this search input</p>
          )}
          <hr className='mt-14 mb-20 border botder-border' />
        </div>
      )}
      <Favourites
        data={favoriteWeatherData}
        isLoading={isLoadingFavorites}
        onRemove={removeFavoriteCity}
        onRefresh={fetchUpdatedTopCitiesData}
      />
      <TopCities
        data={topCitiesResponse}
        isLoading={isLoadingTopCities}
        onDelete={removeCity}
        onRefresh={fetchUpdatedTopCitiesData}
      />
    </div>
  );
};

export default HomePage;
