<?php 

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubcriber {
    public function updateJwtData(JWTCreatedEvent $event) {
        $user = $event->getUser();
        $data = $event->getData();
        $data['pseudo'] = $user->getPseudo();
        
        $event->setData($data);
       
    }
}