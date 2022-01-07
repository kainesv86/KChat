import * as React from "react";

import InputField from "../../components/common/inputField";
import Form from "../../components/form";

import { useForm } from "react-hook-form";
import { UserLoginDto } from "../../common/interface/auth.dto";
import ButtonForm from "../../components/common/buttonForm";
import { store } from "../../store";
import authThunk from "../../store/auth/userthunk";
import authApi from "../../api/authApi";
import useFormError from "../../common/hooks/useFormError";

interface LoginProps {}

const defaultValues: UserLoginDto = {
        username: "",
        password: "",
};

const Login: React.FunctionComponent<LoginProps> = () => {
        const { register, handleSubmit } = useForm<UserLoginDto>();
        const error = useFormError<UserLoginDto>(defaultValues);

        React.useEffect(() => {
                console.log(error);
        }, [error]);

        const onSubmit = (data: UserLoginDto) => {
                store.dispatch(authThunk.loginUser(data));
                // authApi.loginUser(data);
        };

        return (
                <div className="flex justify-center sm:items-center flex-1">
                        <div className="w-full sm:w-auto">
                                <Form handleSubmit={handleSubmit(onSubmit)}>
                                        <p className="text-gray-900/80 text-center text-3xl font-semibold mb-2">Login</p>
                                        <p
                                                className="text-gray-700 text-center text-sm font-medium
                                        mb-8"
                                        >
                                                We will let you in!
                                        </p>
                                        <InputField label="Username" type="text" name="username" register={register} error={error.username} />
                                        <InputField label="Password" type="password" name="password" register={register} error={error.password} />
                                        <div className="mt-4">
                                                <ButtonForm type="submit" label="Login" name="login" />
                                        </div>
                                </Form>
                        </div>
                </div>
        );
};

export default Login;
