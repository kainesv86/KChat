import * as React from "react";

import InputField from "../../components/common/inputField";
import Form from "../../components/form";

import { useForm } from "react-hook-form";
import { UserRegisterDto } from "../../common/interface/auth.dto";
import ButtonForm from "../../components/common/buttonForm";
import authApi from "../../api/authApi";
import useFormError from "../../common/hooks/useFormError";
import { authActions } from "../../store/auth";
import { store } from "../../store";
import routers from "../../common/constants/routers";
import { useRouter } from "next/router";

interface RegisterProps {}

const defaultValues: UserRegisterDto = {
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
};

const Register: React.FunctionComponent<RegisterProps> = () => {
        const { register, handleSubmit } = useForm<UserRegisterDto>();
        const errors = useFormError<UserRegisterDto>(defaultValues);
        const router = useRouter();

        const onSubmit = async (data: UserRegisterDto) => {
                const res = await authApi.registerUser(data);
                if (res.status == 201) {
                        store.dispatch(authActions.updateLogin());
                        router.push(routers.home.link);
                }
        };

        return (
                <div className="flex justify-center flex-1 sm:items-center">
                        <div className="w-full sm:w-auto">
                                <Form handleSubmit={handleSubmit(onSubmit)}>
                                        <p className="mb-2 text-3xl font-semibold text-center text-gray-900/80">Register</p>
                                        <p className="mb-8 text-sm font-medium text-center text-gray-700">Join us my friend</p>
                                        <InputField label="Username" type="text" name="username" register={register} error={errors.username} />
                                        <InputField label="Password" type="password" name="password" register={register} error={errors.password} />
                                        <InputField
                                                label="Confirm Password"
                                                type="password"
                                                name="confirmPassword"
                                                register={register}
                                                error={errors.confirmPassword}
                                        />
                                        <InputField label="Email" type="text" name="email" register={register} error={errors.email} />
                                        <div className="mt-4">
                                                <ButtonForm type="submit" label="Register" name="Register" />
                                        </div>
                                </Form>
                        </div>
                </div>
        );
};

export default Register;
