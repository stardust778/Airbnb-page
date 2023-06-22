'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import { 
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";

const RegisterModal = () => {
  const { onClose, onOpen, isOpen } = useRegisterModal();
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
        onClose();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <Modal 
      disabled={isLoading}
      isOpen={isOpen}
      title="Register"
      onClose={onClose}
      
    />
  );
}

export default RegisterModal;