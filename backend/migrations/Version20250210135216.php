<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250210135216 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE book ADD user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE book DROP series');
        $this->addSql('ALTER TABLE book DROP sub_genre');
        $this->addSql('ALTER TABLE book DROP tag1');
        $this->addSql('ALTER TABLE book DROP tag2');
        $this->addSql('ALTER TABLE book DROP tag3');
        $this->addSql('ALTER TABLE book DROP comment1');
        $this->addSql('ALTER TABLE book DROP comment2');
        $this->addSql('ALTER TABLE book ADD CONSTRAINT FK_CBE5A331A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_CBE5A331A76ED395 ON book (user_id)');
        $this->addSql('ALTER TABLE custom_category ADD user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE custom_category ADD CONSTRAINT FK_E39EFEA5A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_E39EFEA5A76ED395 ON custom_category (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE book DROP CONSTRAINT FK_CBE5A331A76ED395');
        $this->addSql('DROP INDEX IDX_CBE5A331A76ED395');
        $this->addSql('ALTER TABLE book ADD series VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE book ADD sub_genre VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE book ADD tag1 VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE book ADD tag2 VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE book ADD tag3 VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE book ADD comment1 TEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE book ADD comment2 TEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE book DROP user_id');
        $this->addSql('ALTER TABLE custom_category DROP CONSTRAINT FK_E39EFEA5A76ED395');
        $this->addSql('DROP INDEX IDX_E39EFEA5A76ED395');
        $this->addSql('ALTER TABLE custom_category DROP user_id');
    }
}
