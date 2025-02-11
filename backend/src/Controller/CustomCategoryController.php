<?php

namespace App\Controller;

use App\Entity\CustomCategory;
use App\Repository\CustomCategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/custom-categories')]
class CustomCategoryController extends AbstractController
{
    // Récupérer toutes les catégories personnalisées
    #[Route('', name: 'get_custom_categories', methods: ['GET'])]
public function index(CustomCategoryRepository $repository): JsonResponse
{
    $user = $this->getUser();
    if (!$user) {
        return new JsonResponse(['error' => 'Utilisateur non authentifié.'], 401);
    }

    $categories = $repository->findBy(['user' => $user]); // Récupération des catégories de l'utilisateur
    $data = array_map(fn($category) => [
        'id' => $category->getId(),
        'name' => $category->getName(),
    ], $categories);

    return $this->json($data);
}


    // Ajouter une nouvelle catégorie personnalisée
    #[Route('', name: 'add_custom_category', methods: ['POST'])]
public function add(Request $request, EntityManagerInterface $entityManager): JsonResponse
{
    $user = $this->getUser(); // Récupération de l'utilisateur connecté
    if (!$user) {
        return new JsonResponse(['error' => 'Utilisateur non authentifié.'], 401);
    }

    $data = json_decode($request->getContent(), true);
    $name = $data['name'] ?? null;

    if (!$name) {
        return new JsonResponse(['error' => 'Le nom de la catégorie est requis.'], 400);
    }

    $category = new CustomCategory();
    $category->setName($name);
    $category->setUser($user); // Association de la catégorie à l'utilisateur

    $entityManager->persist($category);
    $entityManager->flush();

    return new JsonResponse(['message' => 'Catégorie ajoutée avec succès.', 'id' => $category->getId()], 201);
}


    // Supprimer une catégorie personnalisée
    #[Route('/{id}', name: 'delete_custom_category', methods: ['DELETE'])]
    public function delete(CustomCategory $category, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($category);
        $em->flush();

        return $this->json(['message' => 'Catégorie supprimée avec succès.']);
    }
}
