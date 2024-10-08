import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DeleteIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = {
  onDelete: (city: string) => void;
  city: string;
  temperature: number;
  condition: string;
  icon: string;
};

export function CityListCard({
  onDelete,
  city,
  temperature,
  condition,
  icon,
}: Props) {
  return (
    <Card className=''>
      <CardHeader>
        <div className='flex items-center justify-between gap-5'>
          <CardTitle className='font-bold'>{city}</CardTitle>
          <DeleteIcon
            color='red'
            onClick={() => {
              onDelete(city);
              console.log('killllllllll');
            }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <>
          <div className=''>
            <div className=''>
              <img src={icon} className='rounded-lg w-10 h-10' />
              <p className='text-4xl font-bold mt-4'>
                {temperature}
                <sup>o</sup>C
              </p>
            </div>
          </div>
        </>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <Link to={`/${city}`} className='hover:underline'>
          See full forecast
        </Link>
      </CardFooter>
    </Card>
  );
}
