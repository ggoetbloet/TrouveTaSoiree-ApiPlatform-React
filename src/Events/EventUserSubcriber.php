<?php

namespace App\Events;

use App\Entity\Event;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;

class EventUserSubcriber implements EventSubscriberInterface
{

    private $security;

    public function __construct(Security $security )
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return[
            KernelEvents::VIEW => ['setUserForEvent', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForEvent(GetResponseForControllerResultEvent $ev){
        $result = $ev->getControllerResult();
        $method = $ev->getRequest()->getMethod();

        if ($result instanceof Event && $method === "POST") {
            $user = $this->security->getUser();
            $result->setUser($user);
        }
    }
}