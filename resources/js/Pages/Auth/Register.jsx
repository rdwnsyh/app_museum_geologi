import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
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
        <div className="full-background">
            <div className="auth-page-signup">
                <form onSubmit={handleSignUp} className="auth-form">
                    <input
                        type="text"
                        placeholder="Nama"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Asal Perguruan Tinggi"
                        value={asal}
                        onChange={(e) => setAsal(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Nomor Handphone"
                        value={no_hp}
                        onChange={(e) => setNo_hp(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="auth-button">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
