<?php

namespace Container3ukGtvj;


use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class get_ServiceLocator_OpWywnpService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private '.service_locator.opWywnp' shared service.
     *
     * @return \Symfony\Component\DependencyInjection\ServiceLocator
     */
    public static function do($container, $lazyLoad = true)
    {
        return $container->privates['.service_locator.opWywnp'] = new \Symfony\Component\DependencyInjection\Argument\ServiceLocator($container->getService ??= $container->getService(...), [
            'cr' => ['privates', 'App\\Repository\\ClaseRepository', 'getClaseRepositoryService', true],
            'jwt_auth' => ['privates', 'App\\Services\\JwtAuth', 'getJwtAuthService', true],
            'serializer' => ['privates', 'debug.serializer', 'getDebug_SerializerService', false],
        ], [
            'cr' => 'App\\Repository\\ClaseRepository',
            'jwt_auth' => 'App\\Services\\JwtAuth',
            'serializer' => '?',
        ]);
    }
}
