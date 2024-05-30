<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Menu;
use App\Repository\MenuRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Clase;
use App\Repository\ClaseRepository;
use App\Entity\Profesor;
use App\Repository\ProfesorRepository;
use App\Entity\Usuario;
use App\Repository\UsuarioRepository;
use App\Entity\Alumno;
use App\Repository\AlumnoRepository;
use App\Entity\Asignatura;
use App\Repository\AsignaturaRepository;
use App\Entity\Aula;
use App\Repository\AulaRepository;
use App\Entity\Calificacion;
use App\Repository\CalificacionRepository;
use App\Entity\DiasSemana;
use App\Repository\DiasSemanaRepository;
use App\Entity\Mensaje;
use App\Repository\MensajeRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Services\JwtAuth;


#[Route('/api/usuarios', name: 'app_user')]
class UserController extends AbstractController
{

    #[Route('/crear', name: 'crear_usuario', methods: ['POST'])]
    public function crearUsuario(Request $request,JwtAuth $jwtAuth ,SerializerInterface $serializer, UsuarioRepository $ur,AlumnoRepository $ar ,ClaseRepository $cr, EntityManagerInterface $entityManager)
    {
        //Recoger la cabecera de autenticación
        $token=$request->headers->get('Authorization');
        //Crea rmetodo para comprobar si el token es correcto
        $authCheck = $jwtAuth->checkToken($token);
        
        //Si es correcto, comprobar admin
        if($authCheck){
            
            //Conseguir datos del usuario identificado
            $identity = $jwtAuth->checkToken($token, true);

            if($identity->rol == 'admin'){
                $json = $request->get('json', null);
                $params =  json_decode($json);

                if(!empty($json)){
                    $nombre= (!empty($params->nombre)) ? $params->nombre : null;
                    $apellidos= (!empty($params->apellidos)) ? $params->apellidos : null;
                    $dni= (!empty($params->dni)) ? $params->dni : null;
                    $email= (!empty($params->email)) ? $params->email : null;
                    $password= (!empty($params->password)) ? $params->password : null;
                    $fechaNacimiento= (!empty($params->fechaNacimiento)) ? $params->fechaNacimiento : null;
                    $rol= (!empty($params->rol)) ? $params->rol : null;
                    $clases= (!empty($params->clases)) ? $params->clases : null;
                    if ($rol == 'alumno' && !$clases) {
                        $data = [
                            'status' => 'error',
                            'code' => 400,
                            'message' => 'El alumno debe estar matriculado en al menos una clase',
                        ];
                        return new JsonResponse($data);
                    }
                    
                
                    $usuarioExistente = $ur->findOneBy(['email' => $email]);
                    if ($usuarioExistente) {
                        $data = [
                            'status' => 'error',
                            'code' => 400,
                            'message' => 'Ya existe un usuario con este correo electrónico',
                        ];
                        return new JsonResponse($data);
                    }
                    //Comprobar y validar
                    $validarDNI = $this->validarDNI($dni);
                    if (!$validarDNI) {
                        $data = [
                            'status' => 'error',
                            'code' => 400,
                            'message' => 'DNI no válido',
                        ];
                        return new JsonResponse($data);
                    }
                    
                    $validarEmail = filter_var($email, FILTER_VALIDATE_EMAIL);
                    if (!$validarEmail) {
                        $data = [
                            'status' => 'error',
                            'code' => 400,
                            'message' => 'Email no válido',
                        ];
                        return new JsonResponse($data);
                    }
                    $validarpassword = strlen($password) >= 6;
                    if (!$validarpassword) {
                        $data = [
                            'status' => 'error',
                            'code' => 400,
                            'message' => 'La contraseña debe tener al menos 6 caracteres',
                        ];
                        return new JsonResponse($data);
                    }

                    $usuario = new Usuario();
                    $usuario->setNombre($nombre);
                    $usuario->setApellidos($apellidos);
                    $usuario->setDni($dni);
                    $usuario->setEmail($email);
                    $usuario->setPassword($password);
                    $usuario->setFechaNacimiento(new \DateTime($fechaNacimiento));
                    $usuario->setRol($rol);

                    $entityManager->persist($usuario);
                    $entityManager->flush();
                    
                    switch ($usuario->getRol()) {
                        case 'alumno':
                            if (!$clases) {
                                $data = [
                                    'status' => 'error',
                                    'code' => 400,
                                    'message' => 'El alumno debe estar matriculado en al menos una clase',
                                ];
                                return new JsonResponse($data);
                            }
                            $alumno = new Alumno();
                            $alumno->setUsuario($usuario);
                            foreach ($clases as $claseId) {
                                $clase = $cr->find($claseId);
                                if ($clase) {
                                    $alumno->addClase($clase);
                                }
                            }
                            $entityManager->persist($alumno);
                            $entityManager->flush();
                            $data = [
                                'status' => 'success',
                                'code' => 200,
                                'message' => 'Alumno creado con éxito',
                                'alumno' => $alumno
                            ];
                            break;
                        case 'profesor':
                            $profesor = new Profesor();
                            $profesor->setUsuario($usuario);
                            $entityManager->persist($profesor);
                            $entityManager->flush();
                            $data = [
                                'status' => 'success',
                                'code' => 200,
                                'message' => 'Profesor creado con éxito',
                                'profesor' => $profesor
                            ];
                            break;
                        case 'admin':
                            $data = [
                                'status' => 'success',
                                'code' => 200,
                                'message' => 'Admin creado con éxito',
                                'admin' => $usuario
                            ];
                            break;
                    }
                return new JsonResponse($data);

            }
        
            }
            return new JsonResponse($data);
        }
 

    } 

    #[Route('/login', name: 'login', methods: ['POST'])]
    public function login(Request $request, JwtAuth $jwtAuth)
    {   
        $json =$request->get('json', null);
        $params = json_decode($json);
        $data = [
            'status' => 'error',
            'code' => 400,
            'message' => 'Usuario no logueado'
        ];

        if($json != null){
            $email = (!empty($params->email)) ? $params->email : null;
            $password = (!empty($params->password)) ? $params->password : null;
            $gettoken = (!empty($params->gettoken)) ? $params->gettoken : null;
 
        }
        if(!empty($email) && !empty($password)){
          
            if($gettoken){
                $signup=$jwtAuth->singup($email, $password, $gettoken);
            }else{
                $signup=$jwtAuth->singup($email, $password);
            }
            return new JsonResponse($signup);
        }
        return new JsonResponse($data);
    }

    #[Route('/editar', name: 'editar_usuario', methods: ['PUT'])]
    public function editUser(Request $request, JwtAuth $jwtAuth, EntityManagerInterface $entityManager, UsuarioRepository $ur)
    {   
        //Recoger la cabecera de autenticación
        $token=$request->headers->get('Authorization');
        //Crea rmetodo para comprobar si el token es correcto
        $authCheck = $jwtAuth->checkToken($token);
        
        //Si es correcto, hacer la actualización del usuario
        if($authCheck){
            
            //Conseguir datos del usuario identificado
            $identity = $jwtAuth->checkToken($token, true);

            //Respuesta por defecto
            $data = [
                'status' => 'error',
                'code' => 400,
                'message' => 'Usuario no actualizado'
            ];
            
            //Conseguir el usuario a actualizar
            $usuario = $ur->findOneBy(['id' => $identity->sub]);

            //Recoger datos post
            $json = $request->get('json', null);
            $params =  json_decode($json);


            //Comprobar y validar
            if(!empty($json)){
                $nombre= (!empty($params->nombre)) ? $params->nombre : null;
                $apellidos= (!empty($params->apellidos)) ? $params->apellidos : null;
                $email= (!empty($params->email)) ? $params->email : null;
                $password= (!empty($params->password)) ? $params->password : null;

                $validarEmail = filter_var($email, FILTER_VALIDATE_EMAIL);
                if (!$validarEmail) {
                    $data = [
                        'status' => 'error',
                        'code' => 400,
                        'message' => 'Email no válido',
                    ];
                    return new JsonResponse($data);
                }
                if($password!=null){
                    $validarpassword = strlen($password) >= 6;
                    if (!$validarpassword) {
                        $data = [
                            'status' => 'error',
                            'code' => 400,
                            'message' => 'La contraseña debe tener al menos 6 caracteres',
                        ];
                        return new JsonResponse($data);
                    }
                }
                

                //Asignar nuevos dartos al objeto de usuario
                if(!empty($nombre) && !empty($apellidos) && !empty($email) && $password==null){
                    //Asignar nuevos valores al objeto
                    $usuario->setNombre($nombre);
                    $usuario->setApellidos($apellidos);
                    $usuario->setEmail($email);
                    

                    $entityManager->persist($usuario);
                    $entityManager->flush();

                    //Devolver respuesta
                    $data = [
                        'status' => 'success',
                        'code' => 200,
                        'message' => 'Usuario actualizado',
                        'usuario' => $usuario
                    ]; 
                    
                }else if(!empty($nombre) && !empty($apellidos) && !empty($email) && !empty($password)){
                    //Asignar nuevos valores al objeto
                    $usuario->setNombre($nombre);
                    $usuario->setApellidos($apellidos);
                    $usuario->setEmail($email);
                    $usuario->setPassword($password);

                    $entityManager->persist($usuario);
                    $entityManager->flush();

                    //Devolver respuesta
                    $data = [
                        'status' => 'success',
                        'code' => 200,
                        'message' => 'Usuario actualizado',
                        'usuario' => $usuario
                    ]; 
                }
            }
          
            
        }

        //Devolver una respuesta

        


        return new JsonResponse($data);
    }


    public function validarDNI($dni) {
        // Eliminar espacios en blanco y convertir a mayúsculas
        $dni = strtoupper(trim($dni));
    
        // Comprobar si el formato es válido (8 dígitos seguidos por una letra)
        if (preg_match('/^[0-9]{8}[A-Z]$/', $dni)) {
            // Extraer los números y la letra
            $numero = substr($dni, 0, -1);
            $letra = substr($dni, -1);
    
            // Calcular la letra correcta
            $letras = "TRWAGMYFPDXBNJZSQVHLCKE";
            $letraCalculada = $letras[$numero % 23];
    
            // Comparar la letra calculada con la letra proporcionada
            if ($letraCalculada === $letra) {
                return true;
            }
        }
        return false;
    }
}
