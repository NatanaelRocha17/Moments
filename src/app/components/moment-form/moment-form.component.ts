import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {FormGroup, FormControl, Validators} from "@angular/forms"
import { Moment } from 'src/app/Moments';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent {
  @Output() onSubmit = new EventEmitter<Moment>
  @Input() btnText!:string
  @Input() momentData: Moment | null = null;


  momentForm!: FormGroup

  ngOnInit():void{
    this.momentForm = new FormGroup({
      id: new FormControl(this.momentData ? this.momentData.id : ''),
      title: new FormControl(this.momentData ? this.momentData.title : '', [Validators.required]),
      description: new FormControl(this.momentData ? this.momentData.description : '', [Validators.required]),
      image: new FormControl('')
    })
  }
  submit():void{
    if(this.momentForm.invalid){
      return;
    }

    console.log("Enviou o formulário")
    console.log(this.momentForm.value)
    this.onSubmit.emit(this.momentForm.value)
  }

  get title(){
    return this.momentForm.get("title")!
  }

  
  get description(){
    return this.momentForm.get("title")!
  }


  onFileSelected(event:any){ /*qualquqer tipo de valor */
    const file: File = event.target.files[0] 

    this.momentForm.patchValue({image: file})
  }

  
}
