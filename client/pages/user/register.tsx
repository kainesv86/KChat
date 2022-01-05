import * as React from "react";

import InputField from "../../components/common/inputField";
import Form from "../../components/form";

import { useForm } from "react-hook-form";
import { UserRegisterDto } from "../../common/interface/auth.dto";
import ButtonForm from "../../components/common/buttonForm";
import { store } from "../../store";
import authThunk from "../../store/auth/userthunk";
import authApi from "../../api/authApi";

interface RegisterProps {}

const Register: React.FunctionComponent<RegisterProps> = () => {
        const { register, handleSubmit } = useForm<UserRegisterDto>();

        const onSubmit = (data: UserRegisterDto) => {
                // store.dispatch(authThunk.registerUser(data));
                authApi.registerUser(data);
        };

        return (
                <div className="flex justify-center sm:items-center flex-1">
                        <div className="w-full sm:w-auto">
                                <Form handleSubmit={handleSubmit(onSubmit)}>
                                        <p className="text-gray-900/80 text-center text-3xl font-semibold mb-2">Register</p>
                                        <p className="text-gray-700 text-center text-sm font-medium mb-8">Join us my friend</p>
                                        <InputField label="Username" type="text" name="username" register={register} />
                                        <InputField label="Password" type="password" name="password" register={register} />
                                        <InputField label="Confirm Password" type="password" name="confirmPassword" register={register} />
                                        <InputField label="Email" type="text" name="email" register={register} />
                                        <div className="mt-4">
                                                <ButtonForm type="submit" label="Register" name="Register" />
                                        </div>
                                </Form>
                        </div>
                </div>
        );
};

export default Register;
