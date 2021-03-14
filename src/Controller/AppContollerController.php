<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AppContollerController extends AbstractController
{
    /**
     * @Route("/", name="app_contoller")
     */
    public function index()
    {
        return $this->render('app_contoller/index.html.twig', [
            
        ]);
    }
}
