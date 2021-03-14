<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EventRepository")
 * @ApiResource(
 * normalizationContext={"groups"={"events_read"}},
 * denormalizationContext={"disable_type_enforcement"=true}
 * )
 * @ApiFilter(SearchFilter::class)
 * @ApiFilter(OrderFilter::class)
 */
class Event
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"events_read", "categories_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"events_read", "categories_read"})
     * 
     * @Assert\NotBlank(message="Le champs titre ne peut être vide !")
     * @Assert\Length(
     *      min = 3,
     *      max = 255,
     *      minMessage = "Le titre ne peut être inferieur à 3 caractères. ",
     *      maxMessage = "Le titre ne peut dépasser les 255 caractères. "
     * )
     * 
     */
    private $title;

    /**
     * @ORM\Column(type="float")
     * @Groups({"events_read", "categories_read"})
     * 
     * @Assert\NotBlank(message="Le champs Prix ne peut être vide !")
     * @Assert\Type(type="numeric", message="Le montant de la facture doit être un numérique !")
     */
    private $price;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"events_read", "categories_read"})
     * 
     * @Assert\NotBlank(message="Le champs date de création ne peut être vide !")
     * @Assert\DateTime(message="La date doit être au format YYYY-MM-DD !")
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Category", inversedBy="events")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"events_read"})
     * 
     * @Assert\NotBlank(message="Le champs category ne peut être vide !")
     */
    private $category;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="events")
     * @Groups({"events_read", "categories_read"})
     * 
     * @Assert\NotBlank(message="Le champs utilisateur ne peut être vide !")
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice($price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt($createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getCategory(): ?category
    {
        return $this->category;
    }

    public function setCategory(?category $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
