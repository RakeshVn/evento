import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  eventForm: FormGroup
  preview: Boolean = false
  isSubmited: Boolean = false
  @ViewChild('file', { static: false }) inputFile: ElementRef;
  @ViewChild('classic2', { static: false }) classic2;
  closeResult: string;

  constructor(
    private _FormBuilder: FormBuilder,
    private _CommonService: CommonService,
    private modalService: NgbModal
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
    return this.open(this.classic2, 'Notification', '')
  }

  onSubmit() {

    let eventFormValue = Object.assign({}, this.eventForm.value)
    delete eventFormValue.idCard

    this._CommonService.post('event', eventFormValue).subscribe(response => {

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
      this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else {
      this.modalService.open(content, { centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    }
  }

}
