<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'instansi' => 'required|string|max:255',
            'no_hp' => 'required|string|max:15|unique:users',
            'role' => 'in:admin,staf,peminjam,pengunjung', // validasi role
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ], [
            'nama_lengkap.required' => 'Nama lengkap harus diisi.',
            'instansi.required' => 'Instansi harus diisi.',
            'no_hp.required' => 'Nomor HP harus diisi.',
            'no_hp.max' => 'Nomor HP tidak boleh lebih dari 15 karakter.',
            'no_hp.unique' => 'Nomor HP sudah digunakan.',
            'email.required' => 'Email harus diisi.',
            'email.lowercase' => 'Email harus ditulis dalam huruf kecil.',
            'email.email' => 'Email harus valid.',
            'email.unique' => 'Email sudah digunakan.',
            'password.required' => 'Password harus diisi.',
            'password.confirmed' => 'Konfirmasi password tidak cocok.',
            'password' => 'Password harus memenuhi aturan keamanan minimum.',
        ]);

        $user = User::create([
            'nama_lengkap' => $request->nama_lengkap,
            'instansi' => $request->instansi,
            'no_hp' => $request->no_hp,
            'role' => $request->role ?? 'pengunjung', // Set default role if not provided
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
