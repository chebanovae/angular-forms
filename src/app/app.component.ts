import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  myForm: FormGroup;
  forbiddenUsernames = ['User1', 'User2'];

  ngOnInit() {
    this.myForm = new FormGroup({
      'userdata': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.fobriddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('female'),
      'hobbies': new FormArray([])
    });
    /*
    this.myForm.valueChanges.subscribe(
    (value) => {
      console.log('valueChanges:' + value);
    });
    */
    this.myForm.statusChanges.subscribe(
    (value) => {
      console.log('statusChanges:' + value);
    });
    /*this.myForm.setValue({
      'userdata' : {
        'username': 'Lisa',
        'email': 'chebanova@seznam.cz'
      },
      'gender': 'female',
      'hobbies' : []
    });*/

   /* this.myForm.patchValue({
      'userdata' : {
        'username': 'Lisa',
        'email': 'chebanova@seznam.cz'
      }
    });*/
  }

  onSubmit() {
    console.log(this.myForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.myForm.get('hobbies')).push(control);
  }

  fobriddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
