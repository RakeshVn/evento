import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  eventsData = []
  viewImage: ''

  constructor(
    private _CommonService: CommonService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getEvents()
  }

  getEvents() {
    this._CommonService.get('event').subscribe(res => {
      this.eventsData = res['data']
      console.log(this.eventsData)
    }, err => {
      console.error(err)
    })
  }


  open(content, type, modalDimension, image) {
    this.viewImage = image
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => { }, (reason) => { });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => { }, (reason) => { });
    } else {
      this.modalService.open(content, { centered: true }).result.then((result) => { }, (reason) => { });
    }
  }

}
