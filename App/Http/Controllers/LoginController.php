<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
     /**
     * index
     *
     * @return void
     */
    public function index()
    {
        return inertia('LoginPage');
    }
    
    /**
     * store
     *
     * @param  mixed $request
     * @return void
     */
    public function store(Request $request)
    {
        /**
         * validate request
         */
        $this->validate($request, [
            'no_hp'     => 'required|string',
            'password'  => 'required'
        ]);

        //get email and password from request
        $credentials = $request->only('no_hp', 'password');

        //attempt to login
        if (Auth::attempt($credentials)) {

            //regenerate session
            $request->session()->regenerate();

            //redirect route dashboard
            return redirect('/dashboard');
        }

        //if login fails
        return back()->withErrors([
            'email' => 'loginError', 'Login gagal',
        ]);
    }

    /**
     * destroy
     *
     * @return void
     */
    public function destroy()
    {
        auth()->logout();

        return redirect('/login');
    }
}
