<?php

namespace App\Observers;

use App\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Image;

class PhotoUserObserver
{
    public function creating(User $user)
    {
        if (is_a($user->photo, UploadedFile::class) and $user->photo->isValid()) {
            $this->upload($user);
        }
    }

    public function deleting(User $user)
    {
        Storage::delete($user->photo);
    }

    public function updating(User $user)
    {
        if (is_a($user->photo, UploadedFile::class) and $user->photo->isValid()) {
            $previous_image = $user->getOriginal('photo');
            $this->upload($user);

            Storage::delete($previous_image);
        }
    }

    protected function upload(User $user)
    {
        $allowed_extensions = [
            'png',
            'gif',
            'jpeg',
            'jpg'
        ];

        $extension = $user->photo->extension();

        if (!in_array($extension, $allowed_extensions)) {
            throw new Exception('Extension not allowed');
        }

        $name = bin2hex(openssl_random_pseudo_bytes(8));
        $name = $name . '.' . $extension;
        $name = 'avatars/' . $name;

        // salva imagem com tamanho real
        $user->photo->storeAs('', $name);

        // redimensiona a imagem
        $img = Image::make($user->photo->getRealPath());
        $img->fit(250, 250)->save(public_path('/thumb/' . $name));

        $user->photo = $name;
    }
}
