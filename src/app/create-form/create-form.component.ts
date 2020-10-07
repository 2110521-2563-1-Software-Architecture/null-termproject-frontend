import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {
validateForm!: FormGroup;

  submitForm(): void {
    console.log(this.validateForm.controls.title.value);
    console.log(this.validateForm.controls.oldurl.value);
    console.log(this.validateForm.controls.newurl.value);
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      oldurl: [null, [Validators.required]],
      newurl: [null, [Validators.required]],
      remember: [true]
    });
  }
}
