<?php

namespace App\Events;

use App\Entity\Event;

use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;


class EventCreatedAtSubcriber implements EventSubscriberInterface
{

    public static function getSubscribedEvents()
    {
        return[
            KernelEvents::VIEW => ['setCreatedAtForEvent', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setCreatedAtForEvent(GetResponseForControllerResultEvent $ev){
        $result = $ev->getControllerResult();
        $method = $ev->getRequest()->getMethod();

        if ($result instanceof Event && $method === "POST") {
            $createdAt = new \DateTime('NOW');
            $createdAt->setTimezone(new \DateTimeZone('Europe/Paris'));
            $result->setCreatedAt($createdAt);
        }
    }
}