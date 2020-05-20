import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  eventForm: FormGroup
  preview: Boolean = false
  isSubmited: Boolean = false
  closeResult: string;
  registrationNumber: Number
  modalReference: any;

  @ViewChild('file', { static: false }) inputFile: ElementRef;
  @ViewChild('previewModal', { static: false }) previewModal;
  @ViewChild('registrationModal', { static: false }) registrationModal;

  constructor(
    private _FormBuilder: FormBuilder,
    private _CommonService: CommonService,
    private modalService: NgbModal,
    private _Router: Router
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    this.eventForm = this._FormBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      idCard: ['', Validators.required],
      type: ['Self', Validators.required],
      tickets: ['', Validators.required],
    });
  }

  onFileChange(event) {

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.eventForm.patchValue({
          idCard: reader.result as string
        });

      };

    }
  }

  onPreview() {
    if (this.eventForm.invalid) {
      return this.isSubmited = true
    }
    return this.open(this.previewModal, 'Notification', '')
  }

  onSubmit() {

    let eventFormValue = Object.assign({}, this.eventForm.value)
    delete eventFormValue.idCard

    this._CommonService.post('event', eventFormValue).subscribe(response => {

      this.registrationNumber = response['data']['regNumber']
      this.open(this.registrationModal, 'Notification', '')

      let file = this.inputFile.nativeElement
      file = file.files[0]
      let formData: FormData = new FormData()
      formData.append('file', file)

      this._CommonService.post(`event/upload/${response['data']._id}`, formData).subscribe(response => {
      }, error => {
        console.error(error)
      })

    }, error => {
      console.error(error)
    })

  }

  onBack() {
    this.preview = false
  }

  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalReference = this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true })
      this.modalReference.result.then((result) => { }, (reason) => {

      });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalReference = this.modalService.open(content, { windowClass: 'modal-danger', centered: true })
      this.modalReference.result.then((result) => { }, (reason) => {

      });
    } else {
      this.modalReference = this.modalService.open(content, { centered: true })
      this.modalReference.result.then((result) => { }, (reason) => {

      });
    }
  }

  close() {
    this.modalReference.close()
    this._Router.navigate(['/'])
  }

}
