import { getBrowserInfo } from '@/Utils/helper';
import { forwardRef, useEffect, useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    const renderMonthContent = (month, shortMonth, longMonth, day) => {
        const fullYear = new Date(day).getFullYear();
        const tooltipText = `Tooltip for month: ${longMonth} ${fullYear}`;
        console.log(tooltipText);
        return <span title={tooltipText}>{shortMonth}</span>;
    };

    useEffect(() => {
        if (getBrowserInfo('Chrome')) {
            if (isFocused) {
                input.current.focus();
            }
        }
    }, []);

    if (type === 'month') {
        if (getBrowserInfo('Chrome')) {
            return (
                <input
                    {...props}
                    type="month"
                    className={
                        'border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm ' +
                        className
                    }
                    ref={input}
                />
            );
        } else {
            return (
                <DatePicker
                    className={'border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm ' +
                        className}
                    ref={input}
                    showIcon
                    icon={
                        <svg
                            style={{marginTop: '6px', position: 'absolute', right: '0'}}
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 48 48"
                        >
                            <mask id="ipSApplication0">
                                <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
                                    <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                                    <path
                                        fill="#fff"
                                        d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                                    ></path>
                                </g>
                            </mask>
                            <path
                                fill="currentColor"
                                d="M0 0h48v48H0z"
                                mask="url(#ipSApplication0)"
                            ></path>
                        </svg>
                    }
                    {...props}
                    selected={new Date()}
                    renderMonthContent={renderMonthContent}
                    showMonthYearPicker

                />
            );
        }
    } else {
        <input
            {...props}
            type={type}
            className={
                'border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm ' +
                className
            }
            ref={input}
        />
    }
});
