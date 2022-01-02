import * as React from "react";

interface BurgerButtonProps {
        func: Function;
}

const BurgerButton: React.FunctionComponent<BurgerButtonProps> = ({
        func = () => {
                console.log("Not work");
        },
}) => {
        return (
                <div className="flex flex-col p-2" onClick={() => func()}>
                        <span className="h-0.5 mb-1 w-8 block bg-gray-800"></span>
                        <span className="h-0.5 mb-1 w-8 block bg-gray-800"></span>
                        <span className="h-0.5 mb-1 w-8 block bg-gray-800"></span>
                        <span className="h-0.5 w-8 block bg-gray-800"></span>
                </div>
        );
};

export default BurgerButton;
