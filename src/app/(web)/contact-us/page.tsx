"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ContactFormData } from "@/types/contact-form.type";
import UseFormAdminRegister from "@/hooks/UseContact";
import { Textarea } from "@/components/ui/textarea";
import LabelInput from "@/components/ui/labelInput";
import { Alert } from "flowbite-react";
import { useEffect, useState } from "react";
export default function Contact() {
  const [status ,setstatus]=useState(false);
  type AdminLoginFormProps = {
        username?: string;
        email?: string;
        message?: string;
        webname?: string;
      };
  const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
  } = useForm<AdminLoginFormProps>();
      
  let url ='api/contactUs';

  const { isLoading, error, success, submitForm } =
  UseFormAdminRegister<ContactFormData>({
      url: url,
    });

  const onSubmit = ((data: ContactFormData) => {
    const formData = {
      ...data,
      webname: "faceswapmagic",
    };
    submitForm(formData);
  }) as SubmitHandler<FieldValues>;
  useEffect(()=>{
    if (success) {
      setstatus(true)
      reset(); // Reset the form upon successful submission
      setTimeout(()=>{
        setstatus(false);
      },7000)
    }
  },[success])
 const alertDismiss = () =>{
  setstatus(false);
 }
  return (
    <>
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-0 mt-8 max-w-md space-y-4" > 
          {status && (
            <Alert color="success" onDismiss={alertDismiss}>
            <span className="font-medium">Success!</span> Successfully submitted .
          </Alert>
          )}
        <LabelInput
          register={register("username", {
            required: "This Name field is required.",
            pattern: {
              value: /\S/,
              message: "Enter text without empty spaces.",
            },
          })}
          label="Name"
          errorMessage={errors.username?.message as string}
        />
        <LabelInput
          register={register("email", {
            required: "This Email field is required.",
            pattern: {
              value: /\S/,
              message: "Enter text without empty spaces.",
            },
          })}           
          label="Email"
          errorMessage={errors.email?.message as string}
        />
        <div>
          <Textarea
            id={"message"}
            {...register("message",  {
                required: "This Message field is required.",
                pattern: {
                  value: /\S/,
                  message: "Enter text without empty spaces.",
                },                      
            })}
            placeholder="Write here.."
            label="Message"
            errorMessage={errors.message?.message as string}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
    </>
  );
 }
