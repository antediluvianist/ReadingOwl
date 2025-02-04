<?php

namespace App\Service;

use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

class ImageUploader
{
    private $uploadDir;

    public function __construct(string $uploadDir)
    {
        $this->uploadDir = $uploadDir;
    }

    public function downloadAndSaveImage(string $imageUrl, string $fileName): ?string
{
    $client = HttpClient::create();

    try {
        $response = $client->request('GET', $imageUrl, [
            'timeout' => 10, // Timeout de 10 secondes pour éviter des blocages longs
        ]);

        if ($response->getStatusCode() === 200) {
            $imageData = $response->getContent();
            $filePath = $this->uploadDir . '/' . $fileName;

            if (file_put_contents($filePath, $imageData) !== false) {
                return '/uploads/covers/' . $fileName;
            } else {
                error_log("Erreur : Impossible d'enregistrer l'image à $filePath");
            }
        } else {
            error_log("Erreur HTTP : " . $response->getStatusCode());
        }
    } catch (\Exception $e) {
        error_log("Exception capturée : " . $e->getMessage());
    }

    return null;
}

}