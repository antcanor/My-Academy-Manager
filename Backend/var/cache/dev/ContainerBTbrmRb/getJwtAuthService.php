<?php

namespace ContainerBTbrmRb;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class getJwtAuthService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private 'App\Services\JwtAuth' shared autowired service.
     *
     * @return \App\Services\JwtAuth
     */
    public static function do($container, $lazyLoad = true)
    {
        include_once \dirname(__DIR__, 4).''.\DIRECTORY_SEPARATOR.'src'.\DIRECTORY_SEPARATOR.'Services'.\DIRECTORY_SEPARATOR.'JwtAuth.php';

        $a = ($container->services['doctrine.orm.default_entity_manager'] ?? self::getDoctrine_Orm_DefaultEntityManagerService($container));

        if (isset($container->privates['App\\Services\\JwtAuth'])) {
            return $container->privates['App\\Services\\JwtAuth'];
        }

        return $container->privates['App\\Services\\JwtAuth'] = new \App\Services\JwtAuth($a);
    }
}