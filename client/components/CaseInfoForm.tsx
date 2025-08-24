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
import { useEffect, useState } from "react";
import { User, Mail, Phone, Check } from "lucide-react";

const caseInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z.string().optional(),
  // Keep these for compatibility but make them optional with defaults
  caseType: z.string().default("general"),
  priority: z.string().default("medium"),
  description: z.string().optional(),
});

export type CaseInfoFormData = z.infer<typeof caseInfoSchema>;

interface CaseInfoFormProps {
  initialData?: Partial<CaseInfoFormData>;
  onSubmit: (data: CaseInfoFormData) => void;
  isSubmitting?: boolean;
}

export default function CaseInfoForm({
  initialData,
  onSubmit,
  isSubmitting = false,
}: CaseInfoFormProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [completedFields, setCompletedFields] = useState<Set<string>>(new Set());

  const form = useForm<CaseInfoFormData>({
    resolver: zodResolver(caseInfoSchema),
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      caseType: "general", // Default value for compatibility
      priority: "medium", // Default value for compatibility
      description: "", // Default value for compatibility
    },
  });

  // Watch specific fields instead of all values
  const firstName = form.watch("firstName");
  const lastName = form.watch("lastName");
  const email = form.watch("email");
  const phone = form.watch("phone");
  const emailError = form.formState.errors.email;

  // Track completed fields
  useEffect(() => {
    const newCompleted = new Set<string>();
    if (firstName?.trim()) newCompleted.add("firstName");
    if (lastName?.trim()) newCompleted.add("lastName");
    if (email?.trim() && !emailError) newCompleted.add("email");
    if (phone?.trim()) newCompleted.add("phone");

    // Only update if the set actually changed
    setCompletedFields(prev => {
      const prevArray = Array.from(prev).sort();
      const newArray = Array.from(newCompleted).sort();
      const hasChanged = prevArray.length !== newArray.length ||
                        prevArray.some((item, index) => item !== newArray[index]);
      return hasChanged ? newCompleted : prev;
    });
  }, [firstName, lastName, email, phone, emailError]);

  // Auto-focus the first input when component mounts
  useEffect(() => {
    const firstInput = document.querySelector('input[name="firstName"]') as HTMLInputElement;
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }, []);

  const handleFormSubmit = (data: CaseInfoFormData) => {
    // Add default values for compatibility
    const submitData = {
      ...data,
      caseType: "general",
      priority: "medium",
      description: "",
    };
    onSubmit(submitData);
  };

  const getFieldIcon = (fieldName: string) => {
    switch (fieldName) {
      case "firstName":
      case "lastName":
        return <User className="w-5 h-5" />;
      case "email":
        return <Mail className="w-5 h-5" />;
      case "phone":
        return <Phone className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const isFormValid = firstName?.trim() &&
                     lastName?.trim() &&
                     email?.trim() &&
                     !emailError;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="w-full bg-[#C1D9F6]/30 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min((completedFields.size / 3) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    First Name *
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <div className={`transition-colors duration-200 ${
                          focusedField === "firstName"
                            ? "text-[#99C0F0]"
                            : completedFields.has("firstName")
                              ? "text-[#C5BFEE]"
                              : "text-gray-400"
                        }`}>
                          {completedFields.has("firstName") ? <Check className="w-5 h-5" /> : getFieldIcon("firstName")}
                        </div>
                      </div>
                      <Input
                        {...field}
                        placeholder="Enter first name"
                        onFocus={() => setFocusedField("firstName")}
                        onBlur={() => setFocusedField(null)}
                        className={`pl-10 h-12 border-2 transition-all duration-300 ${
                          focusedField === "firstName"
                            ? "border-[#99C0F0] ring-4 ring-[#99C0F0]/20 shadow-lg scale-[1.02] bg-[#99C0F0]/5"
                            : completedFields.has("firstName")
                              ? "border-[#C5BFEE] bg-[#C5BFEE]/10 shadow-md"
                              : "border-gray-300 hover:border-[#C1D9F6] hover:shadow-sm"
                        }`}
                      />
                    </div>
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
                  <FormLabel className="text-gray-700 font-medium">
                    Last Name *
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <div className={`transition-colors duration-200 ${
                          focusedField === "lastName" 
                            ? "text-blue-500" 
                            : completedFields.has("lastName")
                              ? "text-emerald-500"
                              : "text-gray-400"
                        }`}>
                          {completedFields.has("lastName") ? <Check className="w-5 h-5" /> : getFieldIcon("lastName")}
                        </div>
                      </div>
                      <Input
                        {...field}
                        placeholder="Enter last name"
                        onFocus={() => setFocusedField("lastName")}
                        onBlur={() => setFocusedField(null)}
                        className={`pl-10 h-12 border-2 transition-all duration-200 ${
                          focusedField === "lastName"
                            ? "border-blue-500 ring-4 ring-blue-100 shadow-lg"
                            : completedFields.has("lastName")
                              ? "border-emerald-500 bg-emerald-50"
                              : "border-gray-300 hover:border-gray-400"
                        }`}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Email Address *
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <div className={`transition-colors duration-200 ${
                        focusedField === "email" 
                          ? "text-blue-500" 
                          : completedFields.has("email")
                            ? "text-emerald-500"
                            : "text-gray-400"
                      }`}>
                        {completedFields.has("email") ? <Check className="w-5 h-5" /> : getFieldIcon("email")}
                      </div>
                    </div>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter email address"
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={`pl-10 h-12 border-2 transition-all duration-200 ${
                        focusedField === "email"
                          ? "border-blue-500 ring-4 ring-blue-100 shadow-lg"
                          : completedFields.has("email")
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-300 hover:border-gray-400"
                      }`}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Phone Number 
                  <span className="text-gray-400 font-normal ml-1">(optional)</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <div className={`transition-colors duration-200 ${
                        focusedField === "phone" 
                          ? "text-blue-500" 
                          : completedFields.has("phone")
                            ? "text-emerald-500"
                            : "text-gray-400"
                      }`}>
                        {completedFields.has("phone") ? <Check className="w-5 h-5" /> : getFieldIcon("phone")}
                      </div>
                    </div>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="Enter phone number"
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      className={`pl-10 h-12 border-2 transition-all duration-200 ${
                        focusedField === "phone"
                          ? "border-blue-500 ring-4 ring-blue-100 shadow-lg"
                          : completedFields.has("phone")
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-300 hover:border-gray-400"
                      }`}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          {/* Hidden submit button - form will be submitted via external button */}
          <button type="submit" className="hidden" />
        </form>
      </Form>
    </div>
  );
}
