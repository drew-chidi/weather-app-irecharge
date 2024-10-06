import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type CityListType = {
  onDelete: () => void;
};

export function CityListCard({}: Props) {
  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='font-bold'>Athens</CardTitle>
          <button className='bg-transparent text-xl font-bold m-0 p-0'>
            ...
          </button>
        </div>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <>
          <div className='grid w-full items-center gap-4'>
            <div className='flex items-center gap-8 justify-between'>
              <p className='text-4xl font-bold'>
                24<sup>o</sup>C
              </p>
              <p>Raining off and on</p>
            </div>
          </div>
        </>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <Button variant='outline'>See full forecast</Button>
      </CardFooter>
    </Card>
  );
}
