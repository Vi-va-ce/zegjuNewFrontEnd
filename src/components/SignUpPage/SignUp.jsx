import React from 'react';
import { backb } from '../../assets';
import Forms from './Forms';
import { Link } from 'react-router-dom';

function SignUp() {

  return (
    <div className='bg-[#ecf7f8]'>

    <Link to= '/'>
      <button className='pl-[12px] pt-[12px] transition-transform duration-300 hover:scale-110'>
        <img src={backb} />
      </button>
    </Link>
      <div className='pt-[160px] md:pt-[30px] flex items-center justify-center pb-52'>
        <Forms />
      </div>
    </div>
  );
}

export default SignUp;