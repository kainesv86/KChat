import * as React from "react";
import InputField from "../common/inputField";

interface FormProps {
        handleSubmit?: React.FormEventHandler;
}

const Form: React.FunctionComponent<FormProps> = ({ children, handleSubmit }) => {
        return (
                <form className="flex flex-col px-4 py-20 w-full sm:w-96" onSubmit={handleSubmit}>
                        {children}
                </form>
        );
};

export default Form;
