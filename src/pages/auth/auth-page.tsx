import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/lib/services/supbase/auth/authServices"; // Adjust the import path as needed
import { adminLoginSchema } from "@/schema/admin-login-schema";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const AuthPage = () => {
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState('');
  const form = useForm<z.infer<typeof adminLoginSchema>>({
    resolver: zodResolver(adminLoginSchema),
  });

  const onSubmit = async (values: z.infer<typeof adminLoginSchema>) => {
    const { data, error } = await loginUser(values.email, values.password);

    if (error) {
      setLoginError(error.message);
      console.error('Login failed:', error.message);
      return;
    }

    if (data?.user) {
      console.log('Login successful:', data.user);
      navigate(`/admin-dashboard/?hashingcode=${import.meta.env.VITE_HASH}`)
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center" dir="rtl">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>כניסת מנהל</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>דואר אלקטרוני</FormLabel>
                  <FormControl>
                    <Input placeholder="example@example.com" type="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
              />
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel>סיסמה</FormLabel>
                  <FormControl>
                    <Input placeholder="******" type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
              />
              {loginError && <div className="text-red-500">{loginError}</div>}
              <div className="flex justify-between">
                <Button type="submit" className="mt-4">כניסה</Button>
                <Button type="button" variant='link' className="mt-4">שכחתי סיסמה ?</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
