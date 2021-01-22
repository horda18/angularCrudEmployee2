import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from 'src/app/models/employee';
import { NgForm } from '@angular/forms';

declare var M: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  addEmployee(form: NgForm){
    if(form.value._id){
      this.employeeService.putEmployee(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.getEmployees();
          M.toast({html: 'Updated Successfuly'});
        });

    } else{
      this.employeeService.postEmployee(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.getEmployees();
        M.toast({html: 'Save Successfuly'});
      });
    }
  }

  getEmployees(){
    this.employeeService.getEmployees()
      .subscribe(res => {
        this.employeeService.employees = res as Employee[];
        console.log(res);
      });
  }

  editEmployee(employee: Employee){
    this.employeeService.selectedEmployee = employee;
  }

  deleteEmployee(_id: string){
    if(confirm('Area you sure you want to delete it?')){
      this.employeeService.deleteEmployee(_id)
      .subscribe(res => {
        this.getEmployees();
        M.toast({html: 'Deleted Successfuly'});
      });
    }
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.employeeService.selectedEmployee = new Employee();
    }
  }

}
