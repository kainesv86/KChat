import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const Icon: React.FunctionComponent<IconProps> = (props) => {
        return (
                <svg className="w-fit h-fit" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
                        <path
                                d="M15 12C17.21 12 19 10.21 19 8C19 5.79 17.21 4 15 4C12.79 4 11 5.79 11 8C11 10.21 12.79 12 15 12ZM6 10V8C6 7.45 5.55 7 5 7C4.45 7 4 7.45 4 8V10H2C1.45 10 1 10.45 1 11C1 11.55 1.45 12 2 12H4V14C4 14.55 4.45 15 5 15C5.55 15 6 14.55 6 14V12H8C8.55 12 9 11.55 9 11C9 10.45 8.55 10 8 10H6ZM15 14C12.33 14 7 15.34 7 18V19C7 19.55 7.45 20 8 20H22C22.55 20 23 19.55 23 19V18C23 15.34 17.67 14 15 14Z"
                                fill="#323232"
                        />
                </svg>
        );
};

export default Icon;
