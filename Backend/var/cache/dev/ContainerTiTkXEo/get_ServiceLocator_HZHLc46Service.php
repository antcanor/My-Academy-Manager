<?php

namespace ContainerTiTkXEo;


use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class get_ServiceLocator_HZHLc46Service extends App_KernelDevDebugContainer
{
    /**
     * Gets the private '.service_locator.HZHLc46' shared service.
     *
     * @return \Symfony\Component\DependencyInjection\ServiceLocator
     */
    public static function do($container, $lazyLoad = true)
    {
        return $container->privates['.service_locator.HZHLc46'] = new \Symfony\Component\DependencyInjection\Argument\ServiceLocator($container->getService ??= $container->getService(...), [
            'jwtAuth' => ['privates', 'App\\Services\\JwtAuth', 'getJwtAuthService', true],
        ], [
            'jwtAuth' => 'App\\Services\\JwtAuth',
        ]);
    }
}
