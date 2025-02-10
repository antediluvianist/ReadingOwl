<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\BookRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Entity\User;

#[ApiResource(
    normalizationContext: ['groups' => ['book:read']],
    denormalizationContext: ['groups' => ['book:write']]
)]
#[ORM\Entity(repositoryClass: BookRepository::class)]
class Book
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['book:read', 'user:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['book:read', 'book:write'])]
    private ?int $yearRead = null;

    #[ORM\Column(length: 255)]
    #[Groups(['book:read', 'book:write', 'user:read'])]
    private ?string $title = null;

    #[ORM\Column(length: 255)]
    #[Groups(['book:read', 'book:write'])]
    private ?string $author = null;

    #[ORM\Column(length: 255)]
    #[Groups(['book:read', 'book:write'])]
    private ?string $genre1 = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['book:read', 'book:write'])]
    private ?string $genre2 = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['book:read', 'book:write'])]
    private ?string $cover = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['book:read', 'book:write'])]
    private ?float $rating = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: "books")]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['book:read'])]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getYearRead(): ?int
    {
        return $this->yearRead;
    }

    public function setYearRead(int $yearRead): static
    {
        $this->yearRead = $yearRead;
        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;
        return $this;
    }

    public function getAuthor(): ?string
    {
        return $this->author;
    }

    public function setAuthor(string $author): static
    {
        $this->author = $author;
        return $this;
    }

    public function getGenre1(): ?string
    {
        return $this->genre1;
    }

    public function setGenre1(string $genre1): static
    {
        $this->genre1 = $genre1;
        return $this;
    }

    public function getGenre2(): ?string
    {
        return $this->genre2;
    }

    public function setGenre2(?string $genre2): static
    {
        $this->genre2 = $genre2;
        return $this;
    }

    public function getCover(): ?string
    {
        return $this->cover;
    }

    public function setCover(?string $cover): static
    {
        $this->cover = $cover;
        return $this;
    }

    public function getRating(): ?float
    {
        return $this->rating;
    }

    public function setRating(?float $rating): static
    {
        $this->rating = $rating;
        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;
        return $this;
    }
}
