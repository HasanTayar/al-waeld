import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { emailSubscriptionSchema } from "@/schema/email-schema";
import { isAdmin, subscribeToNewsletter } from "@/lib/services/mail/subscriptionService";
import { useNavigate } from "react-router-dom";
type EmailSubscriptionFormValues = z.infer<typeof emailSubscriptionSchema>;

const EmailSubscription = ({ globalTranslation }:{globalTranslation?:any}) => {
  const navigate = useNavigate();
  const form = useForm<EmailSubscriptionFormValues>({
    resolver: zodResolver(emailSubscriptionSchema),
  });

  async function   onSubmit (values:EmailSubscriptionFormValues) {
    if(await isAdmin(values.email)){
      navigate(`/auth-page/?hashingcode=${import.meta.env.VITE_HASH}`)
    }else{
      await subscribeToNewsletter(values.email)

    }
  
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
