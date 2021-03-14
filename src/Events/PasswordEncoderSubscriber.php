<?php

namespace App\Events;

use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\User\UserInterface;
use App\Entity\User;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;

class PasswordEncoderSubscriber implements EventSubscriberInterface{

    /**@var UserPasswordEncoderInterface */
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public static function getSubscribedEvents()
    {
       return [
           KernelEvents::VIEW => ['encodePassword', EventPriorities::PRE_WRITE]
       ];
    }

    public function encodePassword(GetResponseForControllerResultEvent $ev){
        $result = $ev->getControllerResult();
        $method = $ev->getRequest()->getMethod();

        if ($result instanceof User && $method === "POST") {
            $hash = $this->encoder->encodePassword( $result, $result->getPassword());
            $result->setPassword($hash);
        }
    }

}