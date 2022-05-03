import * as React from "react";

import InputField from "../../components/common/inputField";
import Form from "../../components/form";

import { useForm } from "react-hook-form";
import { UserLoginDto } from "../../common/interface/auth.dto";
import ButtonForm from "../../components/common/buttonForm";

import authApi from "../../api/authApi";
import useFormError from "../../common/hooks/useFormError";
import RouteProtected from "../../common/HOC/routerProtedtedWrapper";
import { store } from "../../store";
import { authActions } from "../../store/auth";
import { useRouter } from "next/router";
import routers from "../../common/constants/routers";

interface LoginProps {}

const defaultValues: UserLoginDto = {
        username: "",
        password: "",
};

const Login: React.FunctionComponent<LoginProps> = () => {
        const { register, handleSubmit } = useForm<UserLoginDto>();
        const errors = useFormError<UserLoginDto>(defaultValues);
        const router = useRouter();

        const onSubmit = async (data: UserLoginDto) => {
                const res = await authApi.loginUser(data);
                if (res.status == 201) {
                        store.dispatch(authActions.updateLogin());
                        router.push(routers.home.link);
                }
        };

        return (
                <RouteProtected>
                        <div className="flex justify-center flex-1 sm:items-center">
                                <div className="w-full sm:w-auto">
                                        <Form handleSubmit={handleSubmit(onSubmit)}>
                                                <p className="mb-2 text-3xl font-semibold text-center text-gray-900/80">Login</p>
                                                <p className="mb-8 text-sm font-medium text-center text-gray-700">We will let you in!</p>
                                                <InputField
                                                        label="Username"
                                                        type="text"
                                                        name="username"
                                                        register={register}
                                                        error={errors.username}
                                                />
                                                <InputField
                                                        label="Password"
                                                        type="password"
                                                        name="password"
                                                        register={register}
                                                        error={errors.password}
                                                />
                                                <div className="mt-4">
                                                        <ButtonForm type="submit" label="Login" name="login" />
                                                </div>
                                        </Form>
                                </div>
                        </div>
                </RouteProtected>
        );
};

export default Login;
