import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  startDate: Date;
  genders: Array<Object>;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      'firstname': new FormControl(),
      'lastname': new FormControl(),
      'username': new FormControl(),
      'email': new FormControl(),
      'password': new FormControl()
    });
    this.startDate = new Date(1990, 0, 1);
    this.genders = [
      {value: 0, viewValue: 'Male'},
      {value: 1, viewValue: 'Female'},
    ];
  }

  printMyForm() {
    console.log(this.form);
  }

  register(form: FormGroup) {
    console.log('Registration successful.');
    console.log(form.value);
  }

}
