import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import React, { useState } from 'react';
import './AuthPage.css';
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_lengkap: "",
        instansi: "",
        no_hp: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        
        <div className="bg-[url('../../bg_kageo.png')] top-85 p-60 bg-cover bg-left h-screen">
        <div className="flex justify-left items-center h-full">

            <form onSubmit={submit}>

            <div className="mt-20">
            <img
                src="/logokageo.png" // Logo harus berada di folder public
                alt="Logo"
                className="lg:w-60 lg:h-45 object-contain" // Mengatur ukuran dan menyesuaikan rasio aspek
            />
            </div>

                <div className="mt-4">
                    <InputLabel htmlFor="nama_lengkap"/>

                    <TextInput
                        id="nama_lengkap"
                        name="nama_lengkap"
                        type="text"
                        value={data.nama_lengkap}
                        className="mt-1 block w-full"
                        placeholder="Nama Lengkap"
                        autoComplete="nama_lengkap"
                        isFocused={true}
                        onChange={(e) =>setData("nama_lengkap", e.target.value)}
                        required
                    />
                    <InputError
                        message={errors.nama_lengkap}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="instansi"/>

                    <TextInput
                        id="instansi"
                        name="instansi"
                        type="text"
                        value={data.instansi}
                        className="mt-1 block w-full"
                        placeholder="Instansi"
                        autoComplete="instansi"
                        isFocused={true}
                        onChange={(e) => setData("instansi", e.target.value)}
                        required
                    />

                    <InputError message={errors.instansi} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="no_hp"/>

                    <TextInput
                        id="no_hp"
                        name="no_hp"
                        type="tel"
                        value={data.no_hp}
                        className="mt-1 block w-full"
                        placeholder="Nomor Handphone"
                        autoComplete="no_hp"
                        isFocused={true}
                        onChange={(e) => setData("no_hp", e.target.value)}
                        required
                    />

                    <InputError message={errors.no_hp} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email"/>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        placeholder="Email"
                        autoComplete="email"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password"/>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        placeholder="Password"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        placeholder="Password Confirmation"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                Sudah memiliki akun?
                    <Link
                        href={route("login")}
                        className="underline text-sm text-blue-900 hover:text-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Login,
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
                
            </form>

            </div>

        </div>
        
    );
}
