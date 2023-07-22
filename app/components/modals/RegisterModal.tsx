'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { 
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../input/Input";
import Button from '../button/Button';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { 
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
      .then(() => {
        registerModal.onClose();
        loginModal.onOpen();
        toast.success('Success !')
      })
      .catch(error => {
        toast.error("Register error!");
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading 
        title="Welcome to Airbnb"
        subtitle="Create an account!"
        center
      />
      <Input 
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        required
        errors={errors}
      />
       <Input 
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        required
        errors={errors}
      />
       <Input 
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        required
        errors={errors}
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button 
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div
        className="flex flex-row items-center justify-center gap-2"
      >
        <div>Aready hava an account ?</div>
        <div
          className="text-neutral-800 cursor-pointer hover:underline"
          onClick={toggle}
        >
          Login in
        </div>
      </div>
    </div>
  )

  return (
    <Modal 
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;