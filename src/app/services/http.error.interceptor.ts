import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
   
import { Observable, throwError } from 'rxjs';
   
import { catchError, retry } from 'rxjs/operators';
     
export class HttpErrorInterceptor implements HttpInterceptor {
   
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    return next.handle(request)
   
      .pipe(
        
        // retry(1),

        catchError((error: HttpErrorResponse) => {
    // console.log(error.error,">>>>>>",error.error.error,"error",error);
          let errorMessage = 'Unknown Error Occured!!!';

          if (!error.error || !error.status) {

              return throwError(errorMessage);

          }
   
          if (error.error instanceof ErrorEvent) {

                // client-side error
    
                errorMessage = `Error: ${error.error.message}`;
    
          } 

          else {
    
                // server-side error
                  switch (error.status){

                    case 400:
                      errorMessage = `${error.error.message}`
                    break;

                    case 401:
                      errorMessage = `${error.error.message}`
                    break;
                    
                    case 404:
                      errorMessage = `${error.error.message}`
                    break;
    
                    case 403: 
                      errorMessage = `Access Denied: ${error.error.message}`;
                    break;
    
                    case 500: 
                      errorMessage = `Internal Server Error: ${error.error.message}`;
                    break;

                    case 503: 
                      errorMessage = `Service Unavailable: ${error.error.message}`;
                    break;
     
                    // default: 
                    //   errorMessage = `Unknown Error Occured`;
                    
                  }
            
          }
   
            // window.alert(errorMessage);
   
          return throwError(errorMessage);
   
          })
   
      )
   
    }
   
}