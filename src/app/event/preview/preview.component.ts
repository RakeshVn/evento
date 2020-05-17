import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  @Input() eventData: any
  @Output() onSubmit = new EventEmitter()
  @Output() onBack = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}
