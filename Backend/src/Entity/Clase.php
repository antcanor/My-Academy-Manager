<?php

namespace App\Entity;

use App\Repository\ClaseRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ClaseRepository::class)]
class Clase
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['clase','clasebasic'])]
    
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'clases')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['clase','clasebasic'])]
    
    private ?Asignatura $asignatura = null;

    #[ORM\ManyToOne(inversedBy: 'clases')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['clase'])]
   
    private ?Profesor $profesor = null;

    #[ORM\ManyToOne(inversedBy: 'clases')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['clase'])]
    
    private ?Aula $aula = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    #[Groups(['clase'])]
    
    private ?\DateTimeInterface $hora_inicio = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    #[Groups(['clase'])]
    
    private ?\DateTimeInterface $hora_fin = null;

    #[ORM\ManyToMany(targetEntity: DiasSemana::class, inversedBy: 'clases')]
    private Collection $dias;

    #[ORM\ManyToMany(targetEntity: Alumno::class, inversedBy: 'clases')]
    private Collection $alumnos;

    #[ORM\OneToMany(targetEntity: Calificacion::class, mappedBy: 'clase')]
    private Collection $calificacions;

    public function __construct()
    {
        $this->dias = new ArrayCollection();
        $this->alumnos = new ArrayCollection();
        $this->calificacions = new ArrayCollection();
    }
    #[Groups(['alumno'])]
    public function getId(): ?int
    {
        return $this->id;
    }
    #[Groups(['alumno'])]
    public function getAsignatura(): ?Asignatura
    {
        return $this->asignatura;
    }

    public function setAsignatura(?Asignatura $asignatura): static
    {
        $this->asignatura = $asignatura;

        return $this;
    }

    public function getProfesor(): ?Profesor
    {
        return $this->profesor;
    }

    public function setProfesor(?Profesor $profesor): static
    {
        $this->profesor = $profesor;

        return $this;
    }

    public function getAula(): ?Aula
    {
        return $this->aula;
    }

    public function setAula(?Aula $aula): static
    {
        $this->aula = $aula;

        return $this;
    }

    public function getHoraInicio(): ?\DateTimeInterface
    {
        return $this->hora_inicio;
    }

    public function setHoraInicio(\DateTimeInterface $hora_inicio): static
    {
        $this->hora_inicio = $hora_inicio;

        return $this;
    }

    public function getHoraFin(): ?\DateTimeInterface
    {
        return $this->hora_fin;
    }

    public function setHoraFin(\DateTimeInterface $hora_fin): static
    {
        $this->hora_fin = $hora_fin;

        return $this;
    }

    /**
     * @return Collection<int, DiasSemana>
     */

     #[Groups(['clase'])]
    
    public function getDias(): Collection
    {
        return $this->dias;
    }

    public function addDia(DiasSemana $dia): static
    {
        if (!$this->dias->contains($dia)) {
            $this->dias->add($dia);
        }

        return $this;
    }

    public function removeDia(DiasSemana $dia): static
    {
        $this->dias->removeElement($dia);

        return $this;
    }

    /**
     * @return Collection<int, Alumno>
     */
    #[Groups(['clase'])]
    
    public function getAlumnos(): Collection
    {
        return $this->alumnos;
    }

    public function addAlumno(Alumno $alumno): static
    {
        if (!$this->alumnos->contains($alumno)) {
            $this->alumnos->add($alumno);
        }

        return $this;
    }

    public function removeAlumno(Alumno $alumno): static
    {
        $this->alumnos->removeElement($alumno);

        return $this;
    }

    /**
     * @return Collection<int, Calificacion>
     */
    public function getCalificacions(): Collection
    {
        return $this->calificacions;
    }

    public function addCalificacion(Calificacion $calificacion): static
    {
        if (!$this->calificacions->contains($calificacion)) {
            $this->calificacions->add($calificacion);
            $calificacion->setClase($this);
        }

        return $this;
    }

    public function removeCalificacion(Calificacion $calificacion): static
    {
        if ($this->calificacions->removeElement($calificacion)) {
            // set the owning side to null (unless already changed)
            if ($calificacion->getClase() === $this) {
                $calificacion->setClase(null);
            }
        }

        return $this;
    }
}