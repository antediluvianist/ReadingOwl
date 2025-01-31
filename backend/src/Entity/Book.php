<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource; // <--

use App\Repository\BookRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource] // <--

#[ORM\Entity(repositoryClass: BookRepository::class)]
class Book
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $yearRead = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $series = null;

    #[ORM\Column(length: 255)]
    private ?string $genre1 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $genre2 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $subGenre = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $tag1 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $tag2 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $tag3 = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $comment1 = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $comment2 = null;

    #[ORM\Column(length: 255)]
    private ?string $author = null;

    #[ORM\Column(nullable: true)]
    private ?float $rating = null;

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

    public function getSeries(): ?string
    {
        return $this->series;
    }

    public function setSeries(?string $series): static
    {
        $this->series = $series;

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

    public function getSubGenre(): ?string
    {
        return $this->subGenre;
    }

    public function setSubGenre(?string $subGenre): static
    {
        $this->subGenre = $subGenre;

        return $this;
    }

    public function getTag1(): ?string
    {
        return $this->tag1;
    }

    public function setTag1(?string $tag1): static
    {
        $this->tag1 = $tag1;

        return $this;
    }

    public function getTag2(): ?string
    {
        return $this->tag2;
    }

    public function setTag2(?string $tag2): static
    {
        $this->tag2 = $tag2;

        return $this;
    }

    public function getTag3(): ?string
    {
        return $this->tag3;
    }

    public function setTag3(?string $tag3): static
    {
        $this->tag3 = $tag3;

        return $this;
    }

    public function getComment1(): ?string
    {
        return $this->comment1;
    }

    public function setComment1(?string $comment1): static
    {
        $this->comment1 = $comment1;

        return $this;
    }

    public function getComment2(): ?string
    {
        return $this->comment2;
    }

    public function setComment2(?string $comment2): static
    {
        $this->comment2 = $comment2;

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

    public function getRating(): ?float
    {
        return $this->rating;
    }

    public function setRating(?float $rating): static
    {
        $this->rating = $rating;

        return $this;
    }
}
