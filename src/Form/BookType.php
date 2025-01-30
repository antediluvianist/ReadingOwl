<?php

namespace App\Form;

use App\Entity\Book;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class BookType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('yearRead')
            ->add('title')
            ->add('series')
            ->add('genre2')
            ->add('genre1')
            ->add('subGenre')
            ->add('tag1')
            ->add('tag2')
            ->add('tag3')
            ->add('comment1')
            ->add('comment2')
            ->add('author')
            ->add('rating')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Book::class,
        ]);
    }
}
