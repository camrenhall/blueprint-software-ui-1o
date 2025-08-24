import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

const caseInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z.string().optional(),
  caseType: z.string().min(1, "Case type is required"),
  priority: z.string().min(1, "Priority is required"),
  description: z.string().optional(),
});

export type CaseInfoFormData = z.infer<typeof caseInfoSchema>;

interface CaseInfoFormProps {
  initialData?: Partial<CaseInfoFormData>;
  onSubmit: (data: CaseInfoFormData) => void;
  isSubmitting?: boolean;
}

const caseTypes = [
  { value: "personal_injury", label: "Personal Injury" },
  { value: "family_law", label: "Family Law" },
  { value: "criminal_defense", label: "Criminal Defense" },
  { value: "corporate", label: "Corporate Law" },
  { value: "real_estate", label: "Real Estate" },
  { value: "employment", label: "Employment Law" },
  { value: "immigration", label: "Immigration" },
  { value: "intellectual_property", label: "Intellectual Property" },
  { value: "tax", label: "Tax Law" },
  { value: "bankruptcy", label: "Bankruptcy" },
  { value: "other", label: "Other" },
];

const priorityLevels = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

export default function CaseInfoForm({
  initialData,
  onSubmit,
  isSubmitting = false,
}: Omit<CaseInfoFormProps, 'onBack'>) {
  const form = useForm<CaseInfoFormData>({
    resolver: zodResolver(caseInfoSchema),
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      caseType: initialData?.caseType || "",
      priority: initialData?.priority || "medium",
      description: initialData?.description || "",
    },
  });

  // Auto-focus the first input when component mounts
  useEffect(() => {
    const firstInput = document.querySelector('input[name="firstName"]') as HTMLInputElement;
    if (firstInput) {
      firstInput.focus();
    }
  }, []);

  const handleFormSubmit = (data: CaseInfoFormData) => {
    onSubmit(data);
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-[#C1D9F6]/40 rounded-2xl p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Client Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-[#0E315C]/80 uppercase tracking-wide">
                Client Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter first name"
                          className="bg-white/80 border-[#C1D9F6] focus:ring-[#99C0F0]/50 focus:border-[#99C0F0]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter last name"
                          className="bg-white/80 border-[#C1D9F6] focus:ring-[#99C0F0]/50 focus:border-[#99C0F0]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter email address"
                        className="bg-white/80 border-[#C1D9F6] focus:ring-[#99C0F0]/50 focus:border-[#99C0F0]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="Enter phone number (optional)"
                        className="bg-white/80 border-[#C1D9F6] focus:ring-[#99C0F0]/50 focus:border-[#99C0F0]"
                      />
                    </FormControl>
                    <FormDescription>
                      Optional - We'll use this for urgent communications
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Case Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-[#0E315C]/80 uppercase tracking-wide border-t border-[#C1D9F6]/30 pt-4">
                Case Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="caseType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Case Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/80 border-[#C1D9F6] focus:ring-[#99C0F0]/50 focus:border-[#99C0F0]">
                            <SelectValue placeholder="Select case type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {caseTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority Level *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/80 border-[#C1D9F6] focus:ring-[#99C0F0]/50 focus:border-[#99C0F0]">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {priorityLevels.map((priority) => (
                            <SelectItem key={priority.value} value={priority.value}>
                              {priority.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Case Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Provide a brief description of the case (optional)"
                        className="bg-white/80 border-[#C1D9F6] focus:ring-[#99C0F0]/50 focus:border-[#99C0F0] min-h-[100px] resize-none"
                      />
                    </FormControl>
                    <FormDescription>
                      A brief overview to help organize and identify this case
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Hidden submit button - form will be submitted via external button */}
            <button type="submit" className="hidden" />
          </form>
        </Form>
    </div>
  );
}
