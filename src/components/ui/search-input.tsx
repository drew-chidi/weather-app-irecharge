import React from 'react';
import { Input } from './input';
import { Search } from 'lucide-react';

type Props = {};

const SearchInput = (props: Props) => {
  return (
    <div className='relative flex items-center'>
      <Search className='absolute' />
      <Input className='pl-8' />
    </div>
  );
};

export default SearchInput;
