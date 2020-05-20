import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  eventsData = []
  viewImage: ''
  page = 1
  limit = 10
  totalPages = []

  constructor(
    private _CommonService: CommonService,
    private modalService: NgbModal,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {
    _ActivatedRoute.queryParams.subscribe(params => {
      if (params.page) {
        this.page = params.page
      }
      this.getEvents()
    })
  }

  ngOnInit() { }

  getEvents() {
    this._CommonService.get('event', { page: this.page }).subscribe(res => {
      this.eventsData = res['data']
      let totalRecords = res['totalRecords']
      this.totalPages = Array(Math.ceil(totalRecords / this.limit)).fill(0).map((x, i) => i + 1);
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

  onPageChange(page) {
    if (page == 'prev') {
      this.page--;
      page = this.page = this.page <= 0 ? 1 : this.page
    } else if (page == 'next') {
      this.page++;
      page = this.page = this.page >= this.totalPages.length ? this.totalPages.length : this.page
    }
    this._Router.navigate(['event/view'], {
      queryParams: { page: page }
    })
  }

  onRespond(id, status) {
    this._CommonService.put(`event/action/${id}`, {}, { accepted: status ? 'accepted' : 'rejected' }).subscribe(res => {
      this.getEvents()
    }, err => {
      console.error(err)
    })
  }

}
