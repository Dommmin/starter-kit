<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\PasswordUpdateRequest;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class PasswordController extends Controller
{
    public function update(PasswordUpdateRequest $request): Response
    {
        $validatedData = $request->validated();

        $request->user()->update([
            'password' => Hash::make($validatedData['password']),
        ]);

        return response()->noContent();
    }
}
