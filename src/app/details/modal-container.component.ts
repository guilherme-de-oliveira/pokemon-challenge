import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil, zip } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal-wrapper',
  template: '',
  encapsulation: ViewEncapsulation.None,
})
export class ModalWrapperComponent implements OnDestroy {
  destroy = new Subject<any>();
  currentDialog: NgbModalRef | undefined;
  dialogResult: any;

  constructor(
    private modalService: NgbModal,
    route: ActivatedRoute,
    private location: Location
  ) {
    let routeParams = route.params;
    let routeData = route.data;

    zip(routeParams, routeData)
      .pipe(takeUntil(this.destroy))
      .subscribe((result) => {
        this.currentDialog = this.modalService.open(result[1]['component'], {
          centered: true,
          size: 'lg',
        });
        this.currentDialog.componentInstance.params = result[0];
        this.currentDialog.componentInstance.stateParams =
          window.history.state['data'];

        this.dialogResult = this.currentDialog.result.then(
          (result) => {
            if (result !== -1) {
              this.location.back();
            }
          },
          (reason) => {
            this.location.back();
          }
        );
      });
  }

  ngOnDestroy() {
    this.destroy.next(undefined);
    this.currentDialog?.close(-1);
    this.dialogResult = null;
  }
}
