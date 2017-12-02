import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(),
      'password': new FormControl()
    });
  }

  printMyForm() {
    console.log(this.form);
  }

  register(form: FormGroup) {
    console.log('Registration successful.');
    console.log(form.value);
  }

}
