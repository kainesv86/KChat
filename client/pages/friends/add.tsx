import * as React from "react";
import { useForm } from "react-hook-form";
import { AddFriendsDto } from "../../common/model/user";
import InputField from "../../components/common/inputField";
import ButtonForm from "../../components/common/buttonForm";
import userApi from "../../api/userApi";

interface AddFriendsProps {}

const defaultValues: AddFriendsDto = { friendUsername: "" };

const AddFriends: React.FunctionComponent<AddFriendsProps> = () => {
        const { register, handleSubmit } = useForm<AddFriendsDto>({ defaultValues });
        const handleOnSubmit = async (data: AddFriendsDto) => {
                const message = await userApi.handleAddFriend(data);
        };

        return (
                <div className="flex flex-col px-2 sm:px-10 pt-10 space-y-1">
                        <h2 className="text-lg font-semibold text-gray-900">Add Friend</h2>
                        <p className="text-base font-semibold text-gray-600">You can add a friend in here by their username</p>
                        <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col">
                                <InputField register={register} name={"friendUsername"} className="w-full sm:max-w-3xl" />
                                <ButtonForm type="submit" label="Add" name="add" className="w-full sm:max-w-xs" />
                        </form>
                </div>
        );
};

export default AddFriends;
