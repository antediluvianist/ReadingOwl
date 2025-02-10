<?php

namespace App\Controller;

use App\Entity\Book;
use App\Form\BookType;
use App\Repository\BookRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api/books')]
final class BookController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private BookRepository $bookRepository;

    public function __construct(EntityManagerInterface $entityManager, BookRepository $bookRepository)
    {
        $this->entityManager = $entityManager;
        $this->bookRepository = $bookRepository;
    }

    // Récupérer les livres de l'utilisateur connecté
    #[Route('', name: 'get_user_books', methods: ['GET'])]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function getUserBooks(): JsonResponse
    {
        $user = $this->getUser(); // Récupère l'utilisateur connecté

        if (!$user) {
            return new JsonResponse(['error' => 'Unauthorized'], 401);
        }

        // Récupérer uniquement les livres appartenant à l'utilisateur
        $books = $this->bookRepository->findBy(['user' => $user]);

        return $this->json($books, 200, [], ['groups' => 'book:read']);
    }

    // Ajouter un livre en l'associant à l'utilisateur connecté
    #[Route('/new', name: 'app_book_new', methods: ['POST'])]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function new(Request $request): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return new JsonResponse(['error' => 'Unauthorized'], 401);
        }

        $data = json_decode($request->getContent(), true);
        if (!isset($data['title']) || !isset($data['author'])) {
            return new JsonResponse(['error' => 'Title and Author are required'], 400);
        }

        $book = new Book();
        $book->setTitle($data['title']);
        $book->setAuthor($data['author']);
        $book->setUser($user); // Associer le livre à l'utilisateur

        $this->entityManager->persist($book);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Book created successfully'], 201);
    }

    //  Supprimer un livre en vérifiant que l'utilisateur en est bien le propriétaire
    #[Route('/{id}', name: 'app_book_delete', methods: ['DELETE'])]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function delete(Book $book): JsonResponse
    {
        $user = $this->getUser();

        if ($book->getUser() !== $user) {
            return new JsonResponse(['error' => 'You do not have permission to delete this book'], 403);
        }

        $this->entityManager->remove($book);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Book deleted successfully'], 200);
    }
}
