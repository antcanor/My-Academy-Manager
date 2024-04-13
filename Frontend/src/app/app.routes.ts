import { Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { ClaseComponent } from './clase/clase.component';
import { ClaseDetalleComponent } from './clase-detalle/clase-detalle.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RegistroclaseComponent } from './registro-clase/registro-clase.component';
import { RegistroAsignaturaComponent } from './registro-asignatura/registro-asignatura.component';
import { RegistroAulaComponent } from './registro-aula/registro-aula.component';
import { LoginComponent } from './login/login.component';
import { IdentityGuard } from './services/identity.guard';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
{
    path: 'asistencia',
    component: AsistenciaComponent,
    title: 'Asistencia',
    canActivate: [IdentityGuard]
},
{
    path: 'perfil',
    component: PerfilComponent,
    title: 'Perfil',
    canActivate: [IdentityGuard]
},
{
    path: 'asistencia',
    component: AsistenciaComponent,
    title: 'Asistencia',
    canActivate: [IdentityGuard]
},
{
    path: 'usuario',
    component: UsuariosComponent,
    title: 'Lista de Usuarios',
    canActivate: [IdentityGuard]
},
{
    path: 'clase',
    component: ClaseComponent,
    title: 'Clase',
    canActivate: [IdentityGuard]
},
{
    path:'clase/:id',
    component:ClaseDetalleComponent,
    title:'Informacion Clase',
    canActivate: [IdentityGuard]
},

{
    path:'usuario/crear',
    component:RegistroUsuarioComponent,
    title:'Resgitro Usuario',
    canActivate: [IdentityGuard]
},
{
    path:'clases/crear',
    component:RegistroclaseComponent,
    title:'Resgitro Clase',
    canActivate: [IdentityGuard]
},
{
    path:'asignatura/crear',
    component:RegistroAsignaturaComponent,
    title:'Resgitro Asignatura',
    canActivate: [IdentityGuard]
},
{
    path:'aula/crear',
    component:RegistroAulaComponent,
    title:'Resgitro Aula',
    canActivate: [IdentityGuard]
},
{
    path:'',
    component:HomeComponent,
    title:'Inicio'
},
{
    path:'login',
    component:LoginComponent,
    title:'Login'
},
{
    path:'logout/:sure',
    component:LoginComponent,
    title:'Logout'
},
];
