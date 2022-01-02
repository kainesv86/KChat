import * as React from "react";

import InputField from "../../components/common/inputField";
import Form from "../../components/form";

import { useForm } from "react-hook-form";
import { UserLoginDto } from "../../common/interface/auth.dto";

interface LoginProps {}

const Login: React.FunctionComponent<LoginProps> = () => {
        const { register, handleSubmit } = useForm<UserLoginDto>();

        const onSubmit = (data: UserLoginDto) => {
                console.log(data);
        };

        return (
                <div className="flex justify-center sm:items-center flex-1">
                        <div className="-translate-y-1/4">
                                <Form handleSubmit={handleSubmit(onSubmit)}>
                                        <p className="text-gray-900 text-center text-3xl font-semibold mb-2">Login</p>
                                        <p
                                                className="text-gray-700 text-center text-sm font-medium
                                        mb-8"
                                        >
                                                We will let you in!
                                        </p>
                                        <InputField label="Username" type="text" name="username" register={register} />
                                        <InputField label="Password" type="password" name="password" register={register} />
                                        <input type="submit" value="send" />
                                </Form>
                        </div>
                </div>
        );
};

export default Login;
