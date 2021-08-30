import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from './alert.service';

@Component({ selector: 'alert', templateUrl: 'alert.component.html' })

export class AlertComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    errorMessage: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {

        this.subscription = this.alertService.getAlert()

            .subscribe(errorMessage => {

                switch (errorMessage && errorMessage.type) {

                    case 'success':

                        errorMessage.cssClass = 'alert alert-success';

                        break;

                    case 'error':

                        errorMessage.cssClass = 'alert alert-danger';

                        break;
                }

                this.errorMessage = errorMessage;

            });

    }

    ngOnDestroy() {

        this.subscription.unsubscribe();

    }
    
}