import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Employee } from '../employee';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  basicsubmit: boolean=false;
  edit: boolean = false;
  id: number=0;
  employee: Employee = new Employee();
  basicFormvalidation: FormGroup;
  constructor(private dataService: DataService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    if (this.id != undefined) {
      this.getDataById();
    }
    this.basicFormvalidation = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      age: ['', [Validators.required]],
    });
   
  }
  getDataById() {
    this.dataService.getDataById(this.id).subscribe((data: Employee) => {
      this.edit = true;
      this.employee = data;
      this.basicFormvalidation = this.formBuilder.group({
        name: [this.employee.name, [Validators.required]],
        email: [this.employee.email, [Validators.required]],
        age: [this.employee.age, [Validators.required]],
      });
    })
  }
  get basic() {
    return this.basicFormvalidation.controls;
  }
  submit() {
    this.basicsubmit = true;
    if (this.basicFormvalidation.valid) {
      this.employee.name = this.basicFormvalidation.value.name;
      this.employee.age = Number(this.basicFormvalidation.value.age);
      this.employee.email = this.basicFormvalidation.value.email;
      this.sendForm(this.employee);
    }
  }
  sendForm(data:any) {
    if (this.edit) {
      this.dataService.putData(data, this.employee.id).subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['table']);
      })
    }
    else {
      this.dataService.addData(data).subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['table']);
      })
    }
  }
}
