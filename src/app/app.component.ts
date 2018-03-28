import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  statusForm: FormGroup;
  statuses = ['Stable', 'Critical', 'Finished'];

  ngOnInit() {
    this.statusForm = new FormGroup({
      projectName: new FormControl(null, Validators.required, this.projectNameForbidden),
      email: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl('Stable')
    });
  }

  onSubmit() {
    console.log(this.statusForm);
  }

  projectNameForbidden(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      if (control.value === 'Test') {
        resolve({ 'nameIsForbidden' : true});
      } else {
        resolve(null);
      }
    });
  }
}
