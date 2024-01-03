import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { emailSubscriptionSchema } from "@/schema/email-schema";
type EmailSubscriptionFormValues = z.infer<typeof emailSubscriptionSchema>;

const EmailSubscription = ({ globalTranslation }:{globalTranslation?:any}) => {
  const form = useForm<EmailSubscriptionFormValues>({
    resolver: zodResolver(emailSubscriptionSchema),
  });

  function onSubmit(values:EmailSubscriptionFormValues) {
    console.log(values);
  }

  return (
    <div className="w-full text-sm lg:text-base text-center mt-8 lg:mt-0 lg:order-4">
      <p>{globalTranslation?.mail_acceptance}</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 flex flex-wrap justify-center gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem >
                <FormControl>
                  <Input placeholder="example@example.com" {...field} className="rounded-lg border-2 border-blue-300 p-2 text-blue-900" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition-colors">
            {globalTranslation?.send}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EmailSubscription;
