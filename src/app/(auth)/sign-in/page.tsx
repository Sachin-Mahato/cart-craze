"use client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";

export default function Page() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    });

    // const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    //     setIsSubmitting(true);
    //     try {
    //         const result = await signIn("credentials", {
    //             redirect: false,
    //             identifier: data.identifier,
    //             password: data.password,
    //         });

    //         console.log("res", result);
    //         if (result?.error) {
    //             //TODO:  double check
    //             // toast({
    //             //     title: "Login failed",
    //             //     description: "Incorrect username or password",
    //             //     variant: "destructive",
    //             // });

    //             if (result.error === "CredentialsSignin") {
    //                 toast({
    //                     title: "Login failed",
    //                     description: "Incorrect username or password",
    //                     variant: "destructive",
    //                 });
    //                 return;
    //             } else {
    //                 toast({
    //                     title: "Error",
    //                     description: result.error,
    //                     variant: "destructive",
    //                 });
    //                 return;
    //             }
    //         }

    //         // if (result?.url) {
    //         //     setIsSubmitting(true);
    //         //     router.replace("/");
    //         // }
    //         if (result) {
    //             router.push("/");
    //         }
    //     } catch (err) {
    //         toast({
    //             title: "Unexpected error",
    //             description:
    //                 "An unexpected error occurred while login. Please try again.",
    //             variant: "destructive",
    //         });

    //         console.error(err);
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        setIsSubmitting(true);

        try {
            const result = await signIn("credentials", {
                redirect: false,
                identifier: data.identifier,
                password: data.password,
            });

            if (result?.error) {
                handleSignInError(result.error);
                return;
            }

            if (result?.ok && result.url) {
                // Redirect to the URL provided in the response
                router.push(result.url);
            } else {
                toast({
                    title: "Login failed",
                    description: "An unknown error occurred. Please try again.",
                    variant: "destructive",
                });
            }
        } catch (err) {
            console.error("Sign-in error:", err);
            toast({
                title: "Unexpected error",
                description:
                    "An unexpected error occurred while logging in. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSignInError = (error: string) => {
        if (error === "CredentialsSignin") {
            toast({
                title: "Login failed",
                description: "Incorrect username or password",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Error",
                description: error,
                variant: "destructive",
            });
        }
    };

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="identifier"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Password */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                                    Please Wait...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p>
                        Don&apos;t have an account?{" "}
                        <Link
                            href={"/sign-up"}
                            className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
