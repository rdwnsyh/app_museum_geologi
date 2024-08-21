import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        id: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="bg-[url('../../bg_kageo.png')] top-85 p-60 bg-cover bg-left h-screen">
        <div className="flex justify-left items-center h-full">

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            {/* email atau nomor hp */}
            <form onSubmit={submit}>

            <img
                src="/logokageo.png" // Logo harus berada di folder public
                alt="Logo"
                className="lg:w-60 lg:h-45 object-contain" // Mengatur ukuran dan menyesuaikan rasio aspek
            />

                <div className="mt-4">
                    <InputLabel
                        htmlFor="id"
                        
                    />

                    <TextInput
                        id="id"
                        type="text"
                        name="id"
                        value={data.id}
                        className="mt-1 block w-full"
                        placeholder="Email atau Nomor Handphone"
                        autoComplete="id"
                        isFocused={true}
                        onChange={(e) => setData("id", e.target.value)}
                    />

                    <InputError message={errors.id} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password"/>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="Password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-left mt-8">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-blue-900 hover:text-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Lupa password?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4 ms-14" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </div>
        </div>
    );
}
