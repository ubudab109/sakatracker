import { ArrowUpCircle, ArrowDownCircle } from 'react-feather';

export default function SwapButton(props) {
    // console.log('swap-button', props);
    return(
        <div>
            <a href='javascript:;' className='text-gray-500'>
                {
                    props.icon == 'up' 
                ? 
                    <ArrowUpCircle />
                :
                    <ArrowDownCircle />
                }
            </a>
        </div>
    );
}