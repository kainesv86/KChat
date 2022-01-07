import * as React from "react";

interface FormProps {
        handleSubmit?: React.FormEventHandler;
}

const Form: React.FunctionComponent<FormProps> = ({ children, handleSubmit }) => {
        return (
                <form className="flex flex-col px-4 w-full sm:w-96" onSubmit={handleSubmit}>
                        {children}
                </form>
        );
};

export default Form;
