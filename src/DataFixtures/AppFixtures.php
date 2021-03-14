<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Event;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{

    /**
     * L'encodeur de mot de passe
     *
     * @var UserPasswordEncoderInterface
     */
    private $encoder;
    
    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

            $category = new Category;
            $category->setName('Happy Hours');
            $manager->persist($category);
           
        for ($u=0; $u < 10; $u++) { 
            $user = new User();

            $hash = $this->encoder->encodePassword($user, "password");

            $user->setEmail($faker->email)
                ->setPseudo('utilisateur n°'.$u)
                ->setPassword($hash);
            
            $manager->persist($user);
        
            for ($c=0; $c < mt_rand(5,50) ; $c++) { 

                $event = new Event;
                $event->setTitle('event n°'.$c)
                    ->setPrice($faker->randomFloat(2,0,180))
                    ->setCreatedAt($faker->dateTimeBetween('-6 months'))
                    ->setCategory($category)
                    ->setUser($user);

                $manager->persist($event);
            }
        }

       

        
        $manager->flush();
    }
}
