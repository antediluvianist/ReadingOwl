<?php

namespace App\Controller;

use App\Service\ImageUploader;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ImageController extends AbstractController
{
    #[Route('/api/upload-cover', name: 'upload_cover', methods: ['POST'])]
public function uploadCover(Request $request, ImageUploader $imageUploader): JsonResponse
{
    $data = json_decode($request->getContent(), true);
    $imageUrl = $data['coverUrl'] ?? null;

    if ($imageUrl) {
        $fileName = uniqid() . '.jpg';
        $localPath = $imageUploader->downloadAndSaveImage($imageUrl, $fileName);

        if ($localPath) {
            return new JsonResponse(['coverPath' => $localPath], 200);
        } else {
            return new JsonResponse(['error' => 'Failed to save image locally'], 500);
        }
    }

    return new JsonResponse(['error' => 'Invalid cover URL'], 400);
}

}
