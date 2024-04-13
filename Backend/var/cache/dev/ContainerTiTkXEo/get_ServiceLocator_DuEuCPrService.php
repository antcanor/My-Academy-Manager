<?php

namespace ContainerTiTkXEo;


use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class get_ServiceLocator_DuEuCPrService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private '.service_locator.duEuCPr' shared service.
     *
     * @return \Symfony\Component\DependencyInjection\ServiceLocator
     */
    public static function do($container, $lazyLoad = true)
    {
        return $container->privates['.service_locator.duEuCPr'] = new \Symfony\Component\DependencyInjection\Argument\ServiceLocator($container->getService ??= $container->getService(...), [
            'ar' => ['privates', 'App\\Repository\\AsignaturaRepository', 'getAsignaturaRepositoryService', true],
            'jwt_auth' => ['privates', 'App\\Services\\JwtAuth', 'getJwtAuthService', true],
            'serializer' => ['privates', 'debug.serializer', 'getDebug_SerializerService', false],
        ], [
            'ar' => 'App\\Repository\\AsignaturaRepository',
            'jwt_auth' => 'App\\Services\\JwtAuth',
            'serializer' => '?',
        ]);
    }
}
