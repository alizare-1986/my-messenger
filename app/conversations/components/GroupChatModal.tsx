"use client";

import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}
const GroupChatModal: FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  users,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });
  const members = watch("members");
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);
    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("something went wrong!"))
      .finally(() => setLoading(false));
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" space-y-12 ">
          <div className=" border-b border-gray-900 pb-12">
            <h2 className=" text-base font-semibold leading-7 text-gray-900">
              Create a group chat
            </h2>
            <p className=" mt-1 text-sm leading-6 text-gray-600">Create chat with more than 2 friends</p>
            <div className=" mt-10 flex flex-col gap-y-8">
              <Input regis={register} label="Name" required id="name" disabled={loading} errors={errors}  />
              <Select disabled={loading} label='Members' options={users.map((user)=>({
                value:user.id,
                label:user.name
              }))} 
              onChange={(value)=>setValue('members',value,{
                shouldValidate:true
              })}
              value={members}
              />
            </div>
          </div>
        </div>
        <div className=" mt-6 flex items-center justify-end gap-x-6">
          <Button disabled={loading} onClick={onClose} type="button" secondary>
            Cancel
          </Button>
          <Button disabled={loading} type="submit">
            Create Group
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
