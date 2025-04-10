"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type ControllerRenderProps } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/molecules/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { type RouterOutputs, api } from "@/trpc/react"
import { Typography } from "@/components/atoms/typography/Typography"
import { Link } from "@/components/atoms/links/Link"
import { Select } from "@/components/ui/select"

interface FieldProps {
  field: {
    value: string
    onChange: (...event: any[]) => void
    onBlur: () => void
    name: string
    ref: React.Ref<any>
  }
}

type CheckoutResponse = RouterOutputs["stripe"]["createCheckoutSession"]

interface CheckboxFieldProps {
  field: {
    value: boolean
    onChange: (...event: any[]) => void
    onBlur: () => void
    name: string
    ref: React.Ref<any>
  }
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  surname: z.string().min(2, "Surname must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  nationality: z.string().min(2, "Nationality is required"),
  codiceFiscale: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "This is required",
  }),
}).refine(
  (data) => {
    const isItalian = data.nationality.toLowerCase() === "it"
    if (isItalian) {
      if (!data.codiceFiscale) {
        return false
      }
      if (data.codiceFiscale.length !== 16) {
        return false
      }
      if (!/^[A-Z0-9]+$/.test(data.codiceFiscale)) {
        return false
      }
    }
    return true
  },
  {
    message: "Codice Fiscale is required for Italian citizens and must be 16 uppercase letters and numbers",
    path: ["codiceFiscale"],
  }
)

type FormValues = z.infer<typeof formSchema>

export function MembershipFormModal() {
  const [open, setOpen] = useState(false)
  const { mutate: createCheckout, isPending } = api.stripe.createCheckoutSession.useMutation({
    onSuccess: (data: CheckoutResponse) => {
      if (data.status === "success") {
        window.location.href = data.url
      }
    },
    onError: (error) => {
      console.error("Failed to create checkout session:", error)
    },
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      codiceFiscale: "",
      nationality: "",
      acceptTerms: false,
    },
  })

  function onSubmit(data: FormValues) {
    createCheckout({
      name: data.name,
      surname: data.surname,
      email: data.email,
      codiceFiscale: data.codiceFiscale,
      nationality: data.nationality,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg">
          Become a member
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4 sm:max-w-[425px] md:p-8">
        <DialogHeader>
          <DialogTitle>Membership Application</DialogTitle>
          <DialogDescription>
            Please fill in your details to proceed with the membership application.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }: { field: FieldProps["field"] }) => (
                  <FormItem>
                    <FormLabel>
                      <Typography variant="medium">Name</Typography>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surname"
                render={({ field }: { field: FieldProps["field"] }) => (
                  <FormItem>
                    <FormLabel>
                      <Typography variant="medium">Surname</Typography>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Doe" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }: { field: FieldProps["field"] }) => (
                <FormItem>
                  <FormLabel>
                    <Typography variant="medium">Email</Typography>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="john.doe@example.com" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nationality"
              render={({ field }: { field: FieldProps["field"] }) => (
                <FormItem>
                  <FormLabel>
                    <Typography variant="medium">Nationality</Typography>
                  </FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <option value="">Select your nationality</option>
                      <option value="IT">Italian</option>
                      <option value="Other">Other</option>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            {form.watch("nationality") === "IT" && (
              <FormField
                control={form.control}
                name="codiceFiscale"
                render={({ field }: { field: ControllerRenderProps<FormValues, "codiceFiscale"> }) => (
                  <FormItem>
                    <FormLabel>
                      <Typography variant="medium">Codice Fiscale</Typography>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="ABCDEF12G34H567I"
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }: { field: CheckboxFieldProps["field"] }) => (
                <>
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>I have read and accept <Link href="/page/statute">the Statute</Link></FormLabel>
                    </div>
                  </FormItem>
                  <FormMessage className="text-xs" />
                </>
              )}
            />
            <br />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Processing..." : "Continue to payment"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
