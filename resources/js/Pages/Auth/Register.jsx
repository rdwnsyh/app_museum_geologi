import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
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
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="nama_lengkap" value="nama_lengkap" />

                    <TextInput
                        id="nama_lengkap"
                        name="nama_lengkap"
                        type="text"
                        value={data.nama_lengkap}
                        className="mt-1 block w-full"
                        autoComplete="nama_lengkap"
                        isFocused={true}
                        onChange={(e) =>
                            setData("nama_lengkap", e.target.value)
                        }
                        required
                    />
                    <InputError
                        message={errors.nama_lengkap}
                        className="mt-2"
                    />
                </div>
                <div>
                    <InputLabel htmlFor="instansi" value="instansi" />

                    <TextInput
                        id="instansi"
                        name="instansi"
                        type="text"
                        value={data.instansi}
                        className="mt-1 block w-full"
                        autoComplete="instansi"
                        isFocused={true}
                        onChange={(e) => setData("instansi", e.target.value)}
                        required
                    />

                    <InputError message={errors.instansi} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="no_hp" value="no_hp" />

                    <TextInput
                        id="no_hp"
                        name="no_hp"
                        type="tel"
                        value={data.no_hp}
                        className="mt-1 block w-full"
                        autoComplete="no_hp"
                        isFocused={true}
                        onChange={(e) => setData("no_hp", e.target.value)}
                        required
                    />

                    <InputError message={errors.no_hp} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
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
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
