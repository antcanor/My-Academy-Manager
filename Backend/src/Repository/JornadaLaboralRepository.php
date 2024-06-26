<?php

namespace App\Repository;

use App\Entity\JornadaLaboral;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<JornadaLaboral>
 *
 * @method JornadaLaboral|null find($id, $lockMode = null, $lockVersion = null)
 * @method JornadaLaboral|null findOneBy(array $criteria, array $orderBy = null)
 * @method JornadaLaboral[]    findAll()
 * @method JornadaLaboral[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class JornadaLaboralRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, JornadaLaboral::class);
    }

    //    /**
    //     * @return JornadaLaboral[] Returns an array of JornadaLaboral objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('j')
    //            ->andWhere('j.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('j.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?JornadaLaboral
    //    {
    //        return $this->createQueryBuilder('j')
    //            ->andWhere('j.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
