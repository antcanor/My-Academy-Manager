import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { RouterModule, Router,ActivatedRoute,Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-registro-asignatura',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './registro-asignatura.component.html',
  styleUrl: './registro-asignatura.component.css'
})
export class RegistroAsignaturaComponent {
  private api=inject(ApiService)
  private userService=inject(UserService)
  public token:any;
  public identity:any;
  formData:any={};
  public status:string='';
  public message:string='';
  
  constructor(private router: Router, private route: ActivatedRoute,  private sanitizer: DomSanitizer) {
    this.loadUser();
    if(this.identity.rol=='admin'){
      this.formData={};
    }else{
      this.router.navigate(['/inicio']);
    }
  }
  loadUser(){
    this.token=this.userService.getToken();
    this.identity=this.userService.getIdentity();
  }
  getSafeHtml(html: any) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  onSubmit(createasignatura: any) {
    this.api.createAsignatura(this.token, this.formData).subscribe(
      (response:any ) => {
        if(response && response.status == 'success'){
          this.status = 'success';
          this.message = response.message;
          
        }else{
          this.status = 'error';
          this.message = response.message;
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

  selectOption(s:any){
    this.formData.img=s.value;
    this.svg = this.svg.filter((item: any) => item.name.includes(s.name));
        
  }


  svg: any=[
    {name:'SVG 1', value:'<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" fill=\"currentColor\" class=\"bi bi-filetype-php\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" d=\"M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.182.185.522m4.48 2.666V11.85h-.79v1.626H4.153V11.85h-.79v3.999h.79v-1.714h1.682v1.714zm.703-3.999h1.6q.433 0 .732.179.3.175.46.477.158.302.158.677t-.161.677q-.159.299-.463.474a1.45 1.45 0 0 1-.733.173H8.12v1.342h-.791zm2.06 1.714a.8.8 0 0 0 .084-.381q0-.34-.184-.521-.184-.182-.513-.182h-.66v1.406h.66a.8.8 0 0 0 .375-.082.57.57 0 0 0 .237-.24Z\"/></svg>'},
    {name:'SVG 2', value:'<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" fill=\"currentColor\" class=\"bi bi-filetype-java\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" d=\"M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.521 15.175a1.3 1.3 0 0 1-.082-.466h.765a.6.6 0 0 0 .073.27.5.5 0 0 0 .454.246q.285 0 .422-.164.138-.165.138-.466V11.85h.79v2.725q0 .66-.357 1.005-.354.345-.984.345a1.6 1.6 0 0 1-.568-.094 1.1 1.1 0 0 1-.408-.266 1.1 1.1 0 0 1-.243-.39m3.972-.354-.314 1.028h-.8l1.342-3.999h.926l1.336 3.999h-.84l-.314-1.028zm1.178-.59-.49-1.616h-.035l-.49 1.617zm2.342 1.618h.952l1.327-3.999h-.878l-.888 3.138h-.038L8.59 11.85h-.917zm3.087-1.028-.314 1.028h-.8l1.342-3.999h.926l1.336 3.999h-.84l-.314-1.028zm1.178-.59-.49-1.616h-.035l-.49 1.617z\"/></svg>'},
    {name:'SVG 3', value:'<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" fill=\"currentColor\" class=\"bi bi-filetype-js\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" d=\"M14 4.5V14a2 2 0 0 1-2 2H8v-1h4a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM3.186 15.29a1.2 1.2 0 0 1-.111-.449h.765a.58.58 0 0 0 .255.384q.105.073.249.114.143.041.319.041.246 0 .413-.07a.56.56 0 0 0 .255-.193.5.5 0 0 0 .085-.29.39.39 0 0 0-.153-.326q-.151-.12-.462-.193l-.619-.143a1.7 1.7 0 0 1-.539-.214 1 1 0 0 1-.351-.367 1.1 1.1 0 0 1-.123-.524q0-.366.19-.639.19-.272.528-.422.336-.15.776-.149.457 0 .78.152.324.153.5.41.18.255.2.566h-.75a.56.56 0 0 0-.12-.258.6.6 0 0 0-.247-.181.9.9 0 0 0-.369-.068q-.325 0-.513.152a.47.47 0 0 0-.184.384q0 .18.143.3a1 1 0 0 0 .405.175l.62.143q.327.075.566.211.24.136.375.358t.135.56q0 .37-.188.656a1.2 1.2 0 0 1-.539.439q-.351.158-.858.158-.381 0-.665-.09a1.4 1.4 0 0 1-.478-.252 1.1 1.1 0 0 1-.29-.375m-3.104-.033A1.3 1.3 0 0 1 0 14.791h.765a.6.6 0 0 0 .073.27.5.5 0 0 0 .454.246q.285 0 .422-.164.138-.165.138-.466v-2.745h.79v2.725q0 .66-.357 1.005-.354.345-.984.345a1.6 1.6 0 0 1-.569-.094 1.15 1.15 0 0 1-.407-.266 1.1 1.1 0 0 1-.243-.39\"/></svg>'},
    {name:'SVG 4', value:'<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" fill=\"currentColor\" class=\"bi bi-calculator-fill\" viewBox=\"0 0 16 16\"><path d=\"M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm2 .5v2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5m0 4v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M4.5 9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M4 12.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M7.5 6a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM7 9.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m.5 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM10 6.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m.5 2.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5z\"/></svg>'},
    {name:'SVG 5', value:'<svg width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9 19C9 20.1046 7.65685 21 6 21C4.34315 21 3 20.1046 3 19C3 17.8954 4.34315 17 6 17C7.65685 17 9 17.8954 9 19ZM9 19V5L21 3V17M21 17C21 18.1046 19.6569 19 18 19C16.3431 19 15 18.1046 15 17C15 15.8954 16.3431 15 18 15C19.6569 15 21 15.8954 21 17ZM9 9L21 7\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>'},
    {name:'SVG 6', value:'<svg fill=\"#000000\" height=\"32\" width=\"32\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" enable-background=\"new 0 0 512 512\"><g><path d=\"m470.4,11c-11.3,0-20.4,9.1-20.4,20.4v176.9h-161.2v-104.3h19.1c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-235.1c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h19.1v238c0,54.3 44.2,98.4 98.4,98.4s98.4-44.2 98.4-98.4v-92.8h161.3v211h-408.4c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h428.8c11.3,0 20.4-9.1 20.4-20.4v-449.2c0-11.3-9.1-20.4-20.4-20.4zm-222.6,93v104.4h-114.9v-104.4h114.9zm0,238c0,31.7-25.8,57.4-57.4,57.4s-57.4-25.8-57.4-57.4v-92.8h114.9v92.8z\"/></g></svg>'},
    {name:'SVG 7', value:'<svg width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20 15H19M14 15H19M17 13.5V15M4.85714 8H9.14286M4 11L5.53848 5.61531C5.97492 4.08777 6.19315 3.324 6.53044 3.13222C6.82159 2.96667 7.17841 2.96667 7.46956 3.13222C7.80685 3.324 8.02508 4.08777 8.46152 5.61531L10 11M14 20.9776C16.8033 20.725 19 18.369 19 15.5V15M20 20.9776C18.0763 20.8043 16.4382 19.6404 15.5996 18M14 7C14.9319 7 15.3978 7 15.7654 7.15225C16.2554 7.35523 16.6448 7.74458 16.8478 8.23464C17 8.60218 17 9.06812 17 10M7 15C7 15.9319 7 16.3978 7.15224 16.7654C7.35523 17.2554 7.74458 17.6448 8.23463 17.8478C8.60218 18 9.06812 18 10 18\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>'},
    {name:'SVG 8', value:'<svg width=\"32\" height=\"32\" viewBox=\"0 0 64 64\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"#231F20\"><path d=\"M20.161,2.273C16.233,3.835,12.553,6.2,9.375,9.378C9.19,9.562,9.018,9.755,8.838,9.942c1.386,3.831,3.126,7.562,5.242,11.133C18.139,15.485,20.168,8.879,20.161,2.273z\"/><path d=\"M63.824,28.682c-9.751-1.521-20.067,1.469-27.58,8.981c-1.202,1.202-2.287,2.479-3.258,3.812c7.363,5.18,15.545,8.678,24.021,10.495C62.398,45.233,64.671,36.827,63.824,28.682z\"/><path d=\"M27.05,63.616c9.75,1.519,20.067-1.471,27.58-8.983c0.308-0.308,0.602-0.624,0.894-0.94c-8.344-1.927-16.387-5.451-23.659-10.562C27.924,49.32,26.316,56.563,27.05,63.616z\"/><path d=\"M12.771,22.754c-2.172-3.571-3.98-7.297-5.435-11.13c-4.895,5.909-7.34,13.163-7.332,20.416c3.926-1.562,7.607-3.928,10.785-7.105C11.491,24.232,12.147,23.503,12.771,22.754z\"/><path d=\"M13.881,24.53c-0.535,0.62-1.09,1.231-1.678,1.819c-3.554,3.553-7.701,6.146-12.121,7.798c0.497,7.462,3.59,14.782,9.293,20.485c0.027,0.028,0.057,0.054,0.085,0.082c2.091-7.833,5.595-15.364,10.528-22.188C17.73,29.981,15.691,27.309,13.881,24.53z\"/><path d=\"M30.236,41.961c-2.588-1.935-5.074-4.067-7.427-6.42c-0.493-0.493-0.958-1.003-1.433-1.507c-4.874,6.828-8.298,14.369-10.258,22.207c4.102,3.541,8.884,5.869,13.886,6.984C24.372,55.889,26.117,48.385,30.236,41.961z\"/><path d=\"M22.583,32.401c0.54,0.579,1.076,1.161,1.641,1.726c2.262,2.262,4.653,4.313,7.14,6.18c1.033-1.42,2.187-2.778,3.467-4.058c7.829-7.829,18.525-11.037,28.708-9.635c-1.062-6.245-3.979-12.235-8.761-17.08c-9.619,3.111-18.671,8.468-26.311,16.107C26.321,27.787,24.371,30.052,22.583,32.401z\"/><path d=\"M15.215,22.892c1.773,2.78,3.774,5.456,6.007,8.002c1.78-2.312,3.711-4.546,5.831-6.666c7.594-7.595,16.541-13.007,26.063-16.257c-8.688-7.646-20.523-9.78-30.973-6.405C22.307,9.073,19.998,16.62,15.215,22.892z\"/></g></svg>'},
    {name:'SVG 9', value:'<svg fill=\"#000000\" height=\"32\" width=\"32\" version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 512 512\" xml:space=\"preserve\"><g><g><path d=\"M347.961,341.208c-3.34-3.355-4.256-8.44-2.278-12.656c5.385-11.481,8.115-23.698,8.115-36.311c0-44.644-34.821-81.848-80.539-89.448V80.539h11.506V0h-57.528v80.539h11.506v122.255c-45.719,7.602-80.539,44.804-80.539,89.448c0,12.611,2.73,24.829,8.115,36.311c1.977,4.214,1.061,9.3-2.278,12.655c-18.603,18.685-28.848,42.565-28.848,67.241C135.191,465.547,189.386,512,256,512s120.809-46.453,120.809-103.551C376.809,383.773,366.564,359.893,347.961,341.208z M256,270.382c12.709,0,23.011,10.302,23.011,23.011S268.709,316.404,256,316.404s-23.011-10.302-23.011-23.011S243.291,270.382,256,270.382z M290.517,419.955h-69.034v-34.517h69.034V419.955z\"/></g></g></svg>'}
  ]
}
