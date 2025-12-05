"use client"
import * as z from "zod"
import { formSchema } from '@/lib/form-schema'
import { serverAction } from '@/actions/server-action'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { useAction } from "next-safe-action/hooks"
import { motion } from "motion/react"
import { Check } from "lucide-react"
import Image from "next/image"
import { Field, FieldGroup, FieldContent, FieldLabel, FieldDescription, FieldError, FieldSeparator } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Password } from "@/components/password"
import { Checkbox } from "@/components/ui/checkbox"



type Schema = z.infer<typeof formSchema>;

/**
 * Render a user registration form with client-side validation and submission handling.
 *
 * When the form is successfully submitted it resets and displays a success confirmation UI;
 * while submitting it shows an executing state for the submit control.
 *
 * @returns The JSX element that renders the form or the post-submission success confirmation.
 */
export default function DraftForm() {
  
  const form = useForm<Schema>({
    resolver: zodResolver(formSchema as any),
  })
  // const alldata = form.getValues()
  // console.log(alldata)
  const formAction = useAction(serverAction, {
    onSuccess: () => {
      form.reset();
    },
    onError: () => {
      console.log("error occured");
    },
  });
  const handleSubmit = form.handleSubmit(async (data: Schema) => {
    formAction.execute(data);
  });

  const { isExecuting, hasSucceeded } = formAction;
  if (hasSucceeded) {
    
    return (<div className="p-2 sm:p-5 md:p-8 w-full rounded-md gap-2 border">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, stiffness: 300, damping: 25 }}
        className="h-full py-6 px-3"
      >
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.3,
            type: "spring",
            stiffness: 500,
            damping: 15,
          }}
          className="mb-4 flex justify-center border rounded-full w-fit mx-auto p-2"
        >
          <Check className="size-8" />
        </motion.div>
        <h2 className="text-center text-2xl text-pretty font-bold mb-2">
          Thank you
        </h2>
        <p className="text-center text-lg text-pretty text-muted-foreground">
          Form submitted successfully, we will get back to you soon
        </p>
      </motion.div>
    </div>)
  }
  return (
    <form onSubmit={handleSubmit} className="p-2 sm:p-5 md:p-8 w-full gap-2 max-w-md mx-auto">
      <FieldGroup className="grid md:grid-cols-6 gap-4 mb-6">
        <div className="col-span-full flex justify-center ">
          <Image
            width={150}
            height={150}
            src="/mongola.png"
            alt="logo"
            draggable={false}
          />

        </div>

        <Controller
          name="input-824"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
              <FieldLabel htmlFor="input-824">Username *</FieldLabel>
              <Input
                {...field}
                id="input-824"
                type="text"
                onChange={(e) => {
                  field.onChange(e.target.value)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="eg: john wick"

              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="input-82e"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
              <FieldLabel htmlFor="input-82e">Email </FieldLabel>
              <Input
                {...field}
                id="input-82e"
                type="text"
                onChange={(e) => {
                  field.onChange(e.target.value)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="exe@example.com"

              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password-aae"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
              <FieldContent className="gap-0.5">
                <FieldLabel htmlFor="password-aae">Password *</FieldLabel>
                <FieldDescription>Enter a strong password (security reasons)</FieldDescription>
              </FieldContent>
              <Password
                {...field}
                aria-invalid={fieldState.invalid}
                id="password-aae"
                placeholder="Enter your password"

              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )} />

        <Controller
          name="input-c5a"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
              <FieldLabel htmlFor="input-c5a">Profile Picture *</FieldLabel>
              <Input
                {...field}
                id="input-c5a"
                type="number"
                onChange={(e) => {
                  field.onChange(e.target.valueAsNumber)
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Choose Profile Picture Number"

              />
              <FieldDescription>Choose number from 1 to 15</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="checkbox-0f9"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 col-span-full">
              <div className="flex items-center gap-2 mb-1">
                <Checkbox
                  id="checkbox-0f9"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={fieldState.invalid}

                />
                <FieldLabel htmlFor="checkbox-0f9">i accept ll terms pf service and those things *</FieldLabel>

              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="flex justify-end items-center w-full">
        <Button variant={"default"} className="w-full mt-3.5">
          {isExecuting ? 'Submitting...' : 'Create an Account'}
        </Button>
      </div>
    </form>
  )
}