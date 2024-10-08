import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = {
  onDelete: (city: string) => void;
  city: string;
  temperature: number;
  icon: string;
};

export function CityListCard({ onDelete, city, temperature, icon }: Props) {
  return (
    <Card className='w-[10rem]'>
      <CardHeader className='px-4'>
        <div className='flex items-center justify-between gap-1'>
          <CardTitle className='font-bold text-wrap'>{city}</CardTitle>
          <div>
            <Trash2
              color='red'
              onClick={() => {
                onDelete(city);
              }}
              className='w-4 h-4'
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className='px-4'>
        <>
          <div className='text-center'>
            <div className=''>
              <img src={icon} className='rounded-lg w-10 h-10 mx-auto' />
              <p className='text-2xl lg:text-3xl font-bold mt-4'>
                {temperature}
                <sup>o</sup>C
              </p>
            </div>
          </div>
        </>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <Link to={`/${city}`} className='hover:underline tracking-tighter'>
          See full forecast
        </Link>
      </CardFooter>
    </Card>
  );
}
